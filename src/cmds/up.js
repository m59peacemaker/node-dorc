const {exec} = require('child_process')
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
  'cmd'
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

const makeRunArgs = (service, containerName, detached = false) => {
  const dockerRunProps = R.pipe(
    () => service,
    R.omit(dorcArgs),
    R.assoc('name', containerName),
    R.toPairs
  )()
  const options = dockerRunProps.map(([key, value]) => {
    return getTransform(key)(value, key)
  })
  const cmd = R.ifElse(R.isNil, R.F, R.identity)(service.cmd)
  const detachedArg = R.ifElse(R.equals(false), R.identity, R.always('-d'))(detached)
  const args = R.flatten(['-it', detachedArg, options, service.image, cmd])
    .filter(v => v)
  return args
}

const startService = (service, containerName, _args) => new Promise((resolve, reject) => {
  const args = ['run', ...makeRunArgs(service, containerName, true)]
  const cmd = `docker ${args.join(' ')}`
  process.stdout.write(`  > ${cmd}\n\n`)
  const p = exec(cmd)
  p.stderr.pipe(process.stderr)
  p.on('close', exitCode => {
    exitCode !== 0 ? reject(exitCode) : resolve()
  })
})

const startServices = (services, config, args) => Promise.all(R.pipe(
  R.toPairs,
  R.addIndex(R.map)(([name, service], idx) => {
    const containerName = `${config.project.name}_${name}`
    return tryHook('before-up', service, name)
      .then(() => {
        return startService(service, containerName, args)
      })
      .then(() => {
        process.stdout.write(`${tick} ${name} is up\n`)
      })
      .catch(err => {
        process.stdout.write(`${cross} could not start ${name}\n`)
      })
  })
)(services))

const prepare = R.over(
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

const up = async (services, config, args) => {
  await build(services, config)
  return startServices(R.map(prepare)(services), config, args)
    .then(() => {
      if (args.detached !== true) {
        return connectLogs(services, config)
      }
    })
}

up.prepare = prepare
up.makeRunArgs = makeRunArgs

module.exports = up
