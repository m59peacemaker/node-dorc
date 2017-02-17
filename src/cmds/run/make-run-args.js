const R = require('ramda')
const moveProps = require('~/lib/move-props')
const mergeProps = require('~/lib/merge-props')

const dorcArgs = [
  'mode',
  'hooks',
  'image',
  'cmd'
]

const propTransforms = {
  volumes: value => {
    return value.map(v => {
      if (!path.isAbsolute(v)) {
        return ['-v', path.join(process.cwd(), v)]
      }
      return ['-v', value]
    })
  },
  env: value => R.toPairs(value).map(([k, v]) => ['-e', `${k}=${v}`]),
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

const transformDockerOptions = R.pipe(
  R.toPairs,
  R.map(([key, value]) => getTransform(key)(value, key)),
  R.flatten
)

// options may contain any docker run options
const makeRunArgs = (service, options = {}) => R.pipe(
  moveProps(dorcArgs, R.lensProp('service'), R.lensProp('dorc')), // move non-docker-run keys
  mergeProps(['service', 'options'], R.lensProp('options')), // the rest are docker run args
  R.over(R.lensProp('options'), transformDockerOptions),
  R.converge(
    (cmd, options) => {
      return cmd ? R.append(cmd)(options) : options
    }, [
      R.path(['dorc', 'cmd']),
      R.prop('options')
    ]
  )
)({service, options})
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
