const commands = ['build', 'run'].reduce((acc, v) => {
  acc[v] = require(`~/handler/${v}`)
  return acc
}, {})

module.exports = commands
