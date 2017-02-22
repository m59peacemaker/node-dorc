const R = require('ramda')
const {spawn, exec} = require('child_process')
const format = require('chalk')
const split = require('split')
const prefixLines = require('prefix-stream-lines')
const through = require('throo')
const docker = require('~/lib/docker-api')
const prepareServices = require('./prepare-services')
const SpawnMock = require('mock-spawn')
const spawnMock = SpawnMock(cp => cp.end())

const color = (c) => {
  return through((push, chunk, enc, cb) => {
    push(format[c](chunk) + '\n')
    cb()
  })
}

const BuildImage = work => {
  return ({file, context = './', tags = [], args = []}) => {
    const tagArgs = R.flatten(tags.map(tag => ['-t', tag]))
    const buildArgs = R.pipe(
      R.toPairs,
      R.map(([key, value]) => ['--build-arg', `${key}=${value}`]),
      R.flatten
    )(args)
    const dockerArgs = ['build', ...tagArgs, ...buildArgs, '-f', file, context]
    console.log(dockerArgs)
    work.info(`  > docker ${dockerArgs.join(' ')}`)
    return spawn('docker', dockerArgs)
    return work.do('spawn', 'docker', dockerArgs)
  }
}

const RemoveDangling = work => {
  return images => Promise.all(
    images.map(image => docker.getImage(image.Id)
      .then(info => {
        if (!info.RepoTags.length) { // no longer tagged (is dangling)
          work.info(
            `Removing dangling image ${info.Id}, previously tagged "${image.RepoTags.join(' ')}"`
          )
          return work.do('rmi', info.Id)
            .then(() => work.info(`Image ${info.Id} removed`))
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

const promisifyProcess = process => new Promise((resolve, reject) => {
  process.on('error', reject)
  process.on('close', exitCode => exitCode !== 0 ? reject({exitCode}) : resolve({exitCode}))
})

const BuildImageAndRemoveDangling = work => {
  return async (serviceName, image) => {
    const imagesThatMatchTags = await getImagesThatMatch(image.tags)
    const process = BuildImage(work)(serviceName, image)
    process.stdout.on('data', d => work.info(d, serviceName))
    process.stderr.on('data', d => work.err(d, serviceName))
    await promisifyProcess(process)
    await RemoveDangling(work)(imagesThatMatchTags)
  }
}

const BuildImages = Work => {
  return R.pipe(
    R.toPairs,
    R.map(([name, images]) => images.reduce(
      (promise, image) => promise.then(() => BuildImageAndRemoveDangling(Work(name))(name, image)),
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

const actions = {
  rmi: docker.rmi,
  spawn
}

const dryActions = {
  rmi: () => Promise.resolve(),
  spawn: spawnMock
}

const build = (selectedServices, config, args) => {
  const Work = name => {
    const infoStream = through()
    infoStream
      .pipe(split())
      .pipe(color('yellow'))
      .pipe(prefixLines(`${name} | `))
      .pipe(process.stdout)
    const errStream = through()
      .pipe(split())
      .pipe(color('red'))
      .pipe(prefixLines(`${name} | `))
      .pipe(process.stderr)
    return {
      do: (action, ...a) => {
        if (args.dry) {
          dryActions[action](...a)
        } else {
          actions[action](...a)
        }
      },
      info: d => infoStream.push(d),
      err: d => errStream.push(d)
    }
  }
  const toBuild = prepareServices(selectedServices)
  validateImages(toBuild)
  return BuildImages(Work)(toBuild)
}

module.exports = build
