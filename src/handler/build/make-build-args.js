const R = require('ramda')
const {homedir: getHomedir} = require('os')
const expandTilde = require('expand-tilde')
const Transform = require('~/lib/transform-docker-options')

const propTransforms = {
  tags: value => {
    return value.map(v => {
      if (Array.isArray(v)) {
        return R.flatten(v.map(tag => ['--tag', tag]))
      } else {
        return ['--tag', v]
      }
    })
  },
  args: R.pipe(
    R.toPairs,
    R.map(([key, value]) => ['--build-arg', `${key}=${value}`])
  )
}

const makeBuildArgs = (
  config = {},
  dirs = {
    cwd: process.cwd(),
    homedir: getHomedir()
  }
) => {
  const transform = Transform(propTransforms, dirs)
  if (config.file) {
    config.file = expandTilde(config.file)
  }
  const buildArgs = transform(R.omit(['context'], config))
  const context = expandTilde(config.context || './')
  return [...buildArgs, context]
}

module.exports = makeBuildArgs
