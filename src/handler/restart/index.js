const down = require('~/handler/down')
const up = require('~/handler/up')

const restart = service => {
  return down(service)
    .catch(() => {})
    .then(() => up(service))
}

module.exports = restart
