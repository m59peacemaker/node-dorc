const sharedOptions = require('~/lib/shared-options')
const parse = require('./parse')
const run = require('./')

const defaultArgs = { cmd: [], options: {}, docker: {} }
/* args.docker keys are --names (not aliases)
 * false values will be ignored
 * values that can be declared multiple times can be strings or arrays
 * {env: 'FOO=foo'} {env: ['FOO=foo', 'BAR=bar']}
 */
const handler = (services, config, args = defaultArgs) => {
  if (!args.service) {
    throw new Error('No service name given') // list service names
  }
  const service = services[args.service]
  if (!service) {
    throw new Error(`"${args.service}" - no such service`)
  }
  return run(service, args)
}

const command = {
  usage: 'run [options...] <service> [cmd...]',
  description: 'run service (also accepts all docker run options)',
  options: {
    dry: sharedOptions.dry
  },
  parse,
  handler
}

module.exports = command
