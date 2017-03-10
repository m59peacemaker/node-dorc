const R = require('ramda')
const minimist = require('minimist')
const dockerRunOptions = require('./docker-run-options')
const keysMatching = require('~/lib/keys-matching')
const mapKeys = require('~/lib/map-keys')
const zipObjRest = R.curry(require('~/lib/zip-obj-rest'))
const prepOptionsForMinimist = require('~/lib/prep-options-for-minimist')

const separateDockerOpts = (dorcOpts, mixedOpts) => {
  const toFix = keysMatching(/^no-/, dockerRunOptions).map(v => v.replace(/^no-/, ''))
  const fixed = R.pipe(
    R.pick(toFix),
    mapKeys(k => 'no-' + k),
    R.map(R.not)
  )(mixedOpts)
  return {
    options: R.pick(R.keys(dorcOpts), mixedOpts),
    docker: R.pipe(
      R.pick(R.keys(dockerRunOptions)),
      R.filter(R.complement(R.equals(false))),
      R.merge(fixed)
    )(mixedOpts)
  }
}

const parse = (args, options) => {
  const minimistOpts = prepOptionsForMinimist(R.mergeAll([options, dockerRunOptions]))
  const {_: remaining, ...parsed} = minimist(args, {...minimistOpts, stopEarly: true})
  const separate = separateDockerOpts(options, parsed)
  const [service, ...cmd] = remaining
  return {service, cmd, ...separate}
}

module.exports = parse
