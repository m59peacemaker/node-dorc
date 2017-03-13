const R = require('ramda')
const rmi = require('./')
const minimist = require('minimist')
const pickIfAnySpecified = require('~/lib/pick-if-any-specified')
const needsBuild = require('~/lib/service/needs-build')

// TODO: Prompt to verify images to be deleted! [Y/n]
const parse = (args, options) => {
  return {services: minimist(args)._}
}

const handler = (services, config, args = {}) => {
  return R.pipe(
    pickIfAnySpecified(args.services),
    R.compose(_ => Promise.all(_), R.values, R.map(R.when(needsBuild, rmi)))
  )(services)
}

module.exports = {
  usage: 'rmi <services...>',
  parse,
  handler
}
