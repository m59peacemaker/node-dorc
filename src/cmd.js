#!/usr/bin/env node

// TODO: add "quiet" mode
require('source-map-support').install()

const {spawn} = require('child_process')
const {readFile} = require('mz/fs')
const getConfig = require('./lib/get-config')
const format = require('chalk')
const tryCatch = require('try_catch')
const pad = require('~/lib/pad')
const Help = require('~/lib/help')
const R = require('ramda')
const wrapInQuotes = v => `"${v}"`
const quoteSpaced = v => v.includes(' ') ? wrapInQuotes(v) : v
const zipObjRest = R.curry(require('~/lib/zip-obj-rest'))
const parseArgs = require('~/lib/parse-args')
const commands = require('./commands')
const options = require('./options')

const showHelp = () => console.log(pad.vertical(
  1,
  Help('dorc [dorc-options...] <command> [command-options...]', options, commands)
))

const handle = (options = {}) => {
  if (options.global.help === true) { // TODO: sub command help
    showHelp()
    process.exit(0)
  }
  if (!options.commandName) {
    throw new Error('no command given')
  }
  if (!commands[options.commandName]) {
    throw new Error(`no such command "${options.commandName}"`)
  }
  if (options.sub.help === true) {
    // show sub help
  }
  return getConfig(process.cwd(), options.global.mode || process.env.DORC_MODE)
    .then(config => options.command.handler(
      R.path(['prepared', 'services'], config),
      config,
      R.prop('sub', options)
    ))
}

handle(parseArgs(options, commands, process.argv.slice(2)))
  .catch(err => err.message && console.error(err.message))

/* const assertCmdValid = (cmd) => { */
/*   if (cmd === undefined) { */
/*     throw new Error('no command given') */
/*   } */
/*   if (!handlers.hasOwnProperty(cmd)) { */
/*     throw new Error(`"${cmd}" is not a valid command`) */
/*   } */
/* } */
/* const dryOption = ['dry', { */
/*   describe: 'print only dry run', */
/*   type: 'boolean' */
/* }] */
/* const args = yargs.usage('\nUsage: $0 [options] <command> [command-args...]') */
/*   .option('m', { */
/*     alias: 'mode', */
/*     describe: 'use given mode specific config', */
/*     type: 'string', */
/*     global: true */
/*   }) */
/*   .option('h', { */
/*     alias: 'help', */
/*     describe: 'output usage information', */
/*     type: 'boolean', */
/*     global: true */
/*   }) */
/*   .command({ */
/*     command: 'build [services...]', */
/*     desc: 'build image(s)', */
/*     handler: (args) => handler('build', args), */
/*     builder: (y) => { */
/*       return y */
/*         .option(...dryOption) */
/*     } */
/*   }) */
/*   .command({ */
/*     command: 'run <service> [cmd...]', */
/*     desc: 'run service', */
/*     handler: args => { */
/*       args.cmd = args.cmd.join(' ') */
/*       console.log(args) */
/*       //return handler('run', args) */
/*     }, */
/*     builder: (y) => { */
/*       return y */
/*         .option(...dryOption) */
/*     } */
/*   }) */
/*   .command({ */
/*     command: 'up [services...]', */
/*     desc: 'build and start service(s)', */
/*     handler: (args) => handler('up', args), */
/*     builder: (y) => { */
/*       return y */
/*         .option('d', { */
/*           alias: 'detached', */
/*           describe: 'start services in background', */
/*           type: 'boolean' */
/*         }) */
/*         .option(...dryOption) */
/*     } */
/*   }) */
/*   .command({ */
/*     command: 'down', */
/*     desc: 'stop service(s) and remove container(s)', */
/*     handler: (args) => handler('down', args), */
/*     builder: (y) => { */
/*       return y */
/*         .option(...dryOption) */
/*     } */
/*   }) */
/*   .command({ */
/*     command: 'logs', */
/*     desc: 'connect to logs', */
/*     handler: (args) => handler('logs', args) */
/*   }) */
/*   .command({ */
/*     command: 'sh <service>', */
/*     desc: 'container /bin/sh', */
/*     handler: (args) => handler('sh', args) */
/*   }) */
/*   .argv */

/* const cmd = args._[0] */
/* tryCatch( */
/*   () => assertCmdValid(cmd), */
/*   err => { */
/*     console.error(format.red(err.message)) */
/*     yargs.showHelp() */
/*     process.exit(1) */
/*   } */
/* ) */
