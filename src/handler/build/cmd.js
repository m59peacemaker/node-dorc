const R = require('ramda')
const minimist = require('minimist')
const sharedOptions = require('~/lib/shared-options')
const prepOptionsForMinimist = require('~/lib/prep-options-for-minimist')
const pickIfAnySpecified = require('~/lib/pick-if-any-specified')
const build = require('./')

const isNotEmptyArray = R.both(R.isArrayLike, R.complement(R.isEmpty))
const defaultOptions = {services: [], args: {}}
const handler = (services, config, options) => {
  return R.pipe(
    _ => pickIfAnySpecified(options.services, _),
    R.filter(R.pipe(R.path(['config', 'image']), isNotEmptyArray)),
    R.map(_ => build(_, options.args)),
    R.values,
    _ => Promise.all(_)
  )(services)
}

module.exports = {
  usage: 'build [options...] [services...]',
  description: 'build images(s)',
  options: {
    dry: sharedOptions.dry
  },
  parse: (args, options) => {
    const minimistOpts = prepOptionsForMinimist(options)
    const {_: services, ...opts} = minimist(args, minimistOpts)
    return {services, args: opts}
  },
  handler
}
