const R = require('ramda')
const follow = require('./')
const minimist = require('minimist')
const pickIfAnySpecified = require('~/lib/pick-if-any-specified')

const parse = (args, options) => {
  return { services: minimist(args)._ }
}

const handler = (services, config, args = {}) => {
  return R.pipe(
    _ => pickIfAnySpecified(args.services, _),
    R.map(service => follow(service, args)),
    R.values,
    _ => Promise.all(_)
  )(services)
}

module.exports = {
  usage: 'follow [docker log options...] [services...]',
  description: 'shortcut for "dorc logs --follow"',
  parse,
  handler
}
