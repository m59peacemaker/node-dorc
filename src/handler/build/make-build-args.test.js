const os = require('os')
const test = require('tape')
const makeArgs = require('./make-build-args')

test('no config results in basic build args', t => {
  t.plan(1)
  t.equal(
    makeArgs().join(' '),
    './'
  )
})

test('file and tags', t => {
  t.plan(1)
  t.equal(
    makeArgs({
      file: './Dockerfile',
      tags: ['foo']
    }).join(' '),
    '--file ./Dockerfile --tag foo ./'
  )
})

test('context', t => {
  t.plan(1)
  t.equal(
    makeArgs({
      context: './foo'
    }).join(' '),
    './foo'
  )
})

test('context expands ~', t => {
  t.plan(1)
  t.equal(
    makeArgs({
      context: '~/foo'
    }).join(' '),
    `${os.homedir()}/foo`
  )
})

test('file expands ~', t => {
  t.plan(1)
  t.equal(
    makeArgs({
      file: '~/DAT-FILE'
    }).join(' '),
    `--file ${os.homedir()}/DAT-FILE ./`
  )
})
