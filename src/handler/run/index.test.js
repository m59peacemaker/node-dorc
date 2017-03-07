const {exec, execSync, spawn} = require('child_process')
const util = require('util')
const docker = require('~/lib/docker-api')
const {
  test,
  cmd,
  tmpDir,
  setup,
  cleanup,
  execAsync,
  execFileAsync
} = require('~/test')

test('"run {service}" runs service with default command', t => {
  t.plan(1)
  const config = `
    services:
      hello:
        image: pmkr/hello:1.0
  `
  setup(config)
  execAsync(`${cmd} run hello`, {cwd: tmpDir})
    .then(([stdout, stderr]) => {
      console.log('stdout:', stdout)
      console.error('stderr:', stderr)
      if (stderr === '' && stdout.split('\n').includes('Hello, World!')) {
        t.pass()
      } else {
        t.fail('Wrong output')
      }
    })
    .catch(t.fail)
    .then(cleanup)
})

test('"run {service} {cmd}" runs service with {cmd}"', t => {
  t.plan(1)
  const config = `
    services:
      hello:
        image: pmkr/hello:1.0
  `
  setup(config)
  execAsync(`${cmd} run hello Darkness, my old friend`, {cwd: tmpDir})
    .then(([stdout, stderr]) => {
      if (stderr === '' && stdout.split('\n').includes('Hello, Darkness, my old friend')) {
        t.pass()
      } else {
        console.log('stdout:', stdout)
        console.error('stderr:', stderr)
        t.fail('Wrong output')
      }
    })
    .catch(t.fail)
    .then(cleanup)
})

test('multi-line, complicated, quote-ridden command', t => {
  t.plan(1)
  const config = `
    services:
      foo:
        image: alpine
        entrypoint: /bin/sh
  `
  setup(config)
  const lines = Array(3).fill(true).map((_, i) => i + 1).join('\n')
  const shCmd = `${cmd} run foo -c "printf '${lines}'"`
  execAsync(shCmd, {cwd: tmpDir})
    .then(([stdout, stderr]) => {
      console.log('stdout:\n', util.inspect(stdout))
      console.log(util.inspect(lines))
      if (stderr.length) {
        t.fail(util.inspect(stderr))
      } else {
        t.equal(stdout.split('\n').slice(-3).join(''), '123')
      }
    })
    .catch(t.fail)
    .then(cleanup)
})

test('"dorc run" accepts "docker run" options', t => {
  t.plan(1)
  const config = `
    services:
      foo:
        image: alpine
        cmd: /bin/sh -c "printf \\"$FOO\\""
  `
  setup(config)
  execFileAsync(cmd, ['run', '--rm', '-e', 'FOO=yo dud', 'foo'], {cwd: tmpDir})
    .then(([stdout, stderr]) => {
      console.log(stdout, stderr)
      const lines = stdout.split('\n')
      t.equal(lines.slice(-1).join(''), 'yo dud')
    })
    .catch(t.fail)
    .then(cleanup)
})

test('"dorc run" uses command from cli args', t => {
  t.plan(1)
  const config = `
    services:
      foo:
        image: alpine
        env:
          FOO: yo dud
        cmd: printf "fail"
  `
  setup(config)
  execFileAsync(cmd, ['run', '--rm', '-e', 'FOO=yo dud', 'foo', '/bin/sh', '-c', 'printf "$FOO"'], {cwd: tmpDir})
    .then(([stdout, stderr]) => {
      console.log(stdout, stderr)
      const lines = stdout.split('\n')
      t.equal(lines.slice(-1).join(''), 'yo dud')
    })
    .catch(t.fail)
    .then(cleanup)
})
