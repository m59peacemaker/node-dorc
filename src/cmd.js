#!/usr/bin/env node

require('source-map-support').install()

const {spawn} = require('child_process')
const {readFile} = require('mz/fs')
const getConfig = require('./lib/get-config')
const yargs = require('yargs')
const format = require('chalk')
const filterSelectedServices = require('./lib/filter-selected-services')
const tryCatch = require('try_catch')
const pad = require('~/lib/pad')
const Help = require('~/lib/help')
const minimist = require('minimist')
const R = require('ramda')
const wrapInQuotes = v => `"${v}"`
const quoteSpaced = v => v.includes(' ') ? wrapInQuotes(v) : v
const zipObjRest = R.curry(require('~/lib/zip-obj-rest'))
const parseArgs = (options = {}, args = [], opts = {}) => {
  const _ = Object.keys(options).reduce((_, k) => {
    const v = options[k]
    ;['string', 'boolean'].forEach(type => {
      if (v.type === type) {
        _[type].push(k)
      }
    })
    if (v.alias) {
      _.alias[k] = v.alias
    }
    return _
  }, {string: [], boolean: [], alias: {}})
  return minimist(args, {...opts, ..._})
}
const parse = (options, args) => parseArgs(options, args, {stopEarly: true})

// convenience for minimist, {parsed, remaining} instead of parsed._ (underscore)
const separateRemaining = args => ({parsed: R.omit('_')(args), remaining: R.prop('_')(args)})

process.on('unhandledRejection', (reason) => {
  console.error('unhandled rejection:'.toUpperCase())
  throw reason
})

const handlers = [
  'build',
  'run',
  //'up',
  //'down',
  'follow',
  //'sh',
  //'task'
].reduce((handlers, cmd) => {
  handlers[cmd] = require('./handler/' + cmd)
  return handlers
}, {})


const options = {
  mode: {
    type: 'string',
    description: 'use given mode specific config',
    alias: ['m']
  },
  help: {
    type: 'boolean',
    description: 'show help menu',
    alias: ['h']
  }
}

const dryOption = {
  dry: {
    type: 'boolean',
    description: 'print only dry run'
  }
}

const commands = {
  build: {
    usage: 'build [options...] [services...]',
    description: 'build images(s)',
    options: {
      ...dryOption
    },
    parse: (remaining, options) => R.over(
      R.lensProp('sub'),
      R.assoc('services', remaining)
    )(options)
  },
  run: require('~/handler/run/command')
}
const showHelp = () => console.log(pad.vertical(
  1,
  Help('dorc [dorc-options...] <command> [command-options...]', options, commands)
))

const {_: subArgs, ...global} = parse(options, process.argv.slice(2))
const subInfo = zipObjRest(['command', 'args'], subArgs)
const subCommand = commands[subInfo.command] // validate
// TODO: ensure all given args are known
const {_: remaining, ...sub} = parse(subCommand.options, subInfo.args)

const args = subCommand.parse ? subCommand.parse(remaining, {sub, global}) : {global, sub}

const handler = async (name, args = {}) => {
  if (args.help === true) { // TODO: sub command help
    showHelp()
    process.exit(0)
  }
  const config = await getConfig(process.cwd(), args.global.mode)
  const selectedServices = filterSelectedServices(
    config.prepared.services,
    args.sub.services || [args.sub.service]
  )
  const handler = handlers[name]
  return handler(selectedServices, config, args.sub, args.global)
}

handler(subInfo.command, args)

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
