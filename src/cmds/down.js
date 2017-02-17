const {exec} = require('child_process')
const R = require('ramda')
const {tick, cross} = require('figures-colored')

const stop = (containerName) => new Promise((resolve, reject) => {
  exec(`docker stop ${containerName}`, (err, stdout, stderr) => {
    err ? reject(stderr) : resolve(stdout)
  })
})

const rm = (containerName) => new Promise((resolve, reject) => {
  exec(`docker rm ${containerName}`, (err, stdout, stderr) => {
    err ? reject(stderr) : resolve(stdout)
  })
})

const down = async (services, config) => {
  return Promise.all(R.toPairs(services).map(([serviceName, service]) => {
    const containerName = `${config.project.name}_${serviceName}`
    return stop(containerName, serviceName)
      .then(() => rm(containerName))
      .then(() => {
        process.stdout.write(`${tick} ${serviceName} is down\n`)
      })
      .catch(err => {
        process.stdout.write(`${cross} ${serviceName} - ${err.trim()}\n`)
      })
  }))
}

module.exports = down
