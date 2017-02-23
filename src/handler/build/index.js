const R = require('ramda')
const {spawn, exec} = require('child_process')
const docker = require('~/lib/docker-api')
const prepareServices = require('./prepare-services')
const spawnMock = require('mock-spawn')()
const makeBuildArgs = require('./make-build-args')
const promisifyProcess = require('~/lib/promisify-process')
const Display = require('~/lib/display')
const format = require('chalk')

const RemoveDangling = remover => {
  return images => Promise.all(
    images.map(image => docker.getImage(image.Id)
      .then(info => {
        if (!info.RepoTags.length) { // no longer tagged (is dangling)
          remover(imageId, oldTags)
        }
        return Promise.resolve()
      })
    )
  )
}

const getImagesThatMatch = tags => Promise.all(
  tags
    .map(tag => docker.getImage(tag).catch(err => undefined))
    .filter(v => v !== undefined)
)

const BuildImageAndRemoveDangling = work => {
  return async (image) => {
    const imagesThatMatchTags = (await getImagesThatMatch(image.tags))
      .filter(v => v !== undefined)
    await work.buildImage(makeBuildArgs(image))
    await RemoveDangling(work.removeDangling)(imagesThatMatchTags)
  }
}

const BuildImages = Work => {
  return R.pipe(
    R.toPairs,
    R.map(([name, images]) => images.reduce(
      (promise, image) => promise
        .then(() => BuildImageAndRemoveDangling(Work(Display(name)))(image)),
      Promise.resolve()
    )),
    promises => Promise.all(promises)
  )
}

const validateImage = image => {
  if (!(image.file && image.file.length)) {
    throw new Error(`no Dockerfile path given for "${name}" service image`)
  }
}

const validateImages = toBuild => R.pipe(R.values, R.flatten, R.map(validateImage))

const wetEffects = {
  rmi: docker.rmi,
  spawn
}

const dryEffects = {
  rmi: () => Promise.resolve(),
  spawn: spawnMock
}

const Work = R.curry((effects, display) => {
  return {
    removeDangling: (image, oldTags) => {
      display.info(
        `Removing dangling image ${image.Id}, previously tagged "${oldTags.join(' ')}"`
      )
      return effects.rmi(imageId)
        .then(() => display.info(`Image ${image.Id} removed`))
    },
    buildImage: args => {
      display.distinct(`docker build ${args.join(' ')}`)
      const process = effects.spawn('docker', ['build', ...args])
      process.stdout.on('data', display.info)
      process.stderr.on('data', display.err)
      return promisifyProcess(process)
    }
  }
})

const build = (selectedServices, config, args) => {
  const toBuild = prepareServices(selectedServices)
  validateImages(toBuild)
  const effects = args.dry ? dryEffects : wetEffects
  return BuildImages(Work(effects))(toBuild)
}

module.exports = build
