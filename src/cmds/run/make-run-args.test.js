const test = require('tape')
const makeArgs = require('./make-run-args')

test('none', t => {
  t.plan(1)
  t.equal(
    makeArgs({}).join(' '),
    ''
  )
})

test('service.env', t => {
  t.plan(1)
  const service = {
    env: {
      FOO: 'foo',
      BAR: 'bar'
    }
  }
  t.equal(
    makeArgs(service).join(' '),
    '-e FOO=foo -e BAR=bar'
  )
})

test('service.cmd', t => {
  t.plan(1)
  const service = {
    cmd: 'foo bar baz'
  }
  t.equal(
    makeArgs(service).join(' '),
    'foo bar baz'
  )
})
