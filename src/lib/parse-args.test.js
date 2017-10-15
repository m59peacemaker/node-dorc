const test = require('tape')
const parseArgs = require('./parse-args')
const options = require('~/options')
const commands = require('~/commands')
const R = require('ramda')

test('parse args', t => {
  t.plan(1)
  t.deepEqual(
    parseArgs(
      options,
      commands,
      [
        '-m', 'dev', 'run',
        '--dry', '-e', 'FOO=foo', '--detach', '-d', '-e', 'FOO=bar bar', '--no-healthcheck', 'foo', 'doit', 'toit'
      ]
    ),
    {
      commandName: 'run',
      command: R.assoc('name', 'run', commands.run),
      global: { help: false, mode: 'dev' },
      sub: {
        options: {
          dry: true
        },
        docker: {
          env: [ 'FOO=foo', 'FOO=bar bar' ],
          detach: true,
          'no-healthcheck': true
        },
        service: 'foo',
        cmd: [ 'doit', 'toit' ]
      }
    }
  )
})
