const {spawn} = require('child_process')
const makeRunArgs = require('./make-run-args')
const minimist = require('minimist')
const sharedOptions = require('~/lib/shared-options')

const R = require('ramda')
const zipObjRest = R.curry(require('~/lib/zip-obj-rest'))
const prepOptionsForMinimist = require('~/lib/prep-options-for-minimist')
const singleServiceCommand = require('~/lib/single-service-command')
const mapKeys = require('~/lib/map-keys')

const defaultArgs = {cmd: [], options: {}, docker: {}}
/* args.docker keys are --names (not aliases)
 * false values will be ignored
 * values that can be declared multiple times can be strings or arrays
 * {env: 'FOO=foo'} {env: ['FOO=foo', 'BAR=bar']}
 */
const handler = singleServiceCommand((service, config, args = defaultArgs) => {
  // TODO: figure out detach, rm, name
  /*const name = `${config.project.name}_${args.service}`
  args.docker.name = name
  args.docker.rm = true*/
  const runArgs = ['run', ...makeRunArgs(service, args)]
  console.log(`docker ${runArgs.join(' ')}`)
  spawn('docker', runArgs, {stdio: 'inherit'})
})

const dockerRunOptions = require('./docker-run-options')
const keysMatching = R.curry((pattern, obj) => R.pipe(
  R.toPairs,
  R.filter(([key]) => key.match(pattern)),
  R.map(R.nth(0))
)(obj))

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

const command = {
  usage: 'run [options...] <service> [cmd...]',
  description: 'run service (also accepts all docker run options)',
  options: {
    dry: sharedOptions.dry
  },
  parse: (args, options) => {
    const minimistOpts = prepOptionsForMinimist(R.mergeAll([options, dockerRunOptions]))
    const {_: remaining, ...parsed} = minimist(args, {...minimistOpts, stopEarly: true})
    const separate = separateDockerOpts(options, parsed)
    const [service, ...cmd] = remaining
    return {service, cmd, ...separate}
  },
  handler
}

module.exports = command
