const R = require('ramda')

const prepare = R.pipe(
  R.toPairs, // [serviceName, service]
  // get rid of everything but the image value
  R.map(
    R.over(
      R.lensIndex(1),
      R.view(R.lensProp('image'))
    )
  ),
  // filter to only services that have images to build (non-empty array)
  R.filter(
    R.pipe(
      R.view(R.lensIndex(1)),
      R.both(Array.isArray, R.complement(R.isEmpty))
    )
  ),
  R.fromPairs
)

module.exports = prepare
