#!/usr/bin/env node
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('source-map-support').install();

var _require = require('child_process');

const spawn = _require.spawn;

var _require2 = require('mz/fs');

const readFile = _require2.readFile;

const getConfig = require('./lib/get-config');
const yargs = require('yargs');
const format = require('chalk');
const filterSelectedServices = require('./lib/filter-selected-services');
const normalizeConfig = require('./lib/normalize-config');
const tryCatch = require('try_catch');

process.on('unhandledRejection', reason => {
  console.error('unhandled rejection:'.toUpperCase(), reason);
  process.exit(1);
});

const cmds = {
  build: require('./lib/cmds/build'),
  up: require('./lib/cmds/up'),
  down: require('./lib/cmds/down'),
  logs: require('./lib/cmds/logs')
};

const handler = (() => {
  var _ref = _asyncToGenerator(function* (name, args = {}) {
    if (args.h === true) {
      yargs.showHelp();
      process.exit(0);
    }
    args.services = args._.slice(1);
    const _config = yield getConfig(args.mode);
    const config = normalizeConfig(_config);
    const selectedServices = filterSelectedServices(config.services, args.services);
    const handler = cmds[name];
    handler(selectedServices, config, args);
  });

  return function handler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

const assertCmdValid = cmd => {
  if (cmd === undefined) {
    throw new Error('no command given');
  }
  if (!cmds.hasOwnProperty(cmd)) {
    throw new Error(`"${ cmd }" is not a valid command`);
  }
};

const args = yargs.usage('\nUsage: $0 [options] <command> [services...]').option('m', {
  alias: 'mode',
  describe: 'use given mode specific config',
  type: 'string',
  global: true
}).option('h', {
  alias: 'help',
  describe: 'output usage information',
  type: 'boolean',
  global: true
}).command({
  command: 'build',
  desc: 'build image(s)',
  handler: args => handler('build', args)
}).command({
  command: 'up',
  desc: 'start service(s)',
  handler: args => handler('up', args),
  builder: y => {
    return y.option('d', {
      alias: 'detached',
      describe: 'start services in background',
      type: 'boolean'
    });
  }
}).command({
  command: 'down',
  desc: 'stop service(s) and remove container(s)',
  handler: args => handler('down', args)
}).command({
  command: 'logs',
  desc: 'connect to logs',
  handler: args => handler('logs', args)
}).argv;

const cmd = args._[0];
tryCatch(() => assertCmdValid(cmd), err => {
  console.error(format.red(err.message));
  yargs.showHelp();
  process.exit(1);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbWQuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImluc3RhbGwiLCJzcGF3biIsInJlYWRGaWxlIiwiZ2V0Q29uZmlnIiwieWFyZ3MiLCJmb3JtYXQiLCJmaWx0ZXJTZWxlY3RlZFNlcnZpY2VzIiwibm9ybWFsaXplQ29uZmlnIiwidHJ5Q2F0Y2giLCJwcm9jZXNzIiwib24iLCJyZWFzb24iLCJjb25zb2xlIiwiZXJyb3IiLCJ0b1VwcGVyQ2FzZSIsImV4aXQiLCJjbWRzIiwiYnVpbGQiLCJ1cCIsImRvd24iLCJsb2dzIiwiaGFuZGxlciIsIm5hbWUiLCJhcmdzIiwiaCIsInNob3dIZWxwIiwic2VydmljZXMiLCJfIiwic2xpY2UiLCJfY29uZmlnIiwibW9kZSIsImNvbmZpZyIsInNlbGVjdGVkU2VydmljZXMiLCJhc3NlcnRDbWRWYWxpZCIsImNtZCIsInVuZGVmaW5lZCIsIkVycm9yIiwiaGFzT3duUHJvcGVydHkiLCJ1c2FnZSIsIm9wdGlvbiIsImFsaWFzIiwiZGVzY3JpYmUiLCJ0eXBlIiwiZ2xvYmFsIiwiY29tbWFuZCIsImRlc2MiLCJidWlsZGVyIiwieSIsImFyZ3YiLCJlcnIiLCJyZWQiLCJtZXNzYWdlIl0sIm1hcHBpbmdzIjoiOztBQUVBQSxRQUFRLG9CQUFSLEVBQThCQyxPQUE5Qjs7ZUFFZ0JELFFBQVEsZUFBUixDOztNQUFURSxLLFlBQUFBLEs7O2dCQUNZRixRQUFRLE9BQVIsQzs7TUFBWkcsUSxhQUFBQSxROztBQUNQLE1BQU1DLFlBQVlKLFFBQVEsa0JBQVIsQ0FBbEI7QUFDQSxNQUFNSyxRQUFRTCxRQUFRLE9BQVIsQ0FBZDtBQUNBLE1BQU1NLFNBQVNOLFFBQVEsT0FBUixDQUFmO0FBQ0EsTUFBTU8seUJBQXlCUCxRQUFRLGdDQUFSLENBQS9CO0FBQ0EsTUFBTVEsa0JBQWtCUixRQUFRLHdCQUFSLENBQXhCO0FBQ0EsTUFBTVMsV0FBV1QsUUFBUSxXQUFSLENBQWpCOztBQUVBVSxRQUFRQyxFQUFSLENBQVcsb0JBQVgs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Q0FBWjtBQUNBbkIsU0FDRSxNQUFNeUIsZUFBZUMsR0FBZixDQURSLEVBRUVlLE9BQU87QUFDTHJDLFVBQVFDLEtBQVIsQ0FBY1IsT0FBTzZDLEdBQVAsQ0FBV0QsSUFBSUUsT0FBZixDQUFkO0FBQ0EvQyxRQUFNcUIsUUFBTjtBQUNBaEIsVUFBUU0sSUFBUixDQUFhLENBQWI7QUFDRCxDQU5IIiwiZmlsZSI6ImNtZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5yZXF1aXJlKCdzb3VyY2UtbWFwLXN1cHBvcnQnKS5pbnN0YWxsKClcblxuY29uc3Qge3NwYXdufSA9IHJlcXVpcmUoJ2NoaWxkX3Byb2Nlc3MnKVxuY29uc3Qge3JlYWRGaWxlfSA9IHJlcXVpcmUoJ216L2ZzJylcbmNvbnN0IGdldENvbmZpZyA9IHJlcXVpcmUoJy4vbGliL2dldC1jb25maWcnKVxuY29uc3QgeWFyZ3MgPSByZXF1aXJlKCd5YXJncycpXG5jb25zdCBmb3JtYXQgPSByZXF1aXJlKCdjaGFsaycpXG5jb25zdCBmaWx0ZXJTZWxlY3RlZFNlcnZpY2VzID0gcmVxdWlyZSgnLi9saWIvZmlsdGVyLXNlbGVjdGVkLXNlcnZpY2VzJylcbmNvbnN0IG5vcm1hbGl6ZUNvbmZpZyA9IHJlcXVpcmUoJy4vbGliL25vcm1hbGl6ZS1jb25maWcnKVxuY29uc3QgdHJ5Q2F0Y2ggPSByZXF1aXJlKCd0cnlfY2F0Y2gnKVxuXG5wcm9jZXNzLm9uKCd1bmhhbmRsZWRSZWplY3Rpb24nLCAocmVhc29uKSA9PiB7XG4gIGNvbnNvbGUuZXJyb3IoJ3VuaGFuZGxlZCByZWplY3Rpb246Jy50b1VwcGVyQ2FzZSgpLCByZWFzb24pXG4gIHByb2Nlc3MuZXhpdCgxKVxufSlcblxuY29uc3QgY21kcyA9IHtcbiAgYnVpbGQ6IHJlcXVpcmUoJy4vbGliL2NtZHMvYnVpbGQnKSxcbiAgdXA6IHJlcXVpcmUoJy4vbGliL2NtZHMvdXAnKSxcbiAgZG93bjogcmVxdWlyZSgnLi9saWIvY21kcy9kb3duJyksXG4gIGxvZ3M6IHJlcXVpcmUoJy4vbGliL2NtZHMvbG9ncycpXG59XG5cbmNvbnN0IGhhbmRsZXIgPSBhc3luYyAobmFtZSwgYXJncyA9IHt9KSA9PiB7XG4gIGlmIChhcmdzLmggPT09IHRydWUpIHtcbiAgICB5YXJncy5zaG93SGVscCgpXG4gICAgcHJvY2Vzcy5leGl0KDApXG4gIH1cbiAgYXJncy5zZXJ2aWNlcyA9IGFyZ3MuXy5zbGljZSgxKVxuICBjb25zdCBfY29uZmlnID0gYXdhaXQgZ2V0Q29uZmlnKGFyZ3MubW9kZSlcbiAgY29uc3QgY29uZmlnID0gbm9ybWFsaXplQ29uZmlnKF9jb25maWcpXG4gIGNvbnN0IHNlbGVjdGVkU2VydmljZXMgPSBmaWx0ZXJTZWxlY3RlZFNlcnZpY2VzKGNvbmZpZy5zZXJ2aWNlcywgYXJncy5zZXJ2aWNlcylcbiAgY29uc3QgaGFuZGxlciA9IGNtZHNbbmFtZV1cbiAgaGFuZGxlcihzZWxlY3RlZFNlcnZpY2VzLCBjb25maWcsIGFyZ3MpXG59XG5cbmNvbnN0IGFzc2VydENtZFZhbGlkID0gKGNtZCkgPT4ge1xuICBpZiAoY21kID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGNvbW1hbmQgZ2l2ZW4nKVxuICB9XG4gIGlmICghY21kcy5oYXNPd25Qcm9wZXJ0eShjbWQpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBcIiR7Y21kfVwiIGlzIG5vdCBhIHZhbGlkIGNvbW1hbmRgKVxuICB9XG59XG5cbmNvbnN0IGFyZ3MgPSB5YXJncy51c2FnZSgnXFxuVXNhZ2U6ICQwIFtvcHRpb25zXSA8Y29tbWFuZD4gW3NlcnZpY2VzLi4uXScpXG4gIC5vcHRpb24oJ20nLCB7XG4gICAgYWxpYXM6ICdtb2RlJyxcbiAgICBkZXNjcmliZTogJ3VzZSBnaXZlbiBtb2RlIHNwZWNpZmljIGNvbmZpZycsXG4gICAgdHlwZTogJ3N0cmluZycsXG4gICAgZ2xvYmFsOiB0cnVlXG4gIH0pXG4gIC5vcHRpb24oJ2gnLCB7XG4gICAgYWxpYXM6ICdoZWxwJyxcbiAgICBkZXNjcmliZTogJ291dHB1dCB1c2FnZSBpbmZvcm1hdGlvbicsXG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGdsb2JhbDogdHJ1ZVxuICB9KVxuICAuY29tbWFuZCh7XG4gICAgY29tbWFuZDogJ2J1aWxkJyxcbiAgICBkZXNjOiAnYnVpbGQgaW1hZ2UocyknLFxuICAgIGhhbmRsZXI6IChhcmdzKSA9PiBoYW5kbGVyKCdidWlsZCcsIGFyZ3MpXG4gIH0pXG4gIC5jb21tYW5kKHtcbiAgICBjb21tYW5kOiAndXAnLFxuICAgIGRlc2M6ICdzdGFydCBzZXJ2aWNlKHMpJyxcbiAgICBoYW5kbGVyOiAoYXJncykgPT4gaGFuZGxlcigndXAnLCBhcmdzKSxcbiAgICBidWlsZGVyOiAoeSkgPT4ge1xuICAgICAgcmV0dXJuIHlcbiAgICAgIC5vcHRpb24oJ2QnLCB7XG4gICAgICAgIGFsaWFzOiAnZGV0YWNoZWQnLFxuICAgICAgICBkZXNjcmliZTogJ3N0YXJ0IHNlcnZpY2VzIGluIGJhY2tncm91bmQnLFxuICAgICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgIH0pXG4gICAgfVxuICB9KVxuICAuY29tbWFuZCh7XG4gICAgY29tbWFuZDogJ2Rvd24nLFxuICAgIGRlc2M6ICdzdG9wIHNlcnZpY2UocykgYW5kIHJlbW92ZSBjb250YWluZXIocyknLFxuICAgIGhhbmRsZXI6IChhcmdzKSA9PiBoYW5kbGVyKCdkb3duJywgYXJncylcbiAgfSlcbiAgLmNvbW1hbmQoe1xuICAgIGNvbW1hbmQ6ICdsb2dzJyxcbiAgICBkZXNjOiAnY29ubmVjdCB0byBsb2dzJyxcbiAgICBoYW5kbGVyOiAoYXJncykgPT4gaGFuZGxlcignbG9ncycsIGFyZ3MpXG4gIH0pXG4gIC5hcmd2XG5cbmNvbnN0IGNtZCA9IGFyZ3MuX1swXVxudHJ5Q2F0Y2goXG4gICgpID0+IGFzc2VydENtZFZhbGlkKGNtZCksXG4gIGVyciA9PiB7XG4gICAgY29uc29sZS5lcnJvcihmb3JtYXQucmVkKGVyci5tZXNzYWdlKSlcbiAgICB5YXJncy5zaG93SGVscCgpXG4gICAgcHJvY2Vzcy5leGl0KDEpXG4gIH1cbilcbiJdfQ==