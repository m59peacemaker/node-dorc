const R = require('ramda')
const spawnargs = require('parse-spawn-args').parse

const wrapInArray = (v) => [v]
const ensureArray = R.ifElse(Array.isArray, R.identity, wrapInArray)

const normalizeImage = R.ifElse(
  R.compose(R.isNil, R.prop('image')),
  R.identity,
  R.over(R.lensProp('image'), R.ifElse(
    R.is(String),
    R.identity,
    R.pipe(
      ensureArray,
      R.map(R.over(R.lensProp('tags'), ensureArray))
    )
  ))
)

const cmdToArray = R.ifElse(
  R.compose(R.isNil, R.prop('cmd')),
  R.assoc('cmd', []),
  R.over(R.lensProp('cmd'), spawnargs)
)

const normalize = R.over(
  R.lensProp('services'),
  R.pipe(
    R.toPairs,
    R.map(
      R.over(
        R.lensIndex(1),
        R.pipe(normalizeImage, cmdToArray)
      )
    ),
    R.fromPairs
  )
)

module.exports = normalize
