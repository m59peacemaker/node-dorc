const singleServiceCommand = handler => {
  return (services, config, args) => {
    if (!args.service) {
      throw new Error('No service name given') // list service names
    }
    const service = services[args.service]
    if (!service) {
      throw new Error(`"${args.service}" - no such service`)
    }
    return handler(service, config, args)
  }
}

module.exports = singleServiceCommand
