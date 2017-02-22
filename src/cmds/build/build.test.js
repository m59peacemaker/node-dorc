const {exec, execSync} = require('child_process')
const {
  test,
  cmd,
  tmpDir,
  setup: _setup,
  cleanup
} = require('~/test')
const outputFile = require('output-file-sync')
const {join: joinPath} = require('path')
const run = require('~/cmds/run')
const build = require('./')

const setup = (config, Dockerfile) => {
  _setup(config)
  outputFile(joinPath(tmpDir, '/Dockerfile'), Dockerfile)
}

test('', t => {
  t.plan(1)
  return t.fail()
  const config = `
    services:
      hello:
        image:
          file: ./Dockerfile
          tags: dorc-build-test
  `
  const Dockerfile = `
    FROM pmkr/hello:1.0
    CMD ["Dolly"]
  `
  /*setup(config, Dockerfile)
  exec(`${cmd} build hello`, {cwd: tmpDir}, (err, stdout, stderr) => {
    if (err) {
      return t.fail(err)
    }
    console.log(stdout, stderr)
    return t.fail()
    if (err) {
      t.fail(err)
    } else if (stderr === '' && stdout.split('\n').includes('Hello, World!')) {
      t.pass()
    } else {
      console.log('stdout:', stdout)
      console.error('stderr:', stderr)
      t.fail('Wrong output')
    }
    cleanup()
  })*/
})
