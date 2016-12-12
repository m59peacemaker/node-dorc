const R = require('ramda')
const {Future} = require('ramda-fantasy')
const futurify = require('../../futurify-p')(Future)
const promisify = require('../../promisify-f')

const modeConfig = {
  services: [
    {env: {foo: 'val'}},
    {image: 'pmkr/nginx'}
  ],
  with: ['../app']
}

const prepare = R.pipe(
  R.over(
    R.lensProp('services'),
    R.filter(R.has('image'))
  ),
  R.lensProp('with')(
    R.ifElse(
      R.isNil,
      Future.of,
      futurify(path => Promise.resolve({bar: 'val'}))
    )
  )
)

promisify(prepare)(modeConfig).then(console.log)
