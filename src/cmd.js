#!/usr/bin/env node

require('source-map-support').install()

const {spawn} = require('child_process')
const {readFile} = require('mz/fs')
const getConfig = require('./lib/get-config')
const yargs = require('yargs')
const format = require('chalk')
const filterSelectedServices = require('./lib/filter-selected-services')
const tryCatch = require('try_catch')

process.on('unhandledRejection', (reason) => {
  console.error('unhandled rejection:'.toUpperCase())
  throw reason
})

const handlers = [
  'build',
  'run'
  //'up',
  //'down',
  //'follow',
  //'sh',
  //'task'
].reduce((handlers, cmd) => {
  handlers[cmd] = require('./handler/' + cmd)
  return handlers
}, {})

const handler = async (name, args = {}) => {
  if (args.h === true) {
    yargs.showHelp()
    process.exit(0)
  }
  args.services = args._.slice(1)
  const config = await getConfig(process.cwd(), args.mode)
  const selectedServices = filterSelectedServices(config.prepared.services, args.services)
  const handler = handlers[name]
  return handler(selectedServices, config, args)
}

const assertCmdValid = (cmd) => {
  if (cmd === undefined) {
    throw new Error('no command given')
  }
  if (!handlers.hasOwnProperty(cmd)) {
    throw new Error(`"${cmd}" is not a valid command`)
  }
}
const dryOption = ['dry', {
  describe: 'print only dry run',
  type: 'boolean'
}]
const args = yargs.usage('\nUsage: $0 [options] <command> [command-args...]')
  .option('m', {
    alias: 'mode',
    describe: 'use given mode specific config',
    type: 'string',
    global: true
  })
  .option('h', {
    alias: 'help',
    describe: 'output usage information',
    type: 'boolean',
    global: true
  })
  .command({
    command: 'build [services...]',
    desc: 'build image(s)',
    handler: (args) => handler('build', args),
    builder: (y) => {
      return y
        .option(...dryOption)
    }
  })
  .command({
    command: 'run <service> [cmd...]',
    desc: 'run service',
    handler: args => {
      args.cmd = args.cmd.join(' ')
      return handler('run', args)
    },
    builder: (y) => {
      return y
        .option(...dryOption)
    }
  })
  .command({
    command: 'up [services...]',
    desc: 'build and start service(s)',
    handler: (args) => handler('up', args),
    builder: (y) => {
      return y
        .option('d', {
          alias: 'detached',
          describe: 'start services in background',
          type: 'boolean'
        })
        .option(...dryOption)
    }
  })
  .command({
    command: 'down',
    desc: 'stop service(s) and remove container(s)',
    handler: (args) => handler('down', args),
    builder: (y) => {
      return y
        .option(...dryOption)
    }
  })
  .command({
    command: 'logs',
    desc: 'connect to logs',
    handler: (args) => handler('logs', args)
  })
  .command({
    command: 'sh <service>',
    desc: 'container /bin/sh',
    handler: (args) => handler('sh', args)
  })
  .argv

const cmd = args._[0]
tryCatch(
  () => assertCmdValid(cmd),
  err => {
    console.error(format.red(err.message))
    yargs.showHelp()
    process.exit(1)
  }
)
