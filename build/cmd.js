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

const cmds = ['build', 'run'
//'up',
//'down',
//'follow',
//'sh',
//'task'
].reduce((cmds, cmd) => {
  cmds[cmd] = require('./cmds/' + cmd);
  return cmds;
}, {});

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

const args = yargs.usage('\nUsage: $0 [options] <command> [command-args...]').option('m', {
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
  command: 'build [services...]',
  desc: 'build image(s)',
  handler: args => handler('build', args)
}).command({
  command: 'run <service> [cmd...]',
  desc: 'run service',
  handler: args => {
    args.cmd = args.cmd.join(' ');
    return handler('run', args);
  }
}).command({
  command: 'up [services...]',
  desc: 'build and start service(s)',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbWQuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImluc3RhbGwiLCJzcGF3biIsInJlYWRGaWxlIiwiZ2V0Q29uZmlnIiwieWFyZ3MiLCJmb3JtYXQiLCJmaWx0ZXJTZWxlY3RlZFNlcnZpY2VzIiwidHJ5Q2F0Y2giLCJwcm9jZXNzIiwib24iLCJyZWFzb24iLCJjb25zb2xlIiwiZXJyb3IiLCJ0b1VwcGVyQ2FzZSIsImNtZHMiLCJyZWR1Y2UiLCJjbWQiLCJoYW5kbGVyIiwibmFtZSIsImFyZ3MiLCJoIiwic2hvd0hlbHAiLCJleGl0Iiwic2VydmljZXMiLCJfIiwic2xpY2UiLCJjb25maWciLCJjd2QiLCJtb2RlIiwic2VsZWN0ZWRTZXJ2aWNlcyIsInByZXBhcmVkIiwiYXNzZXJ0Q21kVmFsaWQiLCJ1bmRlZmluZWQiLCJFcnJvciIsImhhc093blByb3BlcnR5IiwidXNhZ2UiLCJvcHRpb24iLCJhbGlhcyIsImRlc2NyaWJlIiwidHlwZSIsImdsb2JhbCIsImNvbW1hbmQiLCJkZXNjIiwiam9pbiIsImJ1aWxkZXIiLCJ5IiwiYXJndiIsImVyciIsInJlZCIsIm1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7O0FBRUFBLFFBQVEsb0JBQVIsRUFBOEJDLE9BQTlCOztlQUVnQkQsUUFBUSxlQUFSLEM7O01BQVRFLEssWUFBQUEsSzs7Z0JBQ1lGLFFBQVEsT0FBUixDOztNQUFaRyxRLGFBQUFBLFE7O0FBQ1AsTUFBTUMsWUFBWUosUUFBUSxrQkFBUixDQUFsQjtBQUNBLE1BQU1LLFFBQVFMLFFBQVEsT0FBUixDQUFkO0FBQ0EsTUFBTU0sU0FBU04sUUFBUSxPQUFSLENBQWY7QUFDQSxNQUFNTyx5QkFBeUJQLFFBQVEsZ0NBQVIsQ0FBL0I7QUFDQSxNQUFNUSxXQUFXUixRQUFRLFdBQVIsQ0FBakI7O0FBRUFTLFFBQVFDLEVBQVIsQ0FBVyxvQkFBWCxFQUFrQ0MsTUFBRCxJQUFZO0FBQzNDQyxVQUFRQyxLQUFSLENBQWMsdUJBQXVCQyxXQUF2QixFQUFk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dkNFLEVBNENWc0IsT0E1Q1UsQ0E0Q0Y7QUFDUEEsV0FBUyxNQURGO0FBRVBDLFFBQU0saUJBRkM7QUFHUHpCLFdBQVVFLElBQUQsSUFBVUYsUUFBUSxNQUFSLEVBQWdCRSxJQUFoQjtBQUhaLENBNUNFLEVBaURWc0IsT0FqRFUsQ0FpREY7QUFDUEEsV0FBUyxjQURGO0FBRVBDLFFBQU0sbUJBRkM7QUFHUHpCLFdBQVVFLElBQUQsSUFBVUYsUUFBUSxJQUFSLEVBQWNFLElBQWQ7QUFIWixDQWpERSxFQXNEVjJCLElBdERIOztBQXdEQSxNQUFNOUIsTUFBTUcsS0FBS0ssQ0FBTCxDQUFPLENBQVAsQ0FBWjtBQUNBakIsU0FDRSxNQUFNd0IsZUFBZWYsR0FBZixDQURSLEVBRUUrQixPQUFPO0FBQ0xwQyxVQUFRQyxLQUFSLENBQWNQLE9BQU8yQyxHQUFQLENBQVdELElBQUlFLE9BQWYsQ0FBZDtBQUNBN0MsUUFBTWlCLFFBQU47QUFDQWIsVUFBUWMsSUFBUixDQUFhLENBQWI7QUFDRCxDQU5IIiwiZmlsZSI6ImNtZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5yZXF1aXJlKCdzb3VyY2UtbWFwLXN1cHBvcnQnKS5pbnN0YWxsKClcblxuY29uc3Qge3NwYXdufSA9IHJlcXVpcmUoJ2NoaWxkX3Byb2Nlc3MnKVxuY29uc3Qge3JlYWRGaWxlfSA9IHJlcXVpcmUoJ216L2ZzJylcbmNvbnN0IGdldENvbmZpZyA9IHJlcXVpcmUoJy4vbGliL2dldC1jb25maWcnKVxuY29uc3QgeWFyZ3MgPSByZXF1aXJlKCd5YXJncycpXG5jb25zdCBmb3JtYXQgPSByZXF1aXJlKCdjaGFsaycpXG5jb25zdCBmaWx0ZXJTZWxlY3RlZFNlcnZpY2VzID0gcmVxdWlyZSgnLi9saWIvZmlsdGVyLXNlbGVjdGVkLXNlcnZpY2VzJylcbmNvbnN0IHRyeUNhdGNoID0gcmVxdWlyZSgndHJ5X2NhdGNoJylcblxucHJvY2Vzcy5vbigndW5oYW5kbGVkUmVqZWN0aW9uJywgKHJlYXNvbikgPT4ge1xuICBjb25zb2xlLmVycm9yKCd1bmhhbmRsZWQgcmVqZWN0aW9uOicudG9VcHBlckNhc2UoKSlcbiAgdGhyb3cgcmVhc29uXG59KVxuXG5jb25zdCBjbWRzID0gW1xuICAnYnVpbGQnLFxuICAncnVuJ1xuICAvLyd1cCcsXG4gIC8vJ2Rvd24nLFxuICAvLydmb2xsb3cnLFxuICAvLydzaCcsXG4gIC8vJ3Rhc2snXG5dLnJlZHVjZSgoY21kcywgY21kKSA9PiB7XG4gIGNtZHNbY21kXSA9IHJlcXVpcmUoJy4vY21kcy8nICsgY21kKVxuICByZXR1cm4gY21kc1xufSwge30pXG5cbmNvbnN0IGhhbmRsZXIgPSBhc3luYyAobmFtZSwgYXJncyA9IHt9KSA9PiB7XG4gIGlmIChhcmdzLmggPT09IHRydWUpIHtcbiAgICB5YXJncy5zaG93SGVscCgpXG4gICAgcHJvY2Vzcy5leGl0KDApXG4gIH1cbiAgYXJncy5zZXJ2aWNlcyA9IGFyZ3MuXy5zbGljZSgxKVxuICBjb25zdCBjb25maWcgPSBhd2FpdCBnZXRDb25maWcocHJvY2Vzcy5jd2QoKSwgYXJncy5tb2RlKVxuICBjb25zdCBzZWxlY3RlZFNlcnZpY2VzID0gZmlsdGVyU2VsZWN0ZWRTZXJ2aWNlcyhjb25maWcucHJlcGFyZWQuc2VydmljZXMsIGFyZ3Muc2VydmljZXMpXG4gIGNvbnN0IGhhbmRsZXIgPSBjbWRzW25hbWVdXG4gIHJldHVybiBoYW5kbGVyKHNlbGVjdGVkU2VydmljZXMsIGNvbmZpZywgYXJncylcbn1cblxuY29uc3QgYXNzZXJ0Q21kVmFsaWQgPSAoY21kKSA9PiB7XG4gIGlmIChjbWQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignbm8gY29tbWFuZCBnaXZlbicpXG4gIH1cbiAgaWYgKCFjbWRzLmhhc093blByb3BlcnR5KGNtZCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFwiJHtjbWR9XCIgaXMgbm90IGEgdmFsaWQgY29tbWFuZGApXG4gIH1cbn1cblxuY29uc3QgYXJncyA9IHlhcmdzLnVzYWdlKCdcXG5Vc2FnZTogJDAgW29wdGlvbnNdIDxjb21tYW5kPiBbY29tbWFuZC1hcmdzLi4uXScpXG4gIC5vcHRpb24oJ20nLCB7XG4gICAgYWxpYXM6ICdtb2RlJyxcbiAgICBkZXNjcmliZTogJ3VzZSBnaXZlbiBtb2RlIHNwZWNpZmljIGNvbmZpZycsXG4gICAgdHlwZTogJ3N0cmluZycsXG4gICAgZ2xvYmFsOiB0cnVlXG4gIH0pXG4gIC5vcHRpb24oJ2gnLCB7XG4gICAgYWxpYXM6ICdoZWxwJyxcbiAgICBkZXNjcmliZTogJ291dHB1dCB1c2FnZSBpbmZvcm1hdGlvbicsXG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGdsb2JhbDogdHJ1ZVxuICB9KVxuICAuY29tbWFuZCh7XG4gICAgY29tbWFuZDogJ2J1aWxkIFtzZXJ2aWNlcy4uLl0nLFxuICAgIGRlc2M6ICdidWlsZCBpbWFnZShzKScsXG4gICAgaGFuZGxlcjogKGFyZ3MpID0+IGhhbmRsZXIoJ2J1aWxkJywgYXJncylcbiAgfSlcbiAgLmNvbW1hbmQoe1xuICAgIGNvbW1hbmQ6ICdydW4gPHNlcnZpY2U+IFtjbWQuLi5dJyxcbiAgICBkZXNjOiAncnVuIHNlcnZpY2UnLFxuICAgIGhhbmRsZXI6IGFyZ3MgPT4ge1xuICAgICAgYXJncy5jbWQgPSBhcmdzLmNtZC5qb2luKCcgJylcbiAgICAgIHJldHVybiBoYW5kbGVyKCdydW4nLCBhcmdzKVxuICAgIH1cbiAgfSlcbiAgLmNvbW1hbmQoe1xuICAgIGNvbW1hbmQ6ICd1cCBbc2VydmljZXMuLi5dJyxcbiAgICBkZXNjOiAnYnVpbGQgYW5kIHN0YXJ0IHNlcnZpY2UocyknLFxuICAgIGhhbmRsZXI6IChhcmdzKSA9PiBoYW5kbGVyKCd1cCcsIGFyZ3MpLFxuICAgIGJ1aWxkZXI6ICh5KSA9PiB7XG4gICAgICByZXR1cm4geVxuICAgICAgLm9wdGlvbignZCcsIHtcbiAgICAgICAgYWxpYXM6ICdkZXRhY2hlZCcsXG4gICAgICAgIGRlc2NyaWJlOiAnc3RhcnQgc2VydmljZXMgaW4gYmFja2dyb3VuZCcsXG4gICAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgfSlcbiAgICB9XG4gIH0pXG4gIC5jb21tYW5kKHtcbiAgICBjb21tYW5kOiAnZG93bicsXG4gICAgZGVzYzogJ3N0b3Agc2VydmljZShzKSBhbmQgcmVtb3ZlIGNvbnRhaW5lcihzKScsXG4gICAgaGFuZGxlcjogKGFyZ3MpID0+IGhhbmRsZXIoJ2Rvd24nLCBhcmdzKVxuICB9KVxuICAuY29tbWFuZCh7XG4gICAgY29tbWFuZDogJ2xvZ3MnLFxuICAgIGRlc2M6ICdjb25uZWN0IHRvIGxvZ3MnLFxuICAgIGhhbmRsZXI6IChhcmdzKSA9PiBoYW5kbGVyKCdsb2dzJywgYXJncylcbiAgfSlcbiAgLmNvbW1hbmQoe1xuICAgIGNvbW1hbmQ6ICdzaCA8c2VydmljZT4nLFxuICAgIGRlc2M6ICdjb250YWluZXIgL2Jpbi9zaCcsXG4gICAgaGFuZGxlcjogKGFyZ3MpID0+IGhhbmRsZXIoJ3NoJywgYXJncylcbiAgfSlcbiAgLmFyZ3ZcblxuY29uc3QgY21kID0gYXJncy5fWzBdXG50cnlDYXRjaChcbiAgKCkgPT4gYXNzZXJ0Q21kVmFsaWQoY21kKSxcbiAgZXJyID0+IHtcbiAgICBjb25zb2xlLmVycm9yKGZvcm1hdC5yZWQoZXJyLm1lc3NhZ2UpKVxuICAgIHlhcmdzLnNob3dIZWxwKClcbiAgICBwcm9jZXNzLmV4aXQoMSlcbiAgfVxuKVxuIl19