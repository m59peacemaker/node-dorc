const {
  test,
  cmd,
  tmpDir,
  setup,
  cleanup,
  execAsync
} = require('~/test')
const {execSync} = require('child_process')
const outputFile = require('output-file-sync')
const {join: joinPath} = require('path')
const run = require('~/handler/run')
const build = require('./')
const docker = require('~/lib/docker-api')

test('build command builds images for given service', t => {
  t.plan(2)
  const config = `
    services:
      hello:
        image:
          file: ./Dockerfile
          tags:
            - dorc-build-test1
            - dorc-build-test2
  `
  const Dockerfile = `
    FROM pmkr/hello:1.0
    CMD ["Dolly"]
  `
  setup(config)
  outputFile(joinPath(tmpDir, '/Dockerfile'), Dockerfile)
  execAsync(`${cmd} build hello --colors`, {cwd: tmpDir})
    .then(([stdout, stderr]) => console.log(stdout))
    .then(() => Promise.all(
      [1, 2].map(idx => execAsync(`docker run --rm dorc-build-test${idx}`)
        .then(([stdout, stderr]) => {
          if (stdout.trim() === 'Hello, Dolly') {
            t.pass(stdout)
          } else {
            t.fail(stderr)
          }
        })
        .catch(t.fail)
        .then(() => execSync(`docker rmi dorc-build-test${idx}`))
      )
    ))
    .catch(t.fail)
    .then(cleanup)
})

test('build command builds images for all services', t => {
  t.plan(2)
  const config = `
    services:
      dolly:
        image:
          file: ./dolly
          tags: dorc-build-test-dolly
      adele:
        image:
          file: ./adele
          tags: dorc-build-test-adele
  `
  setup(config)
  outputFile(joinPath(tmpDir, '/dolly'), `
    FROM pmkr/hello:1.0
    CMD ["Dolly"]
  `)
  outputFile(joinPath(tmpDir, '/adele'), `
    FROM pmkr/hello:1.0
    CMD ["from the other side"]
  `)
  execAsync(`${cmd} build --colors`, {cwd: tmpDir})
    .then(([stdout, stderr]) => console.log(stdout))
    .then(() => Promise.all(
      [
        {name: 'dolly', target: 'Dolly'},
        {name: 'adele', target: 'from the other side'}
      ].map(item => execAsync(`docker run --rm dorc-build-test-${item.name}`)
        .then(([stdout, stderr]) => {
          if (stdout.trim() === `Hello, ${item.target}`) {
            t.pass(stdout)
          } else {
            t.fail(stderr)
          }
        })
        .catch(t.fail)
        .then(() => execSync(`docker rmi dorc-build-test-${item.name}`))
      )
    ))
    .catch(t.fail)
    .then(cleanup)
})

test('build command dry run', t => {
  t.plan(1)
  const config = `
    services:
      hello:
        image:
          file: ./Dockerfile
          tags: dorc-build-test-dry
  `
  setup(config)
  execAsync(`${cmd} build --dry hello --colors`, {cwd: tmpDir})
    .then(([stdout, stderr]) => {
      console.log(stdout, stderr)
      return docker.getImage('dorc-build-test-dry').catch(err => undefined)
        .then(image => {
          if (image) {
            t.fail('created the image on dry run')
          } else {
            if (stdout.includes('docker build --file ./Dockerfile --tag dorc-build-test-dry')) {
              t.pass('just printed and did not create the image')
            } else {
              t.fail('did not print correctly')
            }
          }
        })
    })
    .catch(t.fail)
    .then(cleanup)
})
