const R = require('ramda')

const defaultTransform = (value, prop) => {
  if (Array.isArray(value)) {
    return value.map(v => [ '--' + prop, v ])
  } else {
    return [ '--' + prop, value ]
  }
}

const TransformDockerOptions = (transforms, dirs) => R.pipe(
  R.toPairs,
  R.map(([ prop, value ]) => (transforms[prop] || defaultTransform)(value, prop, dirs)),
  R.flatten
)

module.exports = TransformDockerOptions
