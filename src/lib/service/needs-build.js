const {compose, not, isNil, path} = require('ramda')

const needsBuild = compose(not, isNil, path(['image', 'tags']))

module.exports = needsBuild
