const test = require('tape')
const Display = require('./display')
const Writable = require('stream').Writable

test('stream output', t => {
  t.plan(1)
  const to = new Writable({
    write: (chunk, encoding, callback) => {
      t.true(/foo | .*bar.*/.test(String(chunk)), 'output is formatted')
      callback()
    }
  })
  const stream = Display.Stream('foo', 'green', to)
  stream.push('bar')
  stream.end()
})
