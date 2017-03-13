const {spawn} = require('child_process')

// TODO: custom output instead of the unhelpful docker output
const stop = container => {
  // TODO: promisify(spawn)
  return new Promise((resolve, reject) => {
    const p = spawn('docker', ['stop', container], {stdio: 'inherit'})
    p.on('close', code => code !== 0 ? reject(code) : resolve())
  })
}

const rm = container => {
  // TODO: promisify(spawn)
  return new Promise((resolve, reject) => {
    const p = spawn('docker', ['rm', container], {stdio: 'inherit'})
    p.on('close', code => code !== 0 ? reject(code) : resolve())
  })
}

const down = service => stop(service.container).then(() => rm(service.container))

module.exports = down
