const Joi = require('joi')
const services = require('./services')

module.exports = ['loose', 'strict'].reduce((acc, v) => {
  acc[v] = Joi
    .object({
      defaultMode: Joi.string(),
      locals: Joi.string(),
      services: services[v]
    })
    .required()
  return acc
}, {})
