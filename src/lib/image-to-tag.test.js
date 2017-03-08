const test = require('tape')
const imageToTag = require('./image-to-tag')

test('imageToTag | works with image: string', t => {
  t.deepEqual(
    imageToTag({
      net: 'host',
      image: 'hey'
    }),
    {
      net: 'host',
      image: 'hey'
    }
  )
  t.end()
})

test('imageToTag | sets image to first tag of last image', t => {
  t.deepEqual(
    imageToTag({
      env: {
        FOO: 'foo'
      },
      image: [
        {
          tag: ['foo', 'bar'],
          file: './foo/Dockerfile'
        },
        {
          tag: ['baz', 'qux'],
          file: './baz/Dockerfile'
        }
      ]
    }),
    {
      env: {
        FOO: 'foo'
      },
      image: 'baz'
    }
  )
  t.end()
})
