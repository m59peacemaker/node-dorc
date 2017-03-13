const test = require('tape')
const getTags = require('./get-tags')

test('getTags', t => {
  t.deepEqual(
    getTags.fromImage('foo'),
    [],
    'string image doesn\'t count'
  )
  t.deepEqual(
    getTags.fromImage({tag: 'food'}),
    ['food'],
    'image object, string tag'
  )
  t.deepEqual(
    getTags({config: {image: {tag: 'food'}}}),
    ['food'],
    'from service object'
  )
  t.deepEqual(
    getTags.fromImage({tag: ['ham', 'burgers']}),
    ['ham', 'burgers'],
    'image object, array tag'
  )
  t.deepEqual(
    getTags.fromImage([
      {tag: ['ham', 'burgers']},
      {tag: 'pizza'}
    ]),
    ['ham', 'burgers', 'pizza'],
    'array of images, string and array tags'
  )
  t.end()
})
