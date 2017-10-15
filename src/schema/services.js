const Joi = require('joi')
const service = require('./service')

module.exports = [ 'loose', 'strict' ].reduce((acc, type) => {
  acc[type] = Joi.object().pattern(/.+/, service[type])
  return acc
}, {})
