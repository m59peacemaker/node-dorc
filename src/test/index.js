const test = require('tape')
const outputFile = require('output-file-sync')
const {join: joinPath} = require('path')
const {sync: rmdir} = require('rimraf')

const cmd = require.resolve('~/cmd.js')

const tmpDir = '/tmp/dorc'

const setup = config => {
  outputFile(joinPath(tmpDir, '/dorc.yaml'), config)
}

const cleanup = () => {
  rmdir(tmpDir)
}

module.exports = {
  test,
  cmd,
  tmpDir,
  setup,
  cleanup
}
