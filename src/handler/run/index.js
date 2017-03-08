const {spawn} = require('child_process')
const {isatty} = require('tty')
const makeRunArgs = require('./make-run-args')
const minimist = require('minimist')
const sharedOptions = require('~/lib/shared-options')

const R = require('ramda')
const zipObjRest = R.curry(require('~/lib/zip-obj-rest'))
const prepOptionsForMinimist = require('~/lib/prep-options-for-minimist')
const singleServiceCommand = require('~/lib/single-service-command')
const mapKeys = require('~/lib/map-keys')

const stringToArray = R.when(R.is(String), R.of)
const concatRight = R.flip(R.concat)
const addArgs = R.mergeWithKey(R.pipe(
  // this is called when the destination object already has a key
  R.unapply(R.slice(1, 3)), // (k, l, r) => [l, r]
  R.ifElse(
    R.pipe(R.nth(0), R.is(Boolean)),
    R.nth(0), // return "l" if it is a boolean
    // turn "l" and "r" strings into arrays and then add "l" to the end of "r"
    R.pipe(R.map(stringToArray), R.apply(concatRight))
  )
))

const defaultArgs = {cmd: [], options: {}, docker: {}}
/* args.docker keys are --names (not aliases)
 * false values will be ignored
 * values that can be declared multiple times can be strings or arrays
 * {env: 'FOO=foo'} {env: ['FOO=foo', 'BAR=bar']}
 */
const handler = singleServiceCommand((service, config, args = defaultArgs) => {
  // TODO: runArgs need formatting for string usage (double quote values with spaces)
   args.docker = R.pipe(
    R.when(_ => isatty(1), addArgs({interactive: true, tty: true})),
    R.unless(R.compose(R.equals(true), R.prop('detach')), R.assoc('rm', true))
  )(args.docker)
  const runArgs = ['run', ...makeRunArgs(service, args)]
  console.log(`docker ${runArgs.join(' ')}`)
  return new Promise((resolve, reject) => {
    const p = spawn('docker', runArgs, {stdio: 'inherit'})
    // TODO: make/use a module for promisfying a process, this does not handle all cases
    p.on('close', code => code !== 0 ? reject(code) : resolve())
  })
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
