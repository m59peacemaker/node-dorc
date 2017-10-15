const {
  curry,
  keys,
  map,
  values,
  zipObj
} = require('ramda')

module.exports = curry((fn, obj) => zipObj(map(fn, keys(obj)), values(obj)))
