const R = require('ramda')

const fromImageObject = R.pipe(
  R.prop('tag'),
  R.when(R.is(String), R.of)
)

const fromImage = R.cond([
  [ R.is(String), R.always([]) ], // image: 'foo' -> []
  [ Array.isArray, R.pipe(R.map(fromImageObject), R.flatten) ],
  [ R.is(Object), fromImageObject ] // image: {tag: 'foo'} -> ['foo']
])

const getTags = R.pipe(
  R.path([ 'config', 'image' ]),
  fromImage
)

getTags.fromImage = fromImage

module.exports = getTags
