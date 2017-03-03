const transformLines = (fn, value) => value
  .split('\n')
  .map(fn)
  .join('\n')

const prefixLines = (string, value) => transformLines(l => string + l, value)

module.exports = prefixLines
