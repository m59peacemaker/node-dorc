const R = require('ramda')
const exec = require('./')
const minimist = require('minimist')
const pickIfAnySpecified = require('~/lib/pick-if-any-specified')

const parse = (args, options) => {
  const [service, ...cmd] = minimist(args)._
  return {service, cmd}
}

const handler = (services, config, args = {}) => {
  const service = services[args.service]
  args.cmd = args.cmd.length ? args.cmd : ['/bin/sh']
  return exec(service.container, args)
}

module.exports = {
  usage: 'exec <service> <command...>',
  description: 'Default command: /bin/sh',
  parse,
  handler
}
