const R = require('ramda')
const {spawn, exec} = require('child_process')
const format = require('chalk')
const split = require('split')
const prefixLines = require('prefix-stream-lines')
const through = require('throo')
const pify = require('pify-proto')
const docker = pify(require('docker-remote-api')())

const getImage = (nameOrId) => docker.get(`/images/${nameOrId}/json`, {json: true})
const getImages = docker.get('/images/json', {json: true})

const rmi = (id) => docker.delete(`/images/${id}`, {json: true})

const color = (c) => {
  return through((push, chunk, enc, cb) => {
    push(format[c](chunk) + '\n')
    cb()
  })
}

const _buildImage = ({file, context = './', tags = [], args = []}) => {
  const tagArgs = R.flatten(tags.map(tag => ['-t', tag]))
  const buildArgs = R.pipe(
    R.toPairs,
    R.map(([key, value]) => ['--build-arg', `${key}=${value}`]),
    R.flatten
  )(args)
  const dockerArgs = ['build', ...tagArgs, ...buildArgs, '-f', file, context]
  process.stdout.write(`  > docker ${dockerArgs.join(' ')}\n`)
  return spawn('docker', dockerArgs)
}

const buildImage = (serviceName, image) => new Promise((resolve, reject) => {
  const p = _buildImage(image)
  p.stdout
    .pipe(split())
    .pipe(color('yellow'))
    .pipe(prefixLines(`${serviceName} | `))
    .pipe(process.stdout)
  p.stderr
    .pipe(split())
    .pipe(color('red'))
    .pipe(prefixLines(`${serviceName} | `))
    .pipe(process.stderr)
  p
    .on('error', reject)
    .on('close', exitCode => exitCode === 0 ? resolve() : reject(exitCode))
})

const removeDangling = (imagesThatMatchedTags) => {
  return Promise.all(imagesThatMatchedTags
    .map(image => getImage(image.Id).then(info => {
      if (!info.RepoTags.length) { // no longer tagged (is dangling)
        process.stdout.write(
          `Removing dangling image ${info.Id}, previously tagged "${image.RepoTags.join(' ')}"\n`
        )
        return rmi(info.Id)
      }
      return Promise.resolve()
    }))
  )
}

const buildImageAndRemoveDangling = async (serviceName, image) => {
  const imagesThatMatchTags = await Promise.all(image.tags.map(tag => getImage(tag)))
  const imageIdsThatMatchTags = imagesThatMatchTags.map(info => info.Id)
  await buildImage(serviceName, image)
  await removeDangling(imagesThatMatchTags)
  return
}

const buildImages = toBuild => {
  try {
    toBuild.forEach(([name, images]) => {
      images.forEach(image => {
        if (!(image.file && image.file.length)) {
          throw new Error(`no Dockerfile path given for "${name}" service image`)
        }
      })
    })
  }
  catch (err) {
    return Promise.reject(err)
  }
  return toBuild.reduce((promise, [name, images]) => {
    return promise.then(() => {
      return images.reduce((promise, image) => {
        return promise.then(() => buildImageAndRemoveDangling(name, image))
      }, Promise.resolve())
    })
  }, Promise.resolve())
}

const build = (config, {services = []}) => {
  const selectedServices = R.ifElse(
    () => R.isEmpty(services), // no services specified
    () => config.services, // use all of them
    () => R.pipe( // filter config down to given services
      R.toPairs,
      R.filter(([name]) => services.includes(name)),
      R.fromPairs
    )(config.services)
  )()
  const toBuild = R.pipe(
    R.toPairs,
    // just handle image property
    R.map(([name, value]) => [name, value.image]),
    // filter out image settings that are strings (nothing to build)
    R.filter(([name, value]) => value && typeof value !== 'string'),
    // normalize to array of objects rather than having to check for array/object in further code
    //   because the image setting can specify multiple images to build
    R.map(([name, value]) => Array.isArray(value) ? [name, value] : [name, [value]]),
    // normalize image.tag to array
    R.map(([name, images]) => [
      name,
      images.map(image => R.over(
        R.lensProp('tags'),
        (x => Array.isArray(x) ? x : [x]),
        image
      ))
    ])
  )(selectedServices)
  return buildImages(toBuild)
}

module.exports = build
