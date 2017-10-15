const promisifyProcess = process => {
  return new Promise((resolve, reject) => {
    process.on('error', reject)
    process.on(
      'close',
      exitCode => exitCode !== 0 ? reject(new Error({ exitCode })) : resolve({ exitCode })
    )
  })
}

module.exports = promisifyProcess
