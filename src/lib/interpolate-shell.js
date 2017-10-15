const interpolateShell = require('interpolate-shell')
const pify = require('pify')

module.exports = pify((template, cb) => interpolateShell(template, { left: '${{', right: '}}' }, cb))
