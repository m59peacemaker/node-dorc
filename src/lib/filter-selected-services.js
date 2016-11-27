const R = require('ramda')

const filter = (configServices, selected) => {
  return R.ifElse(
    () => R.isEmpty(selected), // no services specified
    () => configServices, // use all of them
    () => R.pipe( // filter config down to given services
      R.toPairs,
      R.filter(([name]) => selected.includes(name)),
      R.fromPairs
    )(configServices)
  )()
}

module.exports = filter
