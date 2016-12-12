const {spawn} = require('child_process')
const docker = require('../docker-api')
const {makeRunArgs, prepare} = require('./up')

const sh = (services, config, {service: serviceName}) => {
  const service = services[serviceName]
  delete service.cmd
  const name = `${config.project.name}_${serviceName}`
  docker.getContainer(name)
    .then(() => {
      spawn('docker', ['exec', '-it', name, '/bin/sh'], {stdio: 'inherit'})
    })
    .catch(() => {
      const args = ['run', ...makeRunArgs(prepare(service), name), '/bin/sh']
      const cmd = `docker ${args.join(' ')}`
      console.log(cmd)
      spawn('docker', args, {stdio: 'inherit'})
    })
}

module.exports = sh
