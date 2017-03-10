const {complement, isEmpty, curry, pipe, compose, keys, filter, match} = require('ramda')
const isNotEmpty = complement(isEmpty)

const keysMatching = curry((pattern, obj) => pipe(
  keys,
  filter(compose(isNotEmpty, match(pattern)))
)(obj))

module.exports = keysMatching
