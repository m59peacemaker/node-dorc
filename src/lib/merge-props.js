const converge = require('ramda/src/converge')
const set = require('ramda/src/set')
const mergeAll = require('ramda/src/mergeAll')
const prop = require('ramda/src/prop')
const __ = require('ramda/src/__')
const omit = require('ramda/src/omit')

const mergeProps = (props, dest) => converge(
  set(dest),
  [
    data => mergeAll(props.map(prop(__, data))),
    omit(props)
  ]
)

module.exports = mergeProps
