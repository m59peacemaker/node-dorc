const prepare = require('./prepare-services')
const test = require('tape')

test('prepare', t => {
  t.plan(1)
  t.deepEqual(
    prepare({
      foo: {
        image: [{file: './Dockerfile'}]
      }
    }),
    {
      foo: [{file: './Dockerfile'}]
    }
  )
})
