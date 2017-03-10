const {curry, unless, isEmpty, pick} = require('ramda')

module.exports = curry((keys, obj) => unless(_ => isEmpty(keys), pick(keys))(obj))
