const {spawn} = require('child_process')
const {isatty} = require('tty')
const R = require('ramda')

// TODO: custom output instead of the unhelpful docker output
// is this parent (node process) needed or is `kexec` a good idea here?
const exec = (container, options = {}) => {
  if (!options.cmd) {
    throw new Error('cmd required')
  }
  // TODO: promisify(spawn)
  return new Promise((resolve, reject) => {
    const args = R.pipe(
      _ => ['exec'],
      R.when(_ => isatty(), R.append('-it')),
      R.append(container),
      _ => R.concat(_, options.cmd)
    )()
    console.log('docker', args.join(' '))
    const p = spawn('docker', args, {stdio: 'inherit'})
    p.on('close', code => code !== 0 ? reject(code) : resolve())
  })
}

module.exports = exec
