const R = require('ramda')

const wrapInArray = (v) => [v]
const ensureArray = R.ifElse(Array.isArray, R.identity, wrapInArray)

const normalize = R.over(
  R.lensProp('services'),
  R.pipe(
    R.toPairs,
    R.map(
      R.over(
        R.lensIndex(1),
        R.over(R.lensProp('image'), R.ifElse(
          R.is(String),
          R.identity,
          R.pipe(
            ensureArray,
            R.map(R.over(R.lensProp('tags'), ensureArray))
          )
        ))
      )
    ),
    R.fromPairs
  )
)

module.exports = normalize
