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
const tryCatch = require('try_catch');

process.on('unhandledRejection', reason => {
  console.error('unhandled rejection:'.toUpperCase());
  throw reason;
});

const cmds = {
  build: require('./lib/cmds/build'),
  up: require('./lib/cmds/up'),
  down: require('./lib/cmds/down'),
  logs: require('./lib/cmds/logs'),
  sh: require('./lib/cmds/sh')
};

const handler = (() => {
  var _ref = _asyncToGenerator(function* (name, args = {}) {
    if (args.h === true) {
      yargs.showHelp();
      process.exit(0);
    }
    args.services = args._.slice(1);
    const config = yield getConfig(process.cwd(), args.mode);
    const selectedServices = filterSelectedServices(config.prepared.services, args.services);
    const handler = cmds[name];
    return handler(selectedServices, config, args);
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
}).command({
  command: 'sh <service>',
  desc: 'container /bin/sh',
  handler: args => handler('sh', args)
}).argv;

const cmd = args._[0];
tryCatch(() => assertCmdValid(cmd), err => {
  console.error(format.red(err.message));
  yargs.showHelp();
  process.exit(1);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbWQuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImluc3RhbGwiLCJzcGF3biIsInJlYWRGaWxlIiwiZ2V0Q29uZmlnIiwieWFyZ3MiLCJmb3JtYXQiLCJmaWx0ZXJTZWxlY3RlZFNlcnZpY2VzIiwidHJ5Q2F0Y2giLCJwcm9jZXNzIiwib24iLCJyZWFzb24iLCJjb25zb2xlIiwiZXJyb3IiLCJ0b1VwcGVyQ2FzZSIsImNtZHMiLCJidWlsZCIsInVwIiwiZG93biIsImxvZ3MiLCJzaCIsImhhbmRsZXIiLCJuYW1lIiwiYXJncyIsImgiLCJzaG93SGVscCIsImV4aXQiLCJzZXJ2aWNlcyIsIl8iLCJzbGljZSIsImNvbmZpZyIsImN3ZCIsIm1vZGUiLCJzZWxlY3RlZFNlcnZpY2VzIiwicHJlcGFyZWQiLCJhc3NlcnRDbWRWYWxpZCIsImNtZCIsInVuZGVmaW5lZCIsIkVycm9yIiwiaGFzT3duUHJvcGVydHkiLCJ1c2FnZSIsIm9wdGlvbiIsImFsaWFzIiwiZGVzY3JpYmUiLCJ0eXBlIiwiZ2xvYmFsIiwiY29tbWFuZCIsImRlc2MiLCJidWlsZGVyIiwieSIsImFyZ3YiLCJlcnIiLCJyZWQiLCJtZXNzYWdlIl0sIm1hcHBpbmdzIjoiOztBQUVBQSxRQUFRLG9CQUFSLEVBQThCQyxPQUE5Qjs7ZUFFZ0JELFFBQVEsZUFBUixDOztNQUFURSxLLFlBQUFBLEs7O2dCQUNZRixRQUFRLE9BQVIsQzs7TUFBWkcsUSxhQUFBQSxROztBQUNQLE1BQU1DLFlBQVlKLFFBQVEsa0JBQVIsQ0FBbEI7QUFDQSxNQUFNSyxRQUFRTCxRQUFRLE9BQVIsQ0FBZDtBQUNBLE1BQU1NLFNBQVNOLFFBQVEsT0FBUixDQUFmO0FBQ0EsTUFBTU8seUJBQXlCUCxRQUFRLGdDQUFSLENBQS9CO0FBQ0EsTUFBTVEsV0FBV1IsUUFBUSxXQUFSLENBQWpCOztBQUVBUyxRQUFRQyxFQUFSLENBQVcsb0JBQVgsRUFBa0NDLE1BQUQsSUFBWTtBQUMzQ0MsVUFBUUMsS0FBUixDQUFjLHVC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SUFBUixFQUFjRSxJQUFkO0FBSFosQ0F6Q0UsRUE4Q1YyQixJQTlDSDs7QUFnREEsTUFBTWQsTUFBTWIsS0FBS0ssQ0FBTCxDQUFPLENBQVAsQ0FBWjtBQUNBcEIsU0FDRSxNQUFNMkIsZUFBZUMsR0FBZixDQURSLEVBRUVlLE9BQU87QUFDTHZDLFVBQVFDLEtBQVIsQ0FBY1AsT0FBTzhDLEdBQVAsQ0FBV0QsSUFBSUUsT0FBZixDQUFkO0FBQ0FoRCxRQUFNb0IsUUFBTjtBQUNBaEIsVUFBUWlCLElBQVIsQ0FBYSxDQUFiO0FBQ0QsQ0FOSCIsImZpbGUiOiJjbWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxucmVxdWlyZSgnc291cmNlLW1hcC1zdXBwb3J0JykuaW5zdGFsbCgpXG5cbmNvbnN0IHtzcGF3bn0gPSByZXF1aXJlKCdjaGlsZF9wcm9jZXNzJylcbmNvbnN0IHtyZWFkRmlsZX0gPSByZXF1aXJlKCdtei9mcycpXG5jb25zdCBnZXRDb25maWcgPSByZXF1aXJlKCcuL2xpYi9nZXQtY29uZmlnJylcbmNvbnN0IHlhcmdzID0gcmVxdWlyZSgneWFyZ3MnKVxuY29uc3QgZm9ybWF0ID0gcmVxdWlyZSgnY2hhbGsnKVxuY29uc3QgZmlsdGVyU2VsZWN0ZWRTZXJ2aWNlcyA9IHJlcXVpcmUoJy4vbGliL2ZpbHRlci1zZWxlY3RlZC1zZXJ2aWNlcycpXG5jb25zdCB0cnlDYXRjaCA9IHJlcXVpcmUoJ3RyeV9jYXRjaCcpXG5cbnByb2Nlc3Mub24oJ3VuaGFuZGxlZFJlamVjdGlvbicsIChyZWFzb24pID0+IHtcbiAgY29uc29sZS5lcnJvcigndW5oYW5kbGVkIHJlamVjdGlvbjonLnRvVXBwZXJDYXNlKCkpXG4gIHRocm93IHJlYXNvblxufSlcblxuY29uc3QgY21kcyA9IHtcbiAgYnVpbGQ6IHJlcXVpcmUoJy4vbGliL2NtZHMvYnVpbGQnKSxcbiAgdXA6IHJlcXVpcmUoJy4vbGliL2NtZHMvdXAnKSxcbiAgZG93bjogcmVxdWlyZSgnLi9saWIvY21kcy9kb3duJyksXG4gIGxvZ3M6IHJlcXVpcmUoJy4vbGliL2NtZHMvbG9ncycpLFxuICBzaDogcmVxdWlyZSgnLi9saWIvY21kcy9zaCcpXG59XG5cbmNvbnN0IGhhbmRsZXIgPSBhc3luYyAobmFtZSwgYXJncyA9IHt9KSA9PiB7XG4gIGlmIChhcmdzLmggPT09IHRydWUpIHtcbiAgICB5YXJncy5zaG93SGVscCgpXG4gICAgcHJvY2Vzcy5leGl0KDApXG4gIH1cbiAgYXJncy5zZXJ2aWNlcyA9IGFyZ3MuXy5zbGljZSgxKVxuICBjb25zdCBjb25maWcgPSBhd2FpdCBnZXRDb25maWcocHJvY2Vzcy5jd2QoKSwgYXJncy5tb2RlKVxuICBjb25zdCBzZWxlY3RlZFNlcnZpY2VzID0gZmlsdGVyU2VsZWN0ZWRTZXJ2aWNlcyhjb25maWcucHJlcGFyZWQuc2VydmljZXMsIGFyZ3Muc2VydmljZXMpXG4gIGNvbnN0IGhhbmRsZXIgPSBjbWRzW25hbWVdXG4gIHJldHVybiBoYW5kbGVyKHNlbGVjdGVkU2VydmljZXMsIGNvbmZpZywgYXJncylcbn1cblxuY29uc3QgYXNzZXJ0Q21kVmFsaWQgPSAoY21kKSA9PiB7XG4gIGlmIChjbWQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignbm8gY29tbWFuZCBnaXZlbicpXG4gIH1cbiAgaWYgKCFjbWRzLmhhc093blByb3BlcnR5KGNtZCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFwiJHtjbWR9XCIgaXMgbm90IGEgdmFsaWQgY29tbWFuZGApXG4gIH1cbn1cblxuY29uc3QgYXJncyA9IHlhcmdzLnVzYWdlKCdcXG5Vc2FnZTogJDAgW29wdGlvbnNdIDxjb21tYW5kPiBbc2VydmljZXMuLi5dJylcbiAgLm9wdGlvbignbScsIHtcbiAgICBhbGlhczogJ21vZGUnLFxuICAgIGRlc2NyaWJlOiAndXNlIGdpdmVuIG1vZGUgc3BlY2lmaWMgY29uZmlnJyxcbiAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICBnbG9iYWw6IHRydWVcbiAgfSlcbiAgLm9wdGlvbignaCcsIHtcbiAgICBhbGlhczogJ2hlbHAnLFxuICAgIGRlc2NyaWJlOiAnb3V0cHV0IHVzYWdlIGluZm9ybWF0aW9uJyxcbiAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgZ2xvYmFsOiB0cnVlXG4gIH0pXG4gIC5jb21tYW5kKHtcbiAgICBjb21tYW5kOiAnYnVpbGQnLFxuICAgIGRlc2M6ICdidWlsZCBpbWFnZShzKScsXG4gICAgaGFuZGxlcjogKGFyZ3MpID0+IGhhbmRsZXIoJ2J1aWxkJywgYXJncylcbiAgfSlcbiAgLmNvbW1hbmQoe1xuICAgIGNvbW1hbmQ6ICd1cCcsXG4gICAgZGVzYzogJ3N0YXJ0IHNlcnZpY2UocyknLFxuICAgIGhhbmRsZXI6IChhcmdzKSA9PiBoYW5kbGVyKCd1cCcsIGFyZ3MpLFxuICAgIGJ1aWxkZXI6ICh5KSA9PiB7XG4gICAgICByZXR1cm4geVxuICAgICAgLm9wdGlvbignZCcsIHtcbiAgICAgICAgYWxpYXM6ICdkZXRhY2hlZCcsXG4gICAgICAgIGRlc2NyaWJlOiAnc3RhcnQgc2VydmljZXMgaW4gYmFja2dyb3VuZCcsXG4gICAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgfSlcbiAgICB9XG4gIH0pXG4gIC5jb21tYW5kKHtcbiAgICBjb21tYW5kOiAnZG93bicsXG4gICAgZGVzYzogJ3N0b3Agc2VydmljZShzKSBhbmQgcmVtb3ZlIGNvbnRhaW5lcihzKScsXG4gICAgaGFuZGxlcjogKGFyZ3MpID0+IGhhbmRsZXIoJ2Rvd24nLCBhcmdzKVxuICB9KVxuICAuY29tbWFuZCh7XG4gICAgY29tbWFuZDogJ2xvZ3MnLFxuICAgIGRlc2M6ICdjb25uZWN0IHRvIGxvZ3MnLFxuICAgIGhhbmRsZXI6IChhcmdzKSA9PiBoYW5kbGVyKCdsb2dzJywgYXJncylcbiAgfSlcbiAgLmNvbW1hbmQoe1xuICAgIGNvbW1hbmQ6ICdzaCA8c2VydmljZT4nLFxuICAgIGRlc2M6ICdjb250YWluZXIgL2Jpbi9zaCcsXG4gICAgaGFuZGxlcjogKGFyZ3MpID0+IGhhbmRsZXIoJ3NoJywgYXJncylcbiAgfSlcbiAgLmFyZ3ZcblxuY29uc3QgY21kID0gYXJncy5fWzBdXG50cnlDYXRjaChcbiAgKCkgPT4gYXNzZXJ0Q21kVmFsaWQoY21kKSxcbiAgZXJyID0+IHtcbiAgICBjb25zb2xlLmVycm9yKGZvcm1hdC5yZWQoZXJyLm1lc3NhZ2UpKVxuICAgIHlhcmdzLnNob3dIZWxwKClcbiAgICBwcm9jZXNzLmV4aXQoMSlcbiAgfVxuKVxuIl19