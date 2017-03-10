const minimist = require('minimist')
const sharedOptions = require('~/lib/shared-options')
const imageToTag = require('~/lib/image-to-tag')
const R = require('ramda')
const {spawn} = require('child_process')
const build = require('~/handler/build')
const run = require('~/handler/run')
const follow = require('~/handler/follow')
const pickIfAnySpecified = require('~/lib/pick-if-any-specified')
const needsBuild = require('~/lib/service/needs-build')

const parse = (args, options) => {
  return {services: minimist(args)._}
}

const up = (services, options = {}) => R.map(service => {
  return needsBuild(service) ? build(service, {dry: options.dry}) : Promise.resolve()
    .then(() => run(
      imageToTag(service),
      {
        cmd: [],
        options: {},
        docker: {detach: true, name: service.container}
      }
      ))
      .then(() => {
        if (options.detach !== true) {
          return follow(service, {})
        }
      })
})(services)

const handler = (services, config, args) => {
  const selectedServices = pickIfAnySpecified(args.services, services)
  return up(selectedServices, {})
}

const command = {
  usage: 'up [services...]',
  description: 'build and start service(s)',
  options: {
    detach: sharedOptions.detach
  },
  parse,
  handler
}

module.exports = command
