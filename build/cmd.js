#!/usr/bin/env node


// TODO: add "quiet" mode
require('source-map-support').install();

var _require = require('child_process');

const spawn = _require.spawn;

var _require2 = require('mz/fs');

const readFile = _require2.readFile;

const getConfig = require('./lib/get-config');
const format = require('chalk');
const tryCatch = require('try_catch');
const pad = require('./lib/pad');
const Help = require('./lib/help');
const R = require('ramda');
const wrapInQuotes = v => `"${ v }"`;
const quoteSpaced = v => v.includes(' ') ? wrapInQuotes(v) : v;
const zipObjRest = R.curry(require('./lib/zip-obj-rest'));
const parseArgs = require('./lib/parse-args');
const commands = require('./commands');
const options = require('./options');

const showHelp = () => console.log(pad.vertical(1, Help('dorc [dorc-options...] <command> [command-options...]', options, commands)));

const handle = (options = {}) => {
  if (options.global.help === true) {
    // TODO: sub command help
    showHelp();
    process.exit(0);
  }
  if (!options.commandName) {
    throw new Error('no command given');
  }
  if (!commands[options.commandName]) {
    throw new Error(`no such command "${ options.commandName }"`);
  }
  if (options.sub.help === true) {
    // show sub help
  }
  return getConfig(process.cwd(), options.global.mode || process.env.DORC_MODE).then(config => options.command.handler(R.path(['prepared', 'services'], config), config, R.prop('sub', options)));
};

handle(parseArgs(options, commands, process.argv.slice(2))).catch(err => err.message && console.error(err.message));

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbWQuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImluc3RhbGwiLCJzcGF3biIsInJlYWRGaWxlIiwiZ2V0Q29uZmlnIiwiZm9ybWF0IiwidHJ5Q2F0Y2giLCJwYWQiLCJIZWxwIiwiUiIsIndyYXBJblF1b3RlcyIsInYiLCJxdW90ZVNwYWNlZCIsImluY2x1ZGVzIiwiemlwT2JqUmVzdCIsImN1cnJ5IiwicGFyc2VBcmdzIiwiY29tbWFuZHMiLCJvcHRpb25zIiwic2hvd0hlbHAiLCJjb25zb2xlIiwibG9nIiwidmVydGljYWwiLCJoYW5kbGUiLCJnbG9iYWwiLCJoZWxwIiwicHJvY2VzcyIsImV4aXQiLCJjb21tYW5kTmFtZSIsIkVycm9yIiwic3ViIiwiY3dkIiwibW9kZSIsImVudiIsIkRPUkNfTU9ERSIsInRoZW4iLCJjb25maWciLCJjb21tYW5kIiwiaGFuZGxlciIsInBhdGgiLCJwcm9wIiwiYXJndiIsInNsaWNlIiwiY2F0Y2giLCJlcnIiLCJtZXNzYWdlIiwiZXJyb3IiXSwibWFwcGluZ3MiOiI7O0FBRUE7QUFDQUEsUUFBUSxvQkFBUixFQUE4QkMsT0FBOUI7O2VBRWdCRCxRQUFRLGVBQVIsQzs7TUFBVEUsSyxZQUFBQSxLOztnQkFDWUYsUUFBUSxPQUFSLEM7O01BQVpHLFEsYUFBQUEsUTs7QUFDUCxNQUFNQyxZQUFZSixRQUFRLGtCQUFSLENBQWxCO0FBQ0EsTUFBTUssU0FBU0wsUUFBUSxPQUFSLENBQWY7QUFDQSxNQUFNTSxXQUFXTixRQUFRLFdBQVIsQ0FBakI7QUFDQSxNQUFNTyxNQUFNUCxRQUFRLFdBQVIsQ0FBWjtBQUNBLE1BQU1RLE9BQU9SLFFBQVEsWUFBUixDQUFiO0FBQ0EsTUFBTVMsSUFBSVQsUUFBUSxPQUFSLENBQVY7QUFDQSxNQUFNVSxlQUFlQyxLQUFNLEtBQUdBLENBQUUsSUFBaEM7QUFDQSxNQUFNQyxjQUFjRCxLQUFLQSxFQUFFRSxRQUFGLENBQVcsR0FBWCxJQUFrQkgsYUFBYUMsQ0FBYixDQUFsQixHQUFvQ0EsQ0FBN0Q7QUFDQSxNQUFNRyxhQUFhTCxFQUFFTSxLQUFGLENBQVFmLFFBQVEsb0JBQVIsQ0FBUixDQUFuQjtBQUNBLE1BQU1nQixZQUFZaEIsUUFBUSxrQkFBUixDQUFsQjtBQUNBLE1BQU1pQixXQUFXakIsUUFBUSxZQUFSLENBQWpCO0FBQ0EsTUFBTWtCLFVBQVVsQixRQUFRLFdBQVIsQ0FBaEI7O0FBRUEsTUFBTW1CLFdBQVcsTUFBTUMsUUFBUUMsR0FBUixDQUFZZCxJQUFJZSxRQUFKLENBQ2pDLENBRGlDLEVBRWpDZCxLQUFLLHVEQUFMLEVBQThEVSxPQUE5RCxFQUF1RUQsUUFBdkUsQ0FGaUMsQ0FBWixDQUF2Qjs7QUFLQSxNQUFNTSxTQUFTLENBQUNMLFVBQVUsRUFBWCxLQUFrQjtBQUMvQixNQUFJQSxRQUFRTSxNQUFSLENBQWVDLElBQWYsS0FBd0IsSUFBNUIsRUFBa0M7QUFBRTtBQUNsQ047QUFDQU8sWUFBUUMsSUFBUixDQUFhLENBQWI7QUFDRDtBQUNELE1BQUksQ0FBQ1QsUUFBUVUsV0FBYixFQUEwQjtBQUN4QixVQUFNLElBQUlDLEtBQUosQ0FBVSxrQkFBVixDQUFOO0FBQ0Q7QUFDRCxNQUFJLENBQUNaLFNBQVNDLFFBQVFVLFdBQWpCLENBQUwsRUFBb0M7QUFDbEMsVUFBTSxJQUFJQyxLQUFKLENBQVcscUJBQW1CWCxRQUFRVSxXQUFZLElBQWxELENBQU47QUFDRDtBQUNELE1BQUlWLFFBQVFZLEdBQVIsQ0FBWUwsSUFBWixLQUFxQixJQUF6QixFQUErQjtBQUM3QjtBQUNEO0FBQ0QsU0FBT3JCLFVBQVVzQixRQUFRSyxHQUFSLEVBQVYsRUFBeUJiLFFBQVFNLE1BQVIsQ0FBZVEsSUFBZixJQUF1Qk4sUUFBUU8sR0FBUixDQUFZQyxTQUE1RCxFQUNKQyxJQURJLENBQ0NDLFVBQVVsQixRQUFRbUIsT0FBUixDQUFnQkMsT0FBaEIsQ0FDZDdCLEVBQUU4QixJQUFGLENBQU8sQ0FBQyxVQUFELEVBQWEsVUFBYixDQUFQLEVBQWlDSCxNQUFqQyxDQURjLEVBRWRBLE1BRmMsRUFHZDNCLEVBQUUrQixJQUFGLENBQU8sS0FBUCxFQUFjdEIsT0FBZCxDQUhjLENBRFgsQ0FBUDtBQU1ELENBcEJEOztBQXNCQUssT0FBT1AsVUFBVUUsT0FBVixFQUFtQkQsUUFBbkIsRUFBNkJTLFFBQVFlLElBQVIsQ0FBYUMsS0FBYixDQUFtQixDQUFuQixDQUE3QixDQUFQLEVBQ0dDLEtBREgsQ0FDU0MsT0FBT0EsSUFBSUMsT0FBSixJQUFlekIsUUFBUTBCLEtBQVIsQ0FBY0YsSUFBSUMsT0FBbEIsQ0FEL0I7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJjbWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuLy8gVE9ETzogYWRkIFwicXVpZXRcIiBtb2RlXG5yZXF1aXJlKCdzb3VyY2UtbWFwLXN1cHBvcnQnKS5pbnN0YWxsKClcblxuY29uc3Qge3NwYXdufSA9IHJlcXVpcmUoJ2NoaWxkX3Byb2Nlc3MnKVxuY29uc3Qge3JlYWRGaWxlfSA9IHJlcXVpcmUoJ216L2ZzJylcbmNvbnN0IGdldENvbmZpZyA9IHJlcXVpcmUoJy4vbGliL2dldC1jb25maWcnKVxuY29uc3QgZm9ybWF0ID0gcmVxdWlyZSgnY2hhbGsnKVxuY29uc3QgdHJ5Q2F0Y2ggPSByZXF1aXJlKCd0cnlfY2F0Y2gnKVxuY29uc3QgcGFkID0gcmVxdWlyZSgnfi9saWIvcGFkJylcbmNvbnN0IEhlbHAgPSByZXF1aXJlKCd+L2xpYi9oZWxwJylcbmNvbnN0IFIgPSByZXF1aXJlKCdyYW1kYScpXG5jb25zdCB3cmFwSW5RdW90ZXMgPSB2ID0+IGBcIiR7dn1cImBcbmNvbnN0IHF1b3RlU3BhY2VkID0gdiA9PiB2LmluY2x1ZGVzKCcgJykgPyB3cmFwSW5RdW90ZXModikgOiB2XG5jb25zdCB6aXBPYmpSZXN0ID0gUi5jdXJyeShyZXF1aXJlKCd+L2xpYi96aXAtb2JqLXJlc3QnKSlcbmNvbnN0IHBhcnNlQXJncyA9IHJlcXVpcmUoJ34vbGliL3BhcnNlLWFyZ3MnKVxuY29uc3QgY29tbWFuZHMgPSByZXF1aXJlKCcuL2NvbW1hbmRzJylcbmNvbnN0IG9wdGlvbnMgPSByZXF1aXJlKCcuL29wdGlvbnMnKVxuXG5jb25zdCBzaG93SGVscCA9ICgpID0+IGNvbnNvbGUubG9nKHBhZC52ZXJ0aWNhbChcbiAgMSxcbiAgSGVscCgnZG9yYyBbZG9yYy1vcHRpb25zLi4uXSA8Y29tbWFuZD4gW2NvbW1hbmQtb3B0aW9ucy4uLl0nLCBvcHRpb25zLCBjb21tYW5kcylcbikpXG5cbmNvbnN0IGhhbmRsZSA9IChvcHRpb25zID0ge30pID0+IHtcbiAgaWYgKG9wdGlvbnMuZ2xvYmFsLmhlbHAgPT09IHRydWUpIHsgLy8gVE9ETzogc3ViIGNvbW1hbmQgaGVscFxuICAgIHNob3dIZWxwKClcbiAgICBwcm9jZXNzLmV4aXQoMClcbiAgfVxuICBpZiAoIW9wdGlvbnMuY29tbWFuZE5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGNvbW1hbmQgZ2l2ZW4nKVxuICB9XG4gIGlmICghY29tbWFuZHNbb3B0aW9ucy5jb21tYW5kTmFtZV0pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYG5vIHN1Y2ggY29tbWFuZCBcIiR7b3B0aW9ucy5jb21tYW5kTmFtZX1cImApXG4gIH1cbiAgaWYgKG9wdGlvbnMuc3ViLmhlbHAgPT09IHRydWUpIHtcbiAgICAvLyBzaG93IHN1YiBoZWxwXG4gIH1cbiAgcmV0dXJuIGdldENvbmZpZyhwcm9jZXNzLmN3ZCgpLCBvcHRpb25zLmdsb2JhbC5tb2RlIHx8IHByb2Nlc3MuZW52LkRPUkNfTU9ERSlcbiAgICAudGhlbihjb25maWcgPT4gb3B0aW9ucy5jb21tYW5kLmhhbmRsZXIoXG4gICAgICBSLnBhdGgoWydwcmVwYXJlZCcsICdzZXJ2aWNlcyddLCBjb25maWcpLFxuICAgICAgY29uZmlnLFxuICAgICAgUi5wcm9wKCdzdWInLCBvcHRpb25zKVxuICAgICkpXG59XG5cbmhhbmRsZShwYXJzZUFyZ3Mob3B0aW9ucywgY29tbWFuZHMsIHByb2Nlc3MuYXJndi5zbGljZSgyKSkpXG4gIC5jYXRjaChlcnIgPT4gZXJyLm1lc3NhZ2UgJiYgY29uc29sZS5lcnJvcihlcnIubWVzc2FnZSkpXG5cbi8qIGNvbnN0IGFzc2VydENtZFZhbGlkID0gKGNtZCkgPT4geyAqL1xuLyogICBpZiAoY21kID09PSB1bmRlZmluZWQpIHsgKi9cbi8qICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGNvbW1hbmQgZ2l2ZW4nKSAqL1xuLyogICB9ICovXG4vKiAgIGlmICghaGFuZGxlcnMuaGFzT3duUHJvcGVydHkoY21kKSkgeyAqL1xuLyogICAgIHRocm93IG5ldyBFcnJvcihgXCIke2NtZH1cIiBpcyBub3QgYSB2YWxpZCBjb21tYW5kYCkgKi9cbi8qICAgfSAqL1xuLyogfSAqL1xuLyogY29uc3QgZHJ5T3B0aW9uID0gWydkcnknLCB7ICovXG4vKiAgIGRlc2NyaWJlOiAncHJpbnQgb25seSBkcnkgcnVuJywgKi9cbi8qICAgdHlwZTogJ2Jvb2xlYW4nICovXG4vKiB9XSAqL1xuLyogY29uc3QgYXJncyA9IHlhcmdzLnVzYWdlKCdcXG5Vc2FnZTogJDAgW29wdGlvbnNdIDxjb21tYW5kPiBbY29tbWFuZC1hcmdzLi4uXScpICovXG4vKiAgIC5vcHRpb24oJ20nLCB7ICovXG4vKiAgICAgYWxpYXM6ICdtb2RlJywgKi9cbi8qICAgICBkZXNjcmliZTogJ3VzZSBnaXZlbiBtb2RlIHNwZWNpZmljIGNvbmZpZycsICovXG4vKiAgICAgdHlwZTogJ3N0cmluZycsICovXG4vKiAgICAgZ2xvYmFsOiB0cnVlICovXG4vKiAgIH0pICovXG4vKiAgIC5vcHRpb24oJ2gnLCB7ICovXG4vKiAgICAgYWxpYXM6ICdoZWxwJywgKi9cbi8qICAgICBkZXNjcmliZTogJ291dHB1dCB1c2FnZSBpbmZvcm1hdGlvbicsICovXG4vKiAgICAgdHlwZTogJ2Jvb2xlYW4nLCAqL1xuLyogICAgIGdsb2JhbDogdHJ1ZSAqL1xuLyogICB9KSAqL1xuLyogICAuY29tbWFuZCh7ICovXG4vKiAgICAgY29tbWFuZDogJ2J1aWxkIFtzZXJ2aWNlcy4uLl0nLCAqL1xuLyogICAgIGRlc2M6ICdidWlsZCBpbWFnZShzKScsICovXG4vKiAgICAgaGFuZGxlcjogKGFyZ3MpID0+IGhhbmRsZXIoJ2J1aWxkJywgYXJncyksICovXG4vKiAgICAgYnVpbGRlcjogKHkpID0+IHsgKi9cbi8qICAgICAgIHJldHVybiB5ICovXG4vKiAgICAgICAgIC5vcHRpb24oLi4uZHJ5T3B0aW9uKSAqL1xuLyogICAgIH0gKi9cbi8qICAgfSkgKi9cbi8qICAgLmNvbW1hbmQoeyAqL1xuLyogICAgIGNvbW1hbmQ6ICdydW4gPHNlcnZpY2U+IFtjbWQuLi5dJywgKi9cbi8qICAgICBkZXNjOiAncnVuIHNlcnZpY2UnLCAqL1xuLyogICAgIGhhbmRsZXI6IGFyZ3MgPT4geyAqL1xuLyogICAgICAgYXJncy5jbWQgPSBhcmdzLmNtZC5qb2luKCcgJykgKi9cbi8qICAgICAgIGNvbnNvbGUubG9nKGFyZ3MpICovXG4vKiAgICAgICAvL3JldHVybiBoYW5kbGVyKCdydW4nLCBhcmdzKSAqL1xuLyogICAgIH0sICovXG4vKiAgICAgYnVpbGRlcjogKHkpID0+IHsgKi9cbi8qICAgICAgIHJldHVybiB5ICovXG4vKiAgICAgICAgIC5vcHRpb24oLi4uZHJ5T3B0aW9uKSAqL1xuLyogICAgIH0gKi9cbi8qICAgfSkgKi9cbi8qICAgLmNvbW1hbmQoeyAqL1xuLyogICAgIGNvbW1hbmQ6ICd1cCBbc2VydmljZXMuLi5dJywgKi9cbi8qICAgICBkZXNjOiAnYnVpbGQgYW5kIHN0YXJ0IHNlcnZpY2UocyknLCAqL1xuLyogICAgIGhhbmRsZXI6IChhcmdzKSA9PiBoYW5kbGVyKCd1cCcsIGFyZ3MpLCAqL1xuLyogICAgIGJ1aWxkZXI6ICh5KSA9PiB7ICovXG4vKiAgICAgICByZXR1cm4geSAqL1xuLyogICAgICAgICAub3B0aW9uKCdkJywgeyAqL1xuLyogICAgICAgICAgIGFsaWFzOiAnZGV0YWNoZWQnLCAqL1xuLyogICAgICAgICAgIGRlc2NyaWJlOiAnc3RhcnQgc2VydmljZXMgaW4gYmFja2dyb3VuZCcsICovXG4vKiAgICAgICAgICAgdHlwZTogJ2Jvb2xlYW4nICovXG4vKiAgICAgICAgIH0pICovXG4vKiAgICAgICAgIC5vcHRpb24oLi4uZHJ5T3B0aW9uKSAqL1xuLyogICAgIH0gKi9cbi8qICAgfSkgKi9cbi8qICAgLmNvbW1hbmQoeyAqL1xuLyogICAgIGNvbW1hbmQ6ICdkb3duJywgKi9cbi8qICAgICBkZXNjOiAnc3RvcCBzZXJ2aWNlKHMpIGFuZCByZW1vdmUgY29udGFpbmVyKHMpJywgKi9cbi8qICAgICBoYW5kbGVyOiAoYXJncykgPT4gaGFuZGxlcignZG93bicsIGFyZ3MpLCAqL1xuLyogICAgIGJ1aWxkZXI6ICh5KSA9PiB7ICovXG4vKiAgICAgICByZXR1cm4geSAqL1xuLyogICAgICAgICAub3B0aW9uKC4uLmRyeU9wdGlvbikgKi9cbi8qICAgICB9ICovXG4vKiAgIH0pICovXG4vKiAgIC5jb21tYW5kKHsgKi9cbi8qICAgICBjb21tYW5kOiAnbG9ncycsICovXG4vKiAgICAgZGVzYzogJ2Nvbm5lY3QgdG8gbG9ncycsICovXG4vKiAgICAgaGFuZGxlcjogKGFyZ3MpID0+IGhhbmRsZXIoJ2xvZ3MnLCBhcmdzKSAqL1xuLyogICB9KSAqL1xuLyogICAuY29tbWFuZCh7ICovXG4vKiAgICAgY29tbWFuZDogJ3NoIDxzZXJ2aWNlPicsICovXG4vKiAgICAgZGVzYzogJ2NvbnRhaW5lciAvYmluL3NoJywgKi9cbi8qICAgICBoYW5kbGVyOiAoYXJncykgPT4gaGFuZGxlcignc2gnLCBhcmdzKSAqL1xuLyogICB9KSAqL1xuLyogICAuYXJndiAqL1xuXG4vKiBjb25zdCBjbWQgPSBhcmdzLl9bMF0gKi9cbi8qIHRyeUNhdGNoKCAqL1xuLyogICAoKSA9PiBhc3NlcnRDbWRWYWxpZChjbWQpLCAqL1xuLyogICBlcnIgPT4geyAqL1xuLyogICAgIGNvbnNvbGUuZXJyb3IoZm9ybWF0LnJlZChlcnIubWVzc2FnZSkpICovXG4vKiAgICAgeWFyZ3Muc2hvd0hlbHAoKSAqL1xuLyogICAgIHByb2Nlc3MuZXhpdCgxKSAqL1xuLyogICB9ICovXG4vKiApICovXG4iXX0=