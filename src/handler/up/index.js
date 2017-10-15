const build = require('~/handler/build')
const run = require('~/handler/run')
const follow = require('~/handler/follow')
const needsBuild = require('~/lib/service/needs-build')

const up = (service, options = {}) => {
  return (needsBuild(service) ? build(service, { dry: options.dry }) : Promise.resolve())
    .then(() => run(
      service,
      { cmd: [], options: {}, docker: { detach: true, name: service.container } }
    ))
    .then(() => {
      if (options.detach !== true) {
        return follow(service, {})
      }
    })
}

module.exports = up
