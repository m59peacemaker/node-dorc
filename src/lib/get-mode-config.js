const R = require('ramda')

const collapseObjToMode = (mode, obj) => {
  return {
    ...R.dissoc('mode', obj),
    ...R.defaultTo({}, R.view(R.lensPath(['mode', mode]), obj))
  }
}

const collapsers = {
  global: collapseObjToMode,
  services: (mode, obj) => R.map(v => collapseObjToMode(mode, v), obj)
}

const getModeConfig = (mode, config) => R.mapObjIndexed(
  (value, key) => {
    const fn = R.view(R.lensProp(key), collapsers)
    return fn ? fn(mode, value) : value
  },
  config
)

module.exports = getModeConfig
