const {spawn} = require('child_process')
const R = require('ramda')
const path = require('path')
const tryHook = require('../try-hook')
const build = require('./build')
const {tick, cross} = require('figures-colored')
const prefixLines = require('prefix-stream-lines')
const format = require('chalk')
const connectLogs = require('./logs')

const dorcArgs = [
  'mode',
  'hooks',
  'image',
  'command'
]

const propTransforms = {
  volumes: value => {
    return value.map(v => {
      if (!path.isAbsolute(v)) {
        return ['-v', path.join(process.cwd(), v)]
      }
      return ['-v', value]
    })
  },
  env: value => R.toPairs(value).map(([k, v]) => ['-e', `${k}=${v}`]),
  ports: value => value.map(v => ['-p', v])
}

const getTransform = prop => {
  const transform = propTransforms[prop]
  if (!transform) {
    return (value, prop) => {
      if (Array.isArray(value)) {
        return value.map(v => ['--' + prop, v])
      } else {
        return ['--' + prop, value]
      }
    }
  } else {
    return transform
  }
}

const makeRunArgs = (service, containerName) => {
  const dockerRunProps = R.pipe(
    () => service,
    R.omit(dorcArgs),
    R.assoc('name', containerName),
    R.toPairs
  )()
  const options = dockerRunProps.map(([key, value]) => {
    return getTransform(key)(value, key)
  })
  const args = R.flatten([options, service.image, service.command || ''])
    .filter(v => v)
  return args
}

const startService = (service, containerName) => new Promise((resolve, reject) => {
  const args = ['run', '-d', ...makeRunArgs(service, containerName)]
  process.stdout.write(`  > docker ${args.join(' ')}\n\n`)
  const p = spawn('docker', args)
  p.stderr.pipe(process.stderr)
  p.on('close', exitCode => {
    exitCode !== 0 ? reject(exitCode) : resolve()
  })
})

const startServices = (services, config) => Promise.all(R.pipe(
  R.toPairs,
  R.addIndex(R.map)(([name, service], idx) => {
    const containerName = `${config.projectName}_${name}`
    return tryHook('before-up', service, name)
      .then(() => startService(service, containerName))
      .then(() => {
        process.stdout.write(`${tick} ${name} is up\n`)
      })
      .catch(err => {
        process.stdout.write(`${cross} could not start ${name}\n`)
      })
  })
)(services))

const prepare = R.map(
  R.over(
    R.lensProp('image'),
    R.ifElse(
      R.is(String),
      R.identity,
      R.pipe(
        R.nth(-1),
        R.prop('tags'),
        R.nth(0)
      )
    )
  )
)

const up = async (services, config, args) => {
  await build(services, config)
  return startServices(prepare(services), config, args)
    .then(() => {
      if (args.detached !== true) {
        return connectLogs(services, config)
      }
    })
}

module.exports = up
