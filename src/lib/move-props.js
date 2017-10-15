const converge = require('ramda/src/converge')
const over = require('ramda/src/over')
const __ = require('ramda/src/__')
const merge = require('ramda/src/merge')
const pipe = require('ramda/src/pipe')
const view = require('ramda/src/view')
const pick = require('ramda/src/pick')
const omit = require('ramda/src/omit')

const moveProps = function (toMove, fromLens, toLens) {
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
