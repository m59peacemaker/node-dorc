const Joi = require('joi')
const stringOrNumber = Joi.alternatives().try(Joi.string(), Joi.number())
const arrayOfStrings = Joi.array().items(Joi.string())

const looseObject = Joi
  .object({
    tag: [Joi.string(), arrayOfStrings],
    file: Joi.string(),
    args: Joi.object().pattern(/.+/, stringOrNumber),
    context: Joi.string()
  })
  .requiredKeys('tag', 'file')

const strictObject = Joi
  .object({
    tag: arrayOfStrings,
    file: Joi.string(),
    args: Joi.object().pattern(/.+/, stringOrNumber),
    context: Joi.string()
  })
  .requiredKeys('tag', 'file')

const loose = Joi.alternatives().try(
  Joi.string(),
  looseObject,
  Joi.array().items(looseObject)
)

const strict = Joi.alternatives().try(
  Joi.string(),
  Joi.array().items(strictObject)
)

module.exports = {
  loose,
  strict
}
