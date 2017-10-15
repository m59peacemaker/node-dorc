const Joi = require('joi')
const image = require('./image')

/* would love to get this working and use it in "service.mode" schema
foo: fooSchema // if "foo" not here, then "foo" required under a AND b
bar:
  a:
    foo: fooSchema // "foo" is optional here if present at top
  b:
    foo: fooSchema // "foo" is optional here if present at top
*/

const loose = Joi
  .object({
    image: image.loose,
    mode: Joi
      .object({
        image: image.loose
      })
      .unknown()
  })
  .unknown()

const strict = loose
  .keys({
    mode: Joi.any().forbidden() // should have been collapsed away
  })
  .requiredKeys('image')

module.exports = {
  loose,
  strict
}
