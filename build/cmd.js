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

const handlers = ['build', 'run'
//'up',
//'down',
//'follow',
//'sh',
//'task'
].reduce((handlers, cmd) => {
  handlers[cmd] = require('./handler/' + cmd);
  return handlers;
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
    const handler = handlers[name];
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
  if (!handlers.hasOwnProperty(cmd)) {
    throw new Error(`"${ cmd }" is not a valid command`);
  }
};
const dryOption = ['dry', {
  describe: 'print only dry run',
  type: 'boolean'
}];
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
  handler: args => handler('build', args),
  builder: y => {
    return y.option(...dryOption);
  }
}).command({
  command: 'run <service> [cmd...]',
  desc: 'run service',
  handler: args => {
    args.cmd = args.cmd.join(' ');
    return handler('run', args);
  },
  builder: y => {
    return y.option(...dryOption);
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
    }).option(...dryOption);
  }
}).command({
  command: 'down',
  desc: 'stop service(s) and remove container(s)',
  handler: args => handler('down', args),
  builder: y => {
    return y.option(...dryOption);
  }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbWQuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImluc3RhbGwiLCJzcGF3biIsInJlYWRGaWxlIiwiZ2V0Q29uZmlnIiwieWFyZ3MiLCJmb3JtYXQiLCJmaWx0ZXJTZWxlY3RlZFNlcnZpY2VzIiwidHJ5Q2F0Y2giLCJwcm9jZXNzIiwib24iLCJyZWFzb24iLCJjb25zb2xlIiwiZXJyb3IiLCJ0b1VwcGVyQ2FzZSIsImhhbmRsZXJzIiwicmVkdWNlIiwiY21kIiwiaGFuZGxlciIsIm5hbWUiLCJhcmdzIiwiaCIsInNob3dIZWxwIiwiZXhpdCIsInNlcnZpY2VzIiwiXyIsInNsaWNlIiwiY29uZmlnIiwiY3dkIiwibW9kZSIsInNlbGVjdGVkU2VydmljZXMiLCJwcmVwYXJlZCIsImFzc2VydENtZFZhbGlkIiwidW5kZWZpbmVkIiwiRXJyb3IiLCJoYXNPd25Qcm9wZXJ0eSIsImRyeU9wdGlvbiIsImRlc2NyaWJlIiwidHlwZSIsInVzYWdlIiwib3B0aW9uIiwiYWxpYXMiLCJnbG9iYWwiLCJjb21tYW5kIiwiZGVzYyIsImJ1aWxkZXIiLCJ5Iiwiam9pbiIsImFyZ3YiLCJlcnIiLCJyZWQiLCJtZXNzYWdlIl0sIm1hcHBpbmdzIjoiOztBQUVBQSxRQUFRLG9CQUFSLEVBQThCQyxPQUE5Qjs7ZUFFZ0JELFFBQVEsZUFBUixDOztNQUFURSxLLFlBQUFBLEs7O2dCQUNZRixRQUFRLE9BQVIsQzs7TUFBWkcsUSxhQUFBQSxROztBQUNQLE1BQU1DLFlBQVlKLFFBQVEsa0JBQVIsQ0FBbEI7QUFDQSxNQUFNSyxRQUFRTCxRQUFRLE9BQVIsQ0FBZDtBQUNBLE1BQU1NLFNBQVNOLFFBQVEsT0FBUixDQUFmO0FBQ0EsTUFBTU8seUJBQXlCUCxRQUFRLGdDQUFSLENBQS9CO0FBQ0EsTUFBTVEsV0FBV1IsUUFBUSxXQUFSLENBQWpCOztBQUVBUyxRQUFRQyxFQUFSLENBQVcsb0JBQVgsRUFBa0NDLE1BQUQsSUFBWTtBQUMzQ0MsVUFBUUMsS0FBUixDQUFjLHVC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QWQsQ0FIWjtBQUlQeUIsV0FBVUMsQ0FBRCxJQUFPO0FBQ2QsV0FBT0EsRUFDSk4sTUFESSxDQUNHLEdBREgsRUFDUTtBQUNYQyxhQUFPLFVBREk7QUFFWEosZ0JBQVUsOEJBRkM7QUFHWEMsWUFBTTtBQUhLLEtBRFIsRUFNSkUsTUFOSSxDQU1HLEdBQUdKLFNBTk4sQ0FBUDtBQU9EO0FBWk0sQ0FsQ0UsRUFnRFZPLE9BaERVLENBZ0RGO0FBQ1BBLFdBQVMsTUFERjtBQUVQQyxRQUFNLHlDQUZDO0FBR1AxQixXQUFVRSxJQUFELElBQVVGLFFBQVEsTUFBUixFQUFnQkUsSUFBaEIsQ0FIWjtBQUlQeUIsV0FBVUMsQ0FBRCxJQUFPO0FBQ2QsV0FBT0EsRUFDSk4sTUFESSxDQUNHLEdBQUdKLFNBRE4sQ0FBUDtBQUVEO0FBUE0sQ0FoREUsRUF5RFZPLE9BekRVLENBeURGO0FBQ1BBLFdBQVMsTUFERjtBQUVQQyxRQUFNLGlCQUZDO0FBR1AxQixXQUFVRSxJQUFELElBQVVGLFFBQVEsTUFBUixFQUFnQkUsSUFBaEI7QUFIWixDQXpERSxFQThEVnVCLE9BOURVLENBOERGO0FBQ1BBLFdBQVMsY0FERjtBQUVQQyxRQUFNLG1CQUZDO0FBR1AxQixXQUFVRSxJQUFELElBQVVGLFFBQVEsSUFBUixFQUFjRSxJQUFkO0FBSFosQ0E5REUsRUFtRVY0QixJQW5FSDs7QUFxRUEsTUFBTS9CLE1BQU1HLEtBQUtLLENBQUwsQ0FBTyxDQUFQLENBQVo7QUFDQWpCLFNBQ0UsTUFBTXdCLGVBQWVmLEdBQWYsQ0FEUixFQUVFZ0MsT0FBTztBQUNMckMsVUFBUUMsS0FBUixDQUFjUCxPQUFPNEMsR0FBUCxDQUFXRCxJQUFJRSxPQUFmLENBQWQ7QUFDQTlDLFFBQU1pQixRQUFOO0FBQ0FiLFVBQVFjLElBQVIsQ0FBYSxDQUFiO0FBQ0QsQ0FOSCIsImZpbGUiOiJjbWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxucmVxdWlyZSgnc291cmNlLW1hcC1zdXBwb3J0JykuaW5zdGFsbCgpXG5cbmNvbnN0IHtzcGF3bn0gPSByZXF1aXJlKCdjaGlsZF9wcm9jZXNzJylcbmNvbnN0IHtyZWFkRmlsZX0gPSByZXF1aXJlKCdtei9mcycpXG5jb25zdCBnZXRDb25maWcgPSByZXF1aXJlKCcuL2xpYi9nZXQtY29uZmlnJylcbmNvbnN0IHlhcmdzID0gcmVxdWlyZSgneWFyZ3MnKVxuY29uc3QgZm9ybWF0ID0gcmVxdWlyZSgnY2hhbGsnKVxuY29uc3QgZmlsdGVyU2VsZWN0ZWRTZXJ2aWNlcyA9IHJlcXVpcmUoJy4vbGliL2ZpbHRlci1zZWxlY3RlZC1zZXJ2aWNlcycpXG5jb25zdCB0cnlDYXRjaCA9IHJlcXVpcmUoJ3RyeV9jYXRjaCcpXG5cbnByb2Nlc3Mub24oJ3VuaGFuZGxlZFJlamVjdGlvbicsIChyZWFzb24pID0+IHtcbiAgY29uc29sZS5lcnJvcigndW5oYW5kbGVkIHJlamVjdGlvbjonLnRvVXBwZXJDYXNlKCkpXG4gIHRocm93IHJlYXNvblxufSlcblxuY29uc3QgaGFuZGxlcnMgPSBbXG4gICdidWlsZCcsXG4gICdydW4nXG4gIC8vJ3VwJyxcbiAgLy8nZG93bicsXG4gIC8vJ2ZvbGxvdycsXG4gIC8vJ3NoJyxcbiAgLy8ndGFzaydcbl0ucmVkdWNlKChoYW5kbGVycywgY21kKSA9PiB7XG4gIGhhbmRsZXJzW2NtZF0gPSByZXF1aXJlKCcuL2hhbmRsZXIvJyArIGNtZClcbiAgcmV0dXJuIGhhbmRsZXJzXG59LCB7fSlcblxuY29uc3QgaGFuZGxlciA9IGFzeW5jIChuYW1lLCBhcmdzID0ge30pID0+IHtcbiAgaWYgKGFyZ3MuaCA9PT0gdHJ1ZSkge1xuICAgIHlhcmdzLnNob3dIZWxwKClcbiAgICBwcm9jZXNzLmV4aXQoMClcbiAgfVxuICBhcmdzLnNlcnZpY2VzID0gYXJncy5fLnNsaWNlKDEpXG4gIGNvbnN0IGNvbmZpZyA9IGF3YWl0IGdldENvbmZpZyhwcm9jZXNzLmN3ZCgpLCBhcmdzLm1vZGUpXG4gIGNvbnN0IHNlbGVjdGVkU2VydmljZXMgPSBmaWx0ZXJTZWxlY3RlZFNlcnZpY2VzKGNvbmZpZy5wcmVwYXJlZC5zZXJ2aWNlcywgYXJncy5zZXJ2aWNlcylcbiAgY29uc3QgaGFuZGxlciA9IGhhbmRsZXJzW25hbWVdXG4gIHJldHVybiBoYW5kbGVyKHNlbGVjdGVkU2VydmljZXMsIGNvbmZpZywgYXJncylcbn1cblxuY29uc3QgYXNzZXJ0Q21kVmFsaWQgPSAoY21kKSA9PiB7XG4gIGlmIChjbWQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignbm8gY29tbWFuZCBnaXZlbicpXG4gIH1cbiAgaWYgKCFoYW5kbGVycy5oYXNPd25Qcm9wZXJ0eShjbWQpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBcIiR7Y21kfVwiIGlzIG5vdCBhIHZhbGlkIGNvbW1hbmRgKVxuICB9XG59XG5jb25zdCBkcnlPcHRpb24gPSBbJ2RyeScsIHtcbiAgZGVzY3JpYmU6ICdwcmludCBvbmx5IGRyeSBydW4nLFxuICB0eXBlOiAnYm9vbGVhbidcbn1dXG5jb25zdCBhcmdzID0geWFyZ3MudXNhZ2UoJ1xcblVzYWdlOiAkMCBbb3B0aW9uc10gPGNvbW1hbmQ+IFtjb21tYW5kLWFyZ3MuLi5dJylcbiAgLm9wdGlvbignbScsIHtcbiAgICBhbGlhczogJ21vZGUnLFxuICAgIGRlc2NyaWJlOiAndXNlIGdpdmVuIG1vZGUgc3BlY2lmaWMgY29uZmlnJyxcbiAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICBnbG9iYWw6IHRydWVcbiAgfSlcbiAgLm9wdGlvbignaCcsIHtcbiAgICBhbGlhczogJ2hlbHAnLFxuICAgIGRlc2NyaWJlOiAnb3V0cHV0IHVzYWdlIGluZm9ybWF0aW9uJyxcbiAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgZ2xvYmFsOiB0cnVlXG4gIH0pXG4gIC5jb21tYW5kKHtcbiAgICBjb21tYW5kOiAnYnVpbGQgW3NlcnZpY2VzLi4uXScsXG4gICAgZGVzYzogJ2J1aWxkIGltYWdlKHMpJyxcbiAgICBoYW5kbGVyOiAoYXJncykgPT4gaGFuZGxlcignYnVpbGQnLCBhcmdzKSxcbiAgICBidWlsZGVyOiAoeSkgPT4ge1xuICAgICAgcmV0dXJuIHlcbiAgICAgICAgLm9wdGlvbiguLi5kcnlPcHRpb24pXG4gICAgfVxuICB9KVxuICAuY29tbWFuZCh7XG4gICAgY29tbWFuZDogJ3J1biA8c2VydmljZT4gW2NtZC4uLl0nLFxuICAgIGRlc2M6ICdydW4gc2VydmljZScsXG4gICAgaGFuZGxlcjogYXJncyA9PiB7XG4gICAgICBhcmdzLmNtZCA9IGFyZ3MuY21kLmpvaW4oJyAnKVxuICAgICAgcmV0dXJuIGhhbmRsZXIoJ3J1bicsIGFyZ3MpXG4gICAgfSxcbiAgICBidWlsZGVyOiAoeSkgPT4ge1xuICAgICAgcmV0dXJuIHlcbiAgICAgICAgLm9wdGlvbiguLi5kcnlPcHRpb24pXG4gICAgfVxuICB9KVxuICAuY29tbWFuZCh7XG4gICAgY29tbWFuZDogJ3VwIFtzZXJ2aWNlcy4uLl0nLFxuICAgIGRlc2M6ICdidWlsZCBhbmQgc3RhcnQgc2VydmljZShzKScsXG4gICAgaGFuZGxlcjogKGFyZ3MpID0+IGhhbmRsZXIoJ3VwJywgYXJncyksXG4gICAgYnVpbGRlcjogKHkpID0+IHtcbiAgICAgIHJldHVybiB5XG4gICAgICAgIC5vcHRpb24oJ2QnLCB7XG4gICAgICAgICAgYWxpYXM6ICdkZXRhY2hlZCcsXG4gICAgICAgICAgZGVzY3JpYmU6ICdzdGFydCBzZXJ2aWNlcyBpbiBiYWNrZ3JvdW5kJyxcbiAgICAgICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgICAgfSlcbiAgICAgICAgLm9wdGlvbiguLi5kcnlPcHRpb24pXG4gICAgfVxuICB9KVxuICAuY29tbWFuZCh7XG4gICAgY29tbWFuZDogJ2Rvd24nLFxuICAgIGRlc2M6ICdzdG9wIHNlcnZpY2UocykgYW5kIHJlbW92ZSBjb250YWluZXIocyknLFxuICAgIGhhbmRsZXI6IChhcmdzKSA9PiBoYW5kbGVyKCdkb3duJywgYXJncyksXG4gICAgYnVpbGRlcjogKHkpID0+IHtcbiAgICAgIHJldHVybiB5XG4gICAgICAgIC5vcHRpb24oLi4uZHJ5T3B0aW9uKVxuICAgIH1cbiAgfSlcbiAgLmNvbW1hbmQoe1xuICAgIGNvbW1hbmQ6ICdsb2dzJyxcbiAgICBkZXNjOiAnY29ubmVjdCB0byBsb2dzJyxcbiAgICBoYW5kbGVyOiAoYXJncykgPT4gaGFuZGxlcignbG9ncycsIGFyZ3MpXG4gIH0pXG4gIC5jb21tYW5kKHtcbiAgICBjb21tYW5kOiAnc2ggPHNlcnZpY2U+JyxcbiAgICBkZXNjOiAnY29udGFpbmVyIC9iaW4vc2gnLFxuICAgIGhhbmRsZXI6IChhcmdzKSA9PiBoYW5kbGVyKCdzaCcsIGFyZ3MpXG4gIH0pXG4gIC5hcmd2XG5cbmNvbnN0IGNtZCA9IGFyZ3MuX1swXVxudHJ5Q2F0Y2goXG4gICgpID0+IGFzc2VydENtZFZhbGlkKGNtZCksXG4gIGVyciA9PiB7XG4gICAgY29uc29sZS5lcnJvcihmb3JtYXQucmVkKGVyci5tZXNzYWdlKSlcbiAgICB5YXJncy5zaG93SGVscCgpXG4gICAgcHJvY2Vzcy5leGl0KDEpXG4gIH1cbilcbiJdfQ==