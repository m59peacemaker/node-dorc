const R = require('ramda')

const prepOptionsForMinimist = R.pipe(
  R.toPairs,
  R.reduce(
    (acc, [name, v]) => {
      ;['string', 'boolean'].forEach(type => {
        if (v.type === type && !name.match(/^no-/)) {
          acc[type].push(name)
        }
      })
      if (v.alias) {
        acc.alias[name] = v.alias
      }
      return acc
    },
    {string: [], boolean: [], alias: {}}
  )
)

module.exports = prepOptionsForMinimist
