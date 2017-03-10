const R = require('ramda')
const follow = require('./')

const handler = (services, config, args) => {
  const [name, service] = R.toPairs(selectedServices)
  const container = `${config.project.name}_${name}`
  console.log(selectedServices)
}

module.exports = handler
