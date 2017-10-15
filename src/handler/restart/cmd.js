const R = require('ramda')
const restart = require('./')
const minimist = require('minimist')
const pickIfAnySpecified = require('~/lib/pick-if-any-specified')

const parse = (args, options) => {
  return { services: minimist(args)._ }
}

const handler = (services, config, args = {}) => {
  return R.pipe(
    pickIfAnySpecified(args.services),
    R.map(restart)
  )(services)
}

module.exports = {
  usage: 'restart <services...>',
  description: 'stop running service(s), then start service(s)',
  parse,
  handler
}
