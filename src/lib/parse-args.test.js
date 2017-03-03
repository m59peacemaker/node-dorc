const test = require('tape')
const parseArgs = require('./parse-args')

test('parse args' , t => {
  t.plan(1)
  t.equal(
    parseArgs(['run', '--dry', '-e', 'FOO="foo"', '-d']),
    {

    }
  )
  t.fail()
})
