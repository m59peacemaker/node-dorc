var converge = require('ramda/src/converge')
var set = require('ramda/src/set')
var mergeAll = require('ramda/src/mergeAll')
var prop = require('ramda/src/prop')
var __ = require('ramda/src/__')
var omit = require('ramda/src/omit')

const mergeProps = (props, dest) => converge(
  set(dest),
  [
    data => mergeAll(props.map(prop(__, data))),
    omit(props)
  ]
)

module.exports = mergeProps
