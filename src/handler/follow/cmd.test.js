const {
  test,
  cmd,
  tmpDir,
  setup,
  cleanup,
  execAsync
} = require('~/test')

// assuming "dorc up" tests are passing
test.skip('follow', t => {
  t.plan(1)
  const config = `
    services:
      foo:
        image: alpine
  `
  setup(config)
  // const lines = Array(20).fill(true).map((_, i) => i + 1).join('\n')
  const shCmd = `${cmd}  up foo`
  execAsync(shCmd, { cwd: tmpDir })
    .then(() => {
      const p = execAsync(`${cmd} follow `)
      return p
    })
    .then(([ stdout, stderr ]) => {

    })
    .catch(t.fail)
    .then(cleanup)
})
