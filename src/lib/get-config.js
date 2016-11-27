const path = require('path')
const {readFile} = require('mz/fs')
const {safeLoad: parseYAML} = require('js-yaml')
const interpolate = require('interpol8')
const interpolateShell = require('./interpolate-shell')
const getModeConfig = require('./get-mode-config')

const defaults = {
  projectName: path.basename(process.cwd())
}

const getLocals = (env, localsFile) => {
  if (localsFile === undefined) {
    return Promise.resolve(env)
  }
  return readFile(localsFile)
    .then((locals) => Object.assign({}, env, parseYAML(locals)))
    .catch(err => env)
}

const getConfig = async (mode) => {
  // read dorc.yaml
  let configDoc
  try {
    configDoc = await readFile('dorc.yaml', 'utf8')
  } catch (err) {
    console.log(`No dorc.yaml found at ${process.cwd()}`)
    process.exit(1)
  }
  // parse into js object so we can get locals file path
  const preInterpolateConfig = parseYAML(configDoc)
  // read object from config.locals file and merge it with environment vars
  const locals = await getLocals(process.env, preInterpolateConfig.locals)
  // interpolate ${{ }} shell placeholders in raw config
  const doc_ = await interpolateShell(configDoc)
  // interpolate {{ }} placeholders in raw config
  const doc__ = interpolate(doc_, locals)
  // parse interpolated config into js object
  const config = Object.assign({}, defaults, parseYAML(doc__))
  // merge config objects with mode specific objects,
  //   so that we have only the config for the given mode
  const modeConfig = getModeConfig(mode || config.defaultMode, config)
  return modeConfig
}

module.exports = getConfig
