const {
  join: joinPath,
  isAbsolute: isAbsolutePath
} = require('path')
const {homedir: getHomedir} = require('os')
const R = require('ramda')
const expandTilde = require('expand-tilde')
const moveProps = require('~/lib/move-props')
const mergeProps = require('~/lib/merge-props')
const transformDockerOptions = require('~/lib/transform-docker-options')
const dockerOptionsToArray = require('./docker-options-to-array')

const ensureArray = v => Array.isArray(v) ? v : [v]

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
  env: value => R.toPairs(value).map(([k, v]) => ['-e', `${k}=${v}`]),
  ports: value => value.map(v => ['-p', v])
}

const renameKeys = R.curry((keysMap, obj) =>
  R.reduce((acc, key) => R.assoc(keysMap[key] || key, obj[key], acc), {}, R.keys(obj))
)

const propOrPath = R.ifElse(R.isArrayLike, R.path, R.prop)
const propsOrPaths = items => R.juxt(R.map(propOrPath, items))
const concatAll = R.reduce(R.concat, [])
const removeNil = R.filter(R.complement(R.isNil))

const findCmd = (a, b) => (b.cmd && b.cmd.length) ? b.cmd : (a.cmd || [])

const makeRunArgs = (
  service, // similiar to `args.docker` but with additional properties like `image`
  args = {}, // {docker: {env: 'FOO=foo', net: 'host'} cmd: [...commandParts]}
  dirs = {
    cwd: process.cwd(),
    homedir: getHomedir()
  }
) => {
  if (!service.image) {
    throw new Error('service image is required')
  }
  return R.pipe(
    // move props that aren't for docker run from "service" to "dorc"
    moveProps(dorcArgs, R.lensProp('service'), R.lensProp('dorc')),
    // the rest are docker run options
    // mergeProps(['service', 'options'], R.lensProp('options')),
    renameKeys({service: 'options'}),
    R.over(R.lensProp('options'), transformDockerOptions(propTransforms, dirs)),
    R.over(R.lensPath(['args', 'docker']), dockerOptionsToArray),
    R.converge(
      R.set(R.lensProp('options')),
      [
        R.pipe(propsOrPaths(['options', ['args', 'docker']]), concatAll),
        R.identity
      ]
    ),
    R.converge(
      R.unapply(R.reduce(R.concat, [])),
      [
        R.prop('options'),
        R.pipe(R.path(['dorc', 'image']), ensureArray),
        R.converge(findCmd, [R.prop('dorc'), R.prop('args')]),
      ]
    )
  )({service, args})
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
