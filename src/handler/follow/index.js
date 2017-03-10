const {spawn} = require('child_process')

const follow = (service, options) => {
  // TODO: promisify(spawn)
  return new Promise((resolve, reject) => {
    // TODO: separate effects so this can be dry run
    const p = spawn(
      'docker',
      ['logs', '--follow', '--tail', options.tail || 10, service.container],
      {stdio: 'inherit'}
    )
    p.on('close', code => code !== 0 ? reject(code) : resolve())
  })
}

module.exports = follow
