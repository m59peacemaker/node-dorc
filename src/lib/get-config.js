const path = require('path')
const { readFile } = require('mz/fs')
const { safeLoad: parseYAML } = require('js-yaml')
const interpolate = require('interpol8')
const interpolateShell = require('./interpolate-shell')
const getModeConfig = require('./get-mode-config')
const R = require('ramda')
const normalizeConfig = require('./normalize-config')
const configSchema = require('~/schema/config')

const getDefaults = (projectPath) => ({
  projectName: path.basename(projectPath)
})

const getLocals = (localsFile) => {
  if (localsFile === undefined) {
    return Promise.resolve({})
  }
  return readFile(localsFile)
    .then(raw => parseYAML(raw))
    .catch(() => ({}))
}

const interpolateConfig = async (raw, locals) => {
  // interpolate ${{ }} shell placeholders in raw config
  const doc_ = await interpolateShell(raw)
  // interpolate {{ }} placeholders in raw config
  return interpolate(doc_, Object.assign({}, process.env, locals))
}

const getConfig = async (projectPath, mode) => {
  // read dorc.yaml
  const configDocPath = path.join(projectPath, 'dorc.yaml')
  let raw
  try {
    raw = await readFile(configDocPath, 'utf8')
  } catch (err) {
    process.stdout.write(`No dorc.yaml found at ${projectPath}\n`)
    process.exit(1)
  }
  // parse into js object so we can get locals file path
  const preInterpolateConfig = parseYAML(raw)
  const locals = await getLocals(preInterpolateConfig.locals)
  const interpolated = await interpolateConfig(raw, locals)
  const parsed = Object.assign({}, getDefaults(projectPath), parseYAML(interpolated))
  configSchema.loose.validate(parsed)
  // merge config objects with mode specific objects,
  //   so that we have only the config for the given mode
  const modeConfig = getModeConfig(mode || parsed.defaultMode, parsed)
  const projectInfo = {
    path: projectPath,
    name: parsed.projectName
  }
  const prepared = R.pipe(
    // filter services that don't have an image
    R.over(R.lensProp('services'), R.filter(R.has('image'))),
    config => normalizeConfig(config, projectInfo)
  )(modeConfig)

  const projectConfig = {
    project: projectInfo,
    locals,
    raw,
    parsed,
    prepared
  }
  return projectConfig
}

module.exports = getConfig
