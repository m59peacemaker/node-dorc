const R = require('ramda')
const {all: merge} = require('deepmerge')

const collapseObjToMode = (mode, obj) => {
  return merge([
    {},
    R.dissoc('mode', obj),
    R.defaultTo({}, R.view(R.lensPath(['mode', mode]), obj))
  ])
}

const collapsers = {
  global: collapseObjToMode,
  services: (mode, obj) => R.map(v => collapseObjToMode(mode, v), obj)
}

const getModeConfig = (mode, config) => R.mapObjIndexed(
  (value, key) => {
    const fn = R.prop(key)(collapsers)
    return fn ? fn(mode, value) : value
  },
  config
)

module.exports = getModeConfig
