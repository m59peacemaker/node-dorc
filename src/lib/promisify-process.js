const promisifyProcess = function (process) {
  return new Promise(function (resolve, reject) {
    process.on('error', function (err) {
      reject(err)
    })
    process.on('close', function (exitCode) {
      exitCode !== 0 ? reject({exitCode}) : resolve({exitCode})
    })
  })
}

module.exports = promisifyProcess
