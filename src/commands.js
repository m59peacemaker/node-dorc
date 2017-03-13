// TODO: automate this mebbe? requireList(array)
const commands = [
  'build',
  'up',
  'down',
  'restart',
  'follow',
  'exec',
  'run',
  'rmi'
].reduce((acc, v) => {
  acc[v] = require(`~/handler/${v}/cmd`)
  return acc
}, {})

module.exports = commands
