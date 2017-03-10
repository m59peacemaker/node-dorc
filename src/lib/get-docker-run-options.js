const {execSync} = require('child_process')
const sample = ['-a, ', '--attach value                ']
const R = require('ramda')

const _slices = (params, data) => params.map(p => data.slice(...p))
const slices = R.curry(_slices)
const removeWhitespaceItems = R.reject(R.pipe(R.trim, R.isEmpty))

const ifNothingElse = value => R.ifElse(R.isNil, R.always(value), R.identity)
const notNil = R.complement(R.isNil)
const hasIndex = R.curry(R.pipe(R.nth, notNil))

const getOptions = () => R.pipe(
  R.toString,
  R.split('Options:\n'),
  R.nth(1),
  R.split('\n'),
  R.reject(R.isEmpty),
  R.map(R.pipe(
    slices([[3, 4], [6, 36], [36]]),
    R.over(
      R.lensIndex(1),
      R.pipe(
        R.trim,
        R.split(' '),
        R.unless(hasIndex(1), R.append('boolean'))
      )
    ),
    R.flatten,
    R.zipObj(['alias', 'name', 'type', 'description']),
    R.over(R.lensProp('alias'), R.pipe(R.of, removeWhitespaceItems)),
    R.over(R.lensProp('name'), R.slice(2, R.Infinity)),
    R.converge(R.objOf, [R.prop('name'), R.omit('name')])
  )),
  R.mergeAll
)(execSync('docker run --help'))

module.exports = getOptions
