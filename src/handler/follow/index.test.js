const {
  test,
  cmd,
  tmpDir,
  setup,
  cleanup,
  execAsync
} = require('~/test')
const util = require('util')
const outputFile = require('output-file-sync')
const {join: joinPath} = require('path')
const run = require('~/handler/run')
const build = require('./')
const docker = require('~/lib/docker-api')

// assuming "dorc run" tests are passing
test.skip('follow', t => {
  t.plan(1)
  const config = `
    services:
      foo:
        image: alpine
        entrypoint: /bin/sh
  `
  setup(config)
  const lines = Array(20).fill(true).map((_, i) => i + 1).join('\n')
  const shCmd = `${cmd}  run -d foo`
  execAsync(shCmd, {cwd: tmpDir})
    .then(() => {
      const p = execAsync(`${cmd} follow `)
      return p
    })
    .then(([stdout, stderr]) => {
      
    })
    .catch(t.fail)
    .then(cleanup)
})
