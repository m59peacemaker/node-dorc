const minimist = require('minimist')
const run = require('~/handler/run').handler
const build = require('~/handler/build').handler
const sharedOptions = require('~/lib/shared-options')
const imageToTag = require('~/lib/image-to-tag')
const R = require('ramda')
const {spawn} = require('child_process')

// TODO: service container name should be added to some object earlier on so it's around when needed
// maybe { someService: {name: 'someService', container: 'myProject_someService', config: {}}
const follow = (service, name) => {
  // TODO: promisify(spawn)
  return new Promise((resolve, reject) => {
    // TODO: separate effects so this can be dry run
    const p = spawn('docker', ['logs', '--follow', '--tail', 'all', name], {stdio: 'inherit'})
    p.on('close', code => code !== 0 ? reject(code) : resolve())
  })
}

const parse = (args, options) => {
  return {services: minimist(args)._}
}

// TODO: it's silly for `run` to require an object of services just to run one of them...
// maybe require an object with a single service or do something else smarter
const handler = (services, config, args) => {
  return Promise.all(
    R.map(([name, service]) => {
      const container = `${config.project.name}_${name}`
      return build({[name]: service}, config)
      .then(() => run(
        {[name]: imageToTag(service)},
        config,
        {
          cmd: [],
          options: {},
          service: name,
          docker: {detach: true, name: container}
        }
      ))
      .then(() => {
        if (args.detach !== true) {
          return follow(service, container)
        }
      })
    })(R.toPairs(services))
  )
}

const command = {
  usage: 'up [services...]',
  description: 'build and start service(s)',
  options: {
    detach: sharedOptions.detach
  },
  parse,
  handler
}

module.exports = command
