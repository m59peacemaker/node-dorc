const {pipe, path, either, is} = require('ramda')

const needsBuild = pipe(path(['config', 'image']), either(is(Object), Array.isArray))

module.exports = needsBuild
