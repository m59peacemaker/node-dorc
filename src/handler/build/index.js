const R = require('ramda')
const { spawn } = require('child_process')
const docker = require('~/lib/docker-api')
const spawnMock = require('mock-spawn')()
const makeBuildArgs = require('./make-build-args')
const promisifyProcess = require('~/lib/promisify-process')
const Display = require('~/lib/display')

const removeDangling = (remover, images) => Promise.all(
  images.map(image => docker.getImage(image.Id)
    .then(info => {
      if (!info.RepoTags.length) { // no longer tagged (is dangling)
        // TODO: this code is broken
        // remover(image, oldTags)
      }
      return Promise.resolve()
    })
  )
)

const getImagesThatMatch = tags => Promise.all(
  tags
    .map(tag => docker.getImage(tag).catch(() => undefined))
    .filter(v => v !== undefined)
)

const buildImageAndRemoveDangling = async (work, image) => {
  const imagesThatMatchTags = (await getImagesThatMatch(image.tag))
    .filter(v => v !== undefined)
  await work.buildImage(makeBuildArgs(image))
  await removeDangling(work.removeDangling, imagesThatMatchTags)
}

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
      return effects.rmi(image.Id)
        .then(() => display.info(`Image ${image.Id} removed`))
    },
    buildImage: args => {
      display.distinct(`docker build ${args.join(' ')}`)
      const process = effects.spawn('docker', [ 'build', ...args ])
      process.stdout.on('data', display.info)
      process.stderr.on('data', display.err)
      return promisifyProcess(process)
    }
  }
})

const buildServiceImages = (work, images) => R.reduce(
  (promise, image) => promise
    .then(() => buildImageAndRemoveDangling(work, image)),
  Promise.resolve()
)(images)

const build = (service, options) => {
  const effects = options.dry ? dryEffects : wetEffects
  const work = Work(effects, Display(service.name))
  return buildServiceImages(work, service.config.image)
}

module.exports = build
