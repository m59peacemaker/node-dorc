const minimist = require('minimist')
const run = require('~/handler/run').handler
const build = require('~/handler/build').handler
const sharedOptions = require('~/lib/shared-options')
const imageToTag = require('~/lib/image-to-tag')

const parse = (args, options) => {
  return {services: minimist(args)._}
}

const handler = (services, config, args) => {
  return build(services, config)
    .then(() => run(
      R.map(imageToTag, services),
      config,
      {cmd: [], options: {}, docker: {detach: args.detach}}
    ))
    .then(() => {
      if (args.detach !== true) {
        //return connectLogs(services, config)
      }
    })
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
