const connect = require('../connect-log')
const R = require('ramda')

const logs = (services, config) => {
  R.toPairs(services).map(([serviceName, service]) => {
    return connect(`${config.projectName}_${serviceName}`)
  })
}

module.exports = logs
