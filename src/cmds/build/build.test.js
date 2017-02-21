const {exec} = require('child_process')
const {
  test,
  cmd,
  tmpDir,
  setup,
  cleanup
} = require('~/test')

test('', t => {
  t.plan(1)
  const config = `
    services:
      hello:
        image: pmkr/hello:1.0
  `
  setup(config)
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
  })
})
