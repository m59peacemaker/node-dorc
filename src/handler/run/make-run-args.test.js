const os = require('os')
const test = require('tape')
const makeArgs = require('./make-run-args')
const image = 'pmkr/hello:1.0'

test('throws if no image given', t => {
  t.plan(1)
  try {
    makeArgs({})
    t.fail("didn't throw")
  } catch (err) {
    t.pass('requires image')
  }
})

test('service.image', t => {
  t.plan(1)
  t.equal(
    makeArgs({image}).join(' '),
    image
  )
})

test('service.env', t => {
  t.plan(1)
  const service = {
    image,
    env: {
      FOO: 'foo',
      BAR: 'bar bar'
    }
  }
  t.equal(
    makeArgs(service).join(' '),
    `-e FOO="foo" -e BAR="bar bar" ${image}`
  )
})

test('service.volumes', t => {
  t.plan(1)
  const service = {
    image,
    volumes: [
      'foo:/app',
      '~/tmp:/tmp'
    ]
  }
  t.equal(
    makeArgs(service).join(' '),
    `-v ${process.cwd()}/foo:/app -v ${os.homedir()}/tmp:/tmp ${image}`
  )
})

test('service.cmd', t => {
  t.plan(1)
  const service = {
    image,
    cmd: 'foo bar baz'
  }
  t.equal(
    makeArgs(service).join(' '),
    `${image} foo bar baz`
  )
})

test('various', t => {
  t.plan(1)
  const service = {
    image,
    cmd: 'foo bar',
    net: 'host',
    env: {
      FOO: 'foo foo'
    },
    volumes: [
      '~/foo:/foo',
    ]
  }
  t.equal(
    makeArgs(service).join(' '),
    `--net host -e FOO="foo foo" -v ${os.homedir()}/foo:/foo ${image} foo bar`
  )
})

test('basic options from service and cli args', t => {
  t.plan(1)
  const service = {
    image,
    env: {
      FOO: 'foo foo'
    }
  }
  t.equal(
    makeArgs(service, {options: ['-e', 'BAR="bar bar"']}).join(' '),
    `-e FOO="foo foo" -e BAR="bar bar" ${image}`
  )
})
