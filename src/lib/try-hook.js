const R = require('ramda')
const runHook = require('./run-hook')

const validHooks = [
  'init',
  'before-up'
]

const tryHook = (hookName, config) => {
  if (R.not(R.contains(hookName, validHooks))) {
    throw new Error(`"${hookName}" is not a supported hook`)
  }
  const hook = R.view(R.lensPath([ 'hooks', hookName ]), config)
  return R.ifElse(
    () => R.isNil(hook),
    () => Promise.resolve(),
    () => runHook(hook, hookName, config.serviceName)
  )()
}

module.exports = tryHook
