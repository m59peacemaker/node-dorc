// TODO: automate this someFn('./handler')
const commands = ['build', 'run', 'up'].reduce((acc, v) => {
  acc[v] = require(`~/handler/${v}/cmd`)
  return acc
}, {})

module.exports = commands
