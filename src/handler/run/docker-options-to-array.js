const R = require('ramda')

const p = (k, v) => {
  const result = ['--' + k]
  if (typeof v !== 'boolean') {
    result.push(v)
  }
  return result
}

const toArray = R.pipe(
  R.toPairs,
  R.map(([k, v]) => {
    return Array.isArray(v) ? v.map(x => p(k, x)) : p(k, v)
  }),
  R.flatten
)

module.exports = toArray
