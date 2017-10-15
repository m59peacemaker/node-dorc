const test = require('tape')
const getRunOptions = require('./get-docker-run-options')

test('getDockerRunOptions - parses docker run options correctly', t => {
  t.plan(5)
  const options = getRunOptions()
  const { rm, env } = options
  t.true(rm)
  t.equal(rm.type, 'boolean')
  t.true(rm.description && rm.description.length)
  t.true(env)
  t.deepEqual(env.alias, [ 'e' ])
})
