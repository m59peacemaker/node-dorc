const os = require('os')
const test = require('tape')
const makeArgs = require('./make-run-args')
const image = 'pmkr/hello:1.0'

// makeRunArgs(serviceConfigObject, {service: '', cmd: [], options: {}, docker: {}})

test('throws if no service.image', t => {
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
    makeArgs({
      name: 'foo',
      container: 'project_foo',
      config: {image}
    }).join(' '),
    image
  )
})

test('service.env', t => {
  t.plan(1)
  const service = {
    name: 'foo',
    container: 'project_foo',
    config: {
      image,
      env: {
        FOO: 'foo',
        BAR: 'bar bar'
      }
    }
  }
  t.deepEqual(
    makeArgs(service),
    ['-e', 'FOO=foo', '-e', 'BAR=bar bar', image]
  )
})

test('service.volumes', t => {
  t.plan(1)
  const service = {
    name: 'foo',
    container: 'project_foo',
    config: {
      image,
      volumes: [
        'foo:/app',
        '~/tmp:/tmp'
      ]
    }
  }
  t.deepEqual(
    makeArgs(service).join(' '),
    `-v ${process.cwd()}/foo:/app -v ${os.homedir()}/tmp:/tmp ${image}`
  )
})

test('service.cmd', t => {
  t.plan(1)
  const service = {
    name: 'foo',
    container: 'project_foo',
    config: {
      image,
      cmd: ['foo', 'bar', 'baz']
    }
  }
  t.deepEqual(
    makeArgs(service),
    [image, 'foo', 'bar', 'baz']
  )
})

test('service.cmd with quotes', t => {
  t.plan(1)
  const service = {
    name: 'foo',
    container: 'project_foo',
    config: {
      image,
      cmd: ['/bin/sh', '-c', 'printf "fail"']
    }
  }
  t.deepEqual(
    makeArgs(service),
    [image, '/bin/sh', '-c', 'printf "fail"']
  )
})

test('various', t => {
  t.plan(1)
  const service = {
    name: 'foo',
    container: 'project_foo',
    config: {
      image,
      cmd: ['foo', 'bar'],
      net: 'host',
      env: {
        FOO: 'foo foo'
      },
      volumes: [
        '~/foo:/foo',
      ]
    }
  }
  t.deepEqual(
    makeArgs(service),
    ['--net', 'host', '-e', 'FOO=foo foo', '-v', `${os.homedir()}/foo:/foo`, image, 'foo', 'bar']
  )
})

test('basic options from service and cli args', t => {
  t.plan(1)
  const service = {
    name: 'foo',
    container: 'project_foo',
    config: {
      image,
      env: {
        FOO: 'foo foo'
      }
    }
  }
  t.deepEqual(
    makeArgs(service, {docker: {env: 'FOO=bar bar'}}),
    ['-e', 'FOO=foo foo', '--env', 'FOO=bar bar', image]
  )
})
