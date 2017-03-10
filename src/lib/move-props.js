var converge = require('ramda/src/converge')
var over = require('ramda/src/over')
var __ = require('ramda/src/__')
var merge = require('ramda/src/merge')
var pipe = require('ramda/src/pipe')
var view = require('ramda/src/view')
var pick = require('ramda/src/pick')
var omit = require('ramda/src/omit')

var moveProps = function (toMove, fromLens, toLens) {
  return converge(
    function (propsToAdd, inputAfterOmit) {
      return over(toLens, merge(__, propsToAdd), inputAfterOmit)
    },
    [
      pipe(view(fromLens), pick(toMove)),
      over(fromLens, omit(toMove))
    ]
  )
}

module.exports = moveProps
