const {spawn} = require('child_process')
const docker = require('../docker-api')
const {makeRunArgs, prepare} = require('./up')

const task = (services, config, {service: serviceName}) => {
  const service = services[serviceName]
  delete service.cmd
  const name = `${config.project.name}_${serviceName}`
  docker.getContainer(name)
    .then(() => {
      spawn('docker', ['exec', '-it', name, '/bin/sh'], {stdio: 'inherit'})
    })
    .catch(err => {
      const args = ['run', '--rm', ...makeRunArgs(prepare(service), name), '/bin/sh']
      const cmd = `docker ${args.join(' ')}`
      spawn('docker', args, {stdio: 'inherit'})
    })
}

module.exports = task
