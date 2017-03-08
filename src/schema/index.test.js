const test = require('tape')
const schemas = {
  image: require('./service/image'),
  service: require('./service'),
  services: require('./services'),
  config: require('./config')
}

const tests = {
  image: {
    good: [
      'some-tag',
      {tag: 'foo', file: './Dockerfile'},
      {tag: ['foo', 'bar'], file: './Dockerfile'},
      {tag: 'foo', file: './Dockerfile'},
      {tag: 'foo', args: {foo: 'bar', bar: 132}, file: './Dockerfile'},
      {tag: 'foo', context: './hue', file: './Dockerfile'},
      [{tag: 'foo', file: './Dockerfile'}, {tag: ['foo', 'bar'], file: 'whatver.file'}],
      [{tag: 'foo', file: 'first'}, {tag: ['foo', 'bar'], file: '/second.file'}],
    ],
    bad: [
      123,
      '',
      false,
      {tag: 'foo'},
      {file: './Dockerfile'},
      {tag: 123, file: './Dockerfile'},
      {tag: {}, file: './Dockerfile'},
      {tag: '', file: './Dockerfile'},
      {tag: true, file: './Dockerfile'},
      {tag: false, file: './Dockerfile'},
      {tag: 'foo', file: 123},
      {tag: 'foo', file: ''},
      {tag: 'foo', file: './Dockerfile', args: {foo: {}}},
      {tag: 'foo', file: './Dockerfile', args: {foo: []}},
      {tag: 'foo', file: './Dockerfile', context: {}},
      {tag: 'foo', file: './Dockerfile', context: true},
      ['foo', 'bar']
    ]
  },
  service: {
    good: [
      {net: 'host', env: {FOO: 'bar'}, image: 'alpine'},
      {
        user: 1000,
        image: [
          {tag: 'foo', file: 'docker'},
          {tag: ['foo', 'bar'], file: 'foo/Dockerfile'}
        ]
      }
    ],
    bad: [
      true,
      '123',
      [],
      {image: ['foo', 'bar']}
    ]
  },
  config: {
    good: [
      {
        defaultMode: 'dev',
        locals: './config.yaml',
        services: {
          foo: {
            image: 'hey'
          },
          bar: {
            env: {
              FOO: 'bar',
              image: {
                file: './Dockerfile',
                tag: ['foo', 'bar']
              }
            }
          }
        }
      }
    ],
    bad: [
      {defaultMode: []},
      {locals: {}},
      {services: {foo: {image: {}}}}
    ]
  }
}

Object.keys(tests).forEach(type => {
  const schema = schemas[type].loose
  const typeTests = tests[type]
  test(`schema | config-mode-expanded | ${type}`, t => {
    typeTests.good.forEach(data => {
      const {error, result} = schema.validate(data)
      error ? console.log(data) && t.fail(error) : t.pass()
    })
    typeTests.bad.forEach(data => {
      const {error, result} = schema.validate(data)
      if (error) {
        t.pass()
      } else {
        console.log(data)
        t.fail()
      }
    })
    t.end()
  })
})
