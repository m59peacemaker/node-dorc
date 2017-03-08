const R = require('ramda')

const p = (k, v) => {
  if (v === false) {
    return []
  }
  const result = ['--' + k]
  if (v !== true) {
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
