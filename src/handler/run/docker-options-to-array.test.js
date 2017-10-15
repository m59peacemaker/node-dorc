const test = require('tape')
const toArray = require('./docker-options-to-array')

test('dockerOptionsToArray', t => {
  t.deepEqual(
    toArray({
      env: [ 'FOO=foo', 'FOO=bar bar' ],
      detach: true,
      'no-healthcheck': true,
      net: 'host'
    }),
    [ '--env', 'FOO=foo', '--env', 'FOO=bar bar', '--detach', '--no-healthcheck', '--net', 'host' ]
  )
  t.end()
})

test('dockerOptionsToArray | false values are ignored', t => {
  t.deepEqual(
    toArray({
      env: [ 'FOO=foo', 'FOO=bar bar' ],
      detach: false,
      'no-healthcheck': true,
      net: 'host'
    }),
    [ '--env', 'FOO=foo', '--env', 'FOO=bar bar', '--no-healthcheck', '--net', 'host' ]
  )
  t.end()
})
