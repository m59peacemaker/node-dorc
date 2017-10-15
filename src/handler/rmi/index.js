const { spawn } = require('child_process')
const getTags = require('~/lib/service/get-tags')

const rmi = service => {
  // TODO: promisify(spawn)
  return new Promise((resolve, reject) => {
    const tags = getTags(service)
    const args = [ 'rmi' ].concat(tags)
    console.log(`docker ${args.join(' ')}`)
    const p = spawn('docker', args, { stdio: 'inherit' })
    p.on('close', code => code !== 0 ? reject(code) : resolve())
  })
}

module.exports = rmi
