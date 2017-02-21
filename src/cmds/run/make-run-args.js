const {
  join: joinPath,
  isAbsolute: isAbsolutePath
} = require('path')
const {homedir: getHomedir} = require('os')
const R = require('ramda')
const expandTilde = require('expand-tilde')
const moveProps = require('~/lib/move-props')
const mergeProps = require('~/lib/merge-props')

const dorcArgs = [
  'mode',
  'hooks',
  'image',
  'cmd'
]

const propTransforms = {
  volumes: (value, prop, dirs) => {
    return value.map(v => {
      v = expandTilde(v, dirs.homedir)
      if (!isAbsolutePath(v)) {
        return ['-v', joinPath(dirs.cwd, v)]
      } else {
        return ['-v', v]
      }
    })
  },
  env: value => R.toPairs(value).map(([k, v]) => ['-e', `${k}="${v}"`]),
  ports: value => value.map(v => ['-p', v])
}

const getTransform = prop => {
  const transform = propTransforms[prop]
  if (!transform) {
    return (value, prop) => {
      if (Array.isArray(value)) {
        return value.map(v => ['--' + prop, v])
      } else {
        return ['--' + prop, value]
      }
    }
  } else {
    return transform
  }
}

const transformDockerOptions = dirs => {
  return R.pipe(
    R.toPairs,
    R.map(([key, value]) => getTransform(key)(value, key, dirs)),
    R.flatten
  )
}

// options may contain any docker run options
const makeRunArgs = (
  service,
  options = {},
  dirs = {
    cwd: process.cwd(),
    homedir: getHomedir()
  }
) => {
  if (!service.image) {
    throw new Error('service image is required')
  }
  return R.pipe(
    // move props that aren't for docker run
    moveProps(dorcArgs, R.lensProp('service'), R.lensProp('dorc')),
    mergeProps(['service', 'options'], R.lensProp('options')), // the rest are docker run args
    R.over(R.lensProp('options'), transformDockerOptions(dirs)),
    R.converge(
      (dorc, options) => {
        return R.pipe(
          R.pick(['image', 'cmd']),
          R.values,
          R.concat(options)
        )(dorc)
      }, [
        R.prop('dorc'),
        R.prop('options')
      ]
    )
  )({service, options})
}
/*  R.pipe(
    R.map(([key, value]) => getTransform(key)(value, key)),
    R.flatten
    //R.ifElse(() => R.isNil(detached.name), R.identity, R.assoc('name', name)),
    //R.toPairs
  )({service, options})
  const _options = dockerRunProps.map(([key, value]) => {
    return getTransform(key)(value, key)
  })
  const cmd = R.ifElse(R.isNil, R.F, R.identity)(service.cmd)
  const detachedArg = R.ifElse(R.equals(false), R.identity, R.always('-d'))(detached)
  const args = R.flatten(['-it', detachedArg, options, service.image, cmd])
    .filter(v => v)
  return args
}*/

module.exports = makeRunArgs
