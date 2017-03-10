const R = require('ramda')
const {spawn} = require('child_process')
const {isatty} = require('tty')
const makeRunArgs = require('./make-run-args')

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

const run = (service, args = defaultArgs) => {
  args.docker = R.pipe(
    R.when(_ => isatty(1), addArgs({interactive: true, tty: true})),
    R.unless(R.compose(R.equals(true), R.prop('detach')), R.assoc('rm', true))
  )(args.docker)
  const runArgs = ['run', ...makeRunArgs(service, args)]
  // TODO: runArgs need formatting for string usage (double quote values with spaces)
  console.log(`docker ${runArgs.join(' ')}`)
  return new Promise((resolve, reject) => {
    const p = spawn('docker', runArgs, {stdio: 'inherit'})
    // TODO: make/use a module for promisfying a process, this does not handle all cases
    // TODO: nicer error handling, see `dorc run foo /bin/sh`, run a failing command, then exit
    p.on('close', code => code !== 0 ? reject(code) : resolve())
  })
}

module.exports = run
