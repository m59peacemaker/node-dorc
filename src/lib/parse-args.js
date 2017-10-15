/* {
  global: {},
  sub: {}
  command: ''
} */

const R = require('ramda')
const minimist = require('minimist')
const argParse = (args, expected, options) => {
  const result = minimist(args, { ...prepOptionsForMinimist(expected), stopEarly: true })
  return R.pick(R.keys(expected).concat('_'))(result)
}
const prepOptionsForMinimist = require('./prep-options-for-minimist')

// const parse = (options, args) => parseArgs_(options, args, { stopEarly: true })

const parseArgs = (options, commands, args) => {
  const { _: remA, ...global } = argParse(args, options, { stopEarly: true })
  const [ commandName, ...remB ] = remA
  if (!commands[commandName]) {
    return {
      global
    }
  }
  const command = R.assoc('name', commandName, commands[commandName])
  const sub = command.parse ? command.parse(remB, command.options) : {}
  return {
    commandName,
    command,
    global,
    sub
  }
}

// TODO: ensure all given args are known

module.exports = parseArgs
