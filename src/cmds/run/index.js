const {spawn} = require('child_process')

const singleServiceCommand = handler => {
  return (services, config, args) => {
    if (!args.serviceName) {
      throw new Error('No service name given') // list service names
    }
    const service = services[args.service]
    if (!service) {
      throw new Error(`"${args.service}" - no such service`)
    }
    return handler(service, config, args)
  }
}

const run = singleServiceCommand((service, config, {service: serviceName}) => {
  const name = `${config.project.name}_${serviceName}`
  const args = ['run', '--rm', ...makeRunArgs(prepare(service), name), '/bin/sh']
  const cmd = `docker ${args.join(' ')}`
  console.log(cmd)
  spawn('docker', args, {stdio: 'inherit'})
})

module.exports = run
