const R = require('ramda')
const down = require('./')
const minimist = require('minimist')
const pickIfAnySpecified = require('~/lib/pick-if-any-specified')

const parse = (args, options) => {
  return {services: minimist(args)._}
}

const handler = (services, config, args = {}) => {
  return R.pipe(
    _ => pickIfAnySpecified(args.services, _),
    R.map(service => down(service).catch(() => {})),
    R.values,
    _ => Promise.all(_)
  )(services)
}

module.exports = {
  usage: 'down [services...]',
  description: 'stop and remove service container(s)',
  parse,
  handler
}
