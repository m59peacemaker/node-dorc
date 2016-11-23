#!/usr/bin/env node

require('source-map-support').install()

const {spawn} = require('child_process')
const {readFile} = require('mz/fs')
const getConfig = require('./lib/get-config')
const yargs = require('yargs')
const format = require('chalk')

process.on('unhandledRejection', (reason) => {
  console.error('unhandled rejection:'.toUpperCase(), reason)
  process.exit(1)
})

const cmds = {
  up: require('./lib/cmds/up'),
  build: require('./lib/cmds/build')
}

const handler = async (name, args = {}) => {
  if (args.h === true) {
    yargs.showHelp()
    process.exit(0)
  }
  args.services = args._.slice(1)
  const config = await getConfig(args.mode)
  const handler = cmds[name]
  handler(config, args)
}

const assertArgsValid = (args) => {
  if (args.cmd === undefined) {
    console.error('no command given')
    process.exit(1)
  }

  if (!cmds.hasOwnProperty(args.cmd)) {
    console.error(`"${args.cmd}" is not a valid command`)
    process.exit(1)
  }
}

const args = yargs.usage('\nUsage: $0 [options] <command> [services...]')
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
    command: 'build',
    desc: 'build image(s)',
    handler: (args) => handler('build', args)
  })
  .command({
    command: 'up',
    desc: 'start service(s)',
    handler: (args) => handler('build', args)
  })
  .argv

const cmdArg = args._[0]
if (!cmds.hasOwnProperty(cmdArg)) {
  console.error(format.red(`"${cmdArg}" is not a valid command`))
  yargs.showHelp()
  process.exit(1)
}
