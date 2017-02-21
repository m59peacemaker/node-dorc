const {exec, execSync} = require('child_process')
const {
  test,
  cmd,
  tmpDir,
  setup,
  cleanup
} = require('~/test')

test('"run {service}" runs service with default command', t => {
  t.plan(1)
  const config = `
    services:
      hello:
        image: pmkr/hello:1.0
  `
  setup(config)
  exec(`${cmd} run hello`, {cwd: tmpDir}, (err, stdout, stderr) => {
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

test('"run {service} {cmd}" runs service with {cmd}"', t => {
  t.plan(1)
  const config = `
    services:
      hello:
        image: pmkr/hello:1.0
  `
  setup(config)
  exec(`${cmd} run hello Darkness, my old friend`, {cwd: tmpDir}, (err, stdout, stderr) => {
    if (err) {
      t.fail(err)
    } else if (stderr === '' && stdout.split('\n').includes('Hello, Darkness, my old friend')) {
      t.pass()
    } else {
      console.log('stdout:', stdout)
      console.error('stderr:', stderr)
      t.fail('Wrong output')
    }
    cleanup()
  })
})
