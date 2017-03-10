const R = require('ramda')

const imageToTag = R.over(
  R.lensProp('image'),
  R.when(
    R.isArrayLike,
    R.pipe(
      R.nth(-1), // last image
      R.prop('tag'),
      R.nth(0) // first tag
    )
  )
)

module.exports = imageToTag
