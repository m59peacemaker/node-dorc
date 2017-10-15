const R = require('ramda')
const minimist = require('minimist')
const sharedOptions = require('~/lib/shared-options')
const pickIfAnySpecified = require('~/lib/pick-if-any-specified')
const up = require('./')

const parse = (args, options) => {
  return { services: minimist(args)._ }
}

const handler = (services, config, args) => {
  const selectedServices = pickIfAnySpecified(args.services, services)
  return R.compose(_ => Promise.all(_), R.values, R.map(_ => up(_, {})))(selectedServices)
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
