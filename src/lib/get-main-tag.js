const R = require('ramda')

// takes service image
const getMainTag = R.unless(
  R.is(String),
  R.pipe(
    R.when(Array.isArray, R.nth(-1)), // last image
    R.prop('tag'),
    R.when(Array.isArray, R.nth(0)) // first tag
  )
)

module.exports = getMainTag
