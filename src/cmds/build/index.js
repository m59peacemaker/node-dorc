const R = require('ramda')
const {spawn, exec} = require('child_process')
const format = require('chalk')
const split = require('split')
const prefixLines = require('prefix-stream-lines')
const through = require('throo')
const docker = require('~/lib/docker-api')

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

const removeDangling = (outputMessage, images) => Promise.all(
  images.map(image => docker.getImage(image.Id)
    .then(info => {
      if (!info.RepoTags.length) { // no longer tagged (is dangling)
        outputMessage(
          `Removing dangling image ${info.Id}, previously tagged "${image.RepoTags.join(' ')}"`
        )
        return docker.rmi(info.Id)
          .then(() => outputMessage(`Image ${info.Id} removed`))
      }
      return Promise.resolve()
    })
  )
)

const buildImageAndRemoveDangling = async (serviceName, image) => {
  const imagesThatMatchTags = await Promise.all(
    image.tags
      .map(tag => docker.getImage(tag).catch(err => undefined))
      .filter(v => v !== undefined)
  )
  await buildImage(serviceName, image)
  await removeDangling(imagesThatMatchTags)
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

/*const filter = R.pipe(
  R.toPairs,
  R.map(
    R.over(
      R.lensIndex(1),
      R.view(R.lensProp('image'))
    )
  ),
  R.filter(
    R.pipe(
      R.view(R.lensIndex(1)),
      R.both(Array.isArray, R.complement(R.isEmpty))
    )
  )
)*/

const build = (selectedServices, config, args) => {
  console.log(selectedServices)
  //return buildImages(filter(selectedServices))
}

module.exports = build
