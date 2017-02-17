const test = require('tape')
const outputFile = require('output-file-sync')
const {join: joinPath} = require('path')
const {exec, execSync} = require('child_process')

const cmd = require.resolve('~/cmd.js')
const tmpDir = '/tmp/dorc'
const setup = config => {
  outputFile(joinPath(tmpDir, '/dorc.yaml'), config)
}

test('"run {service}" starts the container with default command', t => {
  t.plan(1)
  const config = `
    services:
      foo:
        image: pmkr/hello:1.0
  `
  setup(config)
  exec(`${cmd} run foo`, (err, stdout, stderr) => {
    if (err) {
      t.fail(err)
    } else if (stderr === undefined && stdout.trim === 'Hello, World!') {
      t.pass()
    } else {
      console.log('stdout:', stdout)
      console.error('stderr:', stderr)
      t.fail('Wrong output')
    }
  })
})
