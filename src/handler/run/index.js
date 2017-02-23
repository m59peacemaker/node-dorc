const {spawn} = require('child_process')
const makeRunArgs = require('./make-run-args')

const singleServiceCommand = handler => {
  return (services, config, args, options) => {
    if (!args.service) {
      throw new Error('No service name given') // list service names
    }
    const service = services[args.service]
    if (!service) {
      throw new Error(`"${args.service}" - no such service`)
    }
    return handler(service, config, args, options)
  }
}

const run = singleServiceCommand((service, config, args, options = {}) => {
  // const name = `${config.project.name}_${args.service}`
  service = args.cmd ? {...service, cmd: args.cmd} : service
  service = options.containerName ? {...service, name: options.containerName} : service
  const runArgs = ['run', '--rm', ...makeRunArgs(service)]
  console.log(`docker ${runArgs.join(' ')}`)
  spawn('docker', runArgs, {stdio: 'inherit'})
})

module.exports = run
