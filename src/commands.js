// TODO: automate this someFn('./handler')
const commands = ['build', 'run', 'up'].reduce((acc, v) => {
  acc[v] = require(`~/handler/${v}`)
  return acc
}, {})

module.exports = commands
