const os = require('os')
const test = require('tape')
const makeArgs = require('./make-build-args')

test('no config results in basic build args', t => {
  t.plan(1)
  t.equal(
    makeArgs().join(' '),
    'build ./'
  )
})

test('file and tags', t => {
  t.plan(1)
  t.equal(
    makeArgs({
      file: './Dockerfile',
      tags: ['foo']
    }).join(' '),
    'build --file ./Dockerfile --tag foo ./'
  )
})

test('context', t => {
  t.plan(1)
  t.equal(
    makeArgs({
      context: './foo'
    }).join(' '),
    'build ./foo'
  )
})

test('context expands ~', t => {
  t.plan(1)
  t.equal(
    makeArgs({
      context: '~/foo'
    }).join(' '),
    `build ${os.homedir()}/foo`
  )
})

test('file expands ~', t => {
  t.plan(1)
  t.equal(
    makeArgs({
      file: '~/DAT-FILE'
    }).join(' '),
    `build --file ${os.homedir()}/DAT-FILE ./`
  )
})
