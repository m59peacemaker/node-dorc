const {spawn} = require('child_process')
const R = require('ramda')
const tryHook = require('../try-hook')

const dorcArgs = [
  'scan',
  'poll',
  'mode',
  'hooks',
  'image',
  'command' // why is this here? It probably should not be
]

const propTransforms = {
  volumes: (prop, value) => {
    return value.map(v => {
      if (!path.isAbsolute(v)) {
        return ['-v', path.join(process.cwd(), v)]
      }
      return ['-v', value]
    })
  },
  ports: (prop, value) => value.map(v => ['-p', v])
}

const getTransform = prop => {
  const transform = propTransforms[prop]
  if (!transform) {
    return (prop, value) => {
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

const makeRunArgs = service => {
  const dockerRunProps = R.omit(dorcArgs.concat('serviceName'), service)
  const options = R.toPairs(dockerRunProps).map(([key, value]) => {
    return getTransform(key)(key, value)
  })
  const args = R.flatten([options, service.image, service.command || ''])
    .filter(v => v)
  return args
}

const startService = service => new Promise((resolve, reject) => {
  return
  const args = ['run', '-d', ...makeRunArgs(service)]
  console.log(['docker', ...args].join(' '))
  return
  const p = spawn('docker', args)
  p.stdout.pipe(process.stdout)
  p.stderr.pipe(process.stderr)
  // check ports, resolve
  p.on('close', exitCode => exitCode? reject(): resolve())
})

const startServices = services => Promise.all(R.map(service => {
  console.log(JSON.stringify(service, null, 2))
  return tryHook('before-up', service, service.serviceName)
    .then(() => startService(service))
}, R.values(services)))

const up = async (config) => {
  const services = config.services
  await tryHook('before-up', config.global)
  await startServices(services)
  console.log('ALL SERVICES UP')
}

module.exports = up
