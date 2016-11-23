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

process.on('unhandledRejection', reason => {
  console.error('unhandled rejection:'.toUpperCase(), reason);
  process.exit(1);
});

const cmds = {
  up: require('./lib/cmds/up'),
  build: require('./lib/cmds/build')
};

const handler = (() => {
  var _ref = _asyncToGenerator(function* (name, args = {}) {
    if (args.h === true) {
      yargs.showHelp();
      process.exit(0);
    }
    args.services = args._.slice(1);
    const config = yield getConfig(args.mode);
    const handler = cmds[name];
    handler(config, args);
  });

  return function handler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

const assertArgsValid = args => {
  if (args.cmd === undefined) {
    console.error('no command given');
    process.exit(1);
  }

  if (!cmds.hasOwnProperty(args.cmd)) {
    console.error(`"${ args.cmd }" is not a valid command`);
    process.exit(1);
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
  handler: args => handler('build', args)
}).argv;

const cmdArg = args._[0];
if (!cmds.hasOwnProperty(cmdArg)) {
  console.error(format.red(`"${ cmdArg }" is not a valid command`));
  yargs.showHelp();
  process.exit(1);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbWQuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImluc3RhbGwiLCJzcGF3biIsInJlYWRGaWxlIiwiZ2V0Q29uZmlnIiwieWFyZ3MiLCJmb3JtYXQiLCJwcm9jZXNzIiwib24iLCJyZWFzb24iLCJjb25zb2xlIiwiZXJyb3IiLCJ0b1VwcGVyQ2FzZSIsImV4aXQiLCJjbWRzIiwidXAiLCJidWlsZCIsImhhbmRsZXIiLCJuYW1lIiwiYXJncyIsImgiLCJzaG93SGVscCIsInNlcnZpY2VzIiwiXyIsInNsaWNlIiwiY29uZmlnIiwibW9kZSIsImFzc2VydEFyZ3NWYWxpZCIsImNtZCIsInVuZGVmaW5lZCIsImhhc093blByb3BlcnR5IiwidXNhZ2UiLCJvcHRpb24iLCJhbGlhcyIsImRlc2NyaWJlIiwidHlwZSIsImdsb2JhbCIsImNvbW1hbmQiLCJkZXNjIiwiYXJndiIsImNtZEFyZyIsInJlZCJdLCJtYXBwaW5ncyI6Ijs7QUFFQUEsUUFBUSxvQkFBUixFQUE4QkMsT0FBOUI7O2VBRWdCRCxRQUFRLGVBQVIsQzs7TUFBVEUsSyxZQUFBQSxLOztnQkFDWUYsUUFBUSxPQUFSLEM7O01BQVpHLFEsYUFBQUEsUTs7QUFDUCxNQUFNQyxZQUFZSixRQUFRLGtCQUFSLENBQWxCO0FBQ0EsTUFBTUssUUFBUUwsUUFBUSxPQUFSLENBQWQ7QUFDQSxNQUFNTSxTQUFTTixRQUFRLE9BQVIsQ0FBZjs7QUFFQU8sUUFBUUMsRUFBUixDQUFXLG9CQUFYLEVBQWtDQyxNQUFELElBQVk7QUFDM0NDLFVBQVFDLEtBQVIsQ0FBYyx1QkFBdUJDLFdBQXZCLEVBQWQsRUFBb0RILE1BQXBEO0FBQ0FGLFVBQVFNLElBQVIsQ0FBYSxDQUFiO0FBQ0QsQ0FIRDs7QUFLQSxNQUFNQyxPQUFPO0FBQ1hDLE1BQUlmLFFBQVEsZUFBUixDQURPO0FBRVhnQixTQUFPaEIsUUFBUSxrQkFBUjtBQUZJLENBQWI7O0FBS0EsTUFBTWlCO0FBQUEsK0JBQVUsV0FBT0MsSUFBUCxFQUFhQyxPQUFPLEVBQXBCLEVBQTJCO0FBQ3pDLFFBQUlBLEtBQUtDLENBQUwsS0FBVyxJQUFmLEVBQXFCO0FBQ25CZixZQUFNZ0IsUUFBTjtBQUNBZCxjQUFRTSxJQUFSLENBQWEsQ0FBYjtBQUNEO0FBQ0RNLFNBQUtHLFFBQUwsR0FBZ0JILEtBQUtJLENBQUwsQ0FBT0MsS0FBUCxDQUFhLENBQWIsQ0FBaEI7QUFDQSxVQUFNQyxTQUFTLE1BQU1yQixVQUFVZSxLQUFLTyxJQUFmLENBQXJCO0FBQ0EsVUFBTVQsVUFBVUgsS0FBS0ksSUFBTCxDQUFoQjtBQUNBRCxZQUFRUSxNQUFSLEVBQWdCTixJQUFoQjtBQUNELEdBVEs7O0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFBTjs7QUFXQSxNQUFNUSxrQkFBbUJSLElBQUQsSUFBVTtBQUNoQyxNQUFJQSxLQUFLUyxHQUFMLEtBQWFDLFNBQWpCLEVBQTRCO0FBQzFCbkIsWUFBUUMsS0FBUixDQUFjLGtCQUFkO0FBQ0FKLFlBQVFNLElBQVIsQ0FBYSxDQUFiO0FBQ0Q7O0FBRUQsTUFBSSxDQUFDQyxLQUFLZ0IsY0FBTCxDQUFvQlgsS0FBS1MsR0FBekIsQ0FBTCxFQUFvQztBQUNsQ2xCLFlBQVFDLEtBQVIsQ0FBZSxLQUFHUSxLQUFLUyxHQUFJLDJCQUEzQjtBQUNBckIsWUFBUU0sSUFBUixDQUFhLENBQWI7QUFDRDtBQUNGLENBVkQ7O0FBWUEsTUFBTU0sT0FBT2QsTUFBTTBCLEtBQU4sQ0FBWSwrQ0FBWixFQUNWQyxNQURVLENBQ0gsR0FERyxFQUNFO0FBQ1hDLFNBQU8sTUFESTtBQUVYQyxZQUFVLGdDQUZDO0FBR1hDLFFBQU0sUUFISztBQUlYQyxVQUFRO0FBSkcsQ0FERixFQU9WSixNQVBVLENBT0gsR0FQRyxFQU9FO0FBQ1hDLFNBQU8sTUFESTtBQUVYQyxZQUFVLDBCQUZDO0FBR1hDLFFBQU0sU0FISztBQUlYQyxVQUFRO0FBSkcsQ0FQRixFQWFWQyxPQWJVLENBYUY7QUFDUEEsV0FBUyxPQURGO0FBRVBDLFFBQU0sZ0JBRkM7QUFHUHJCLFdBQVVFLElBQUQsSUFBVUYsUUFBUSxPQUFSLEVBQWlCRSxJQUFqQjtBQUhaLENBYkUsRUFrQlZrQixPQWxCVSxDQWtCRjtBQUNQQSxXQUFTLElBREY7QUFFUEMsUUFBTSxrQkFGQztBQUdQckIsV0FBVUUsSUFBRCxJQUFVRixRQUFRLE9BQVIsRUFBaUJFLElBQWpCO0FBSFosQ0FsQkUsRUF1QlZvQixJQXZCSDs7QUF5QkEsTUFBTUMsU0FBU3JCLEtBQUtJLENBQUwsQ0FBTyxDQUFQLENBQWY7QUFDQSxJQUFJLENBQUNULEtBQUtnQixjQUFMLENBQW9CVSxNQUFwQixDQUFMLEVBQWtDO0FBQ2hDOUIsVUFBUUMsS0FBUixDQUFjTCxPQUFPbUMsR0FBUCxDQUFZLEtBQUdELE1BQU8sMkJBQXRCLENBQWQ7QUFDQW5DLFFBQU1nQixRQUFOO0FBQ0FkLFVBQVFNLElBQVIsQ0FBYSxDQUFiO0FBQ0QiLCJmaWxlIjoiY21kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbnJlcXVpcmUoJ3NvdXJjZS1tYXAtc3VwcG9ydCcpLmluc3RhbGwoKVxuXG5jb25zdCB7c3Bhd259ID0gcmVxdWlyZSgnY2hpbGRfcHJvY2VzcycpXG5jb25zdCB7cmVhZEZpbGV9ID0gcmVxdWlyZSgnbXovZnMnKVxuY29uc3QgZ2V0Q29uZmlnID0gcmVxdWlyZSgnLi9saWIvZ2V0LWNvbmZpZycpXG5jb25zdCB5YXJncyA9IHJlcXVpcmUoJ3lhcmdzJylcbmNvbnN0IGZvcm1hdCA9IHJlcXVpcmUoJ2NoYWxrJylcblxucHJvY2Vzcy5vbigndW5oYW5kbGVkUmVqZWN0aW9uJywgKHJlYXNvbikgPT4ge1xuICBjb25zb2xlLmVycm9yKCd1bmhhbmRsZWQgcmVqZWN0aW9uOicudG9VcHBlckNhc2UoKSwgcmVhc29uKVxuICBwcm9jZXNzLmV4aXQoMSlcbn0pXG5cbmNvbnN0IGNtZHMgPSB7XG4gIHVwOiByZXF1aXJlKCcuL2xpYi9jbWRzL3VwJyksXG4gIGJ1aWxkOiByZXF1aXJlKCcuL2xpYi9jbWRzL2J1aWxkJylcbn1cblxuY29uc3QgaGFuZGxlciA9IGFzeW5jIChuYW1lLCBhcmdzID0ge30pID0+IHtcbiAgaWYgKGFyZ3MuaCA9PT0gdHJ1ZSkge1xuICAgIHlhcmdzLnNob3dIZWxwKClcbiAgICBwcm9jZXNzLmV4aXQoMClcbiAgfVxuICBhcmdzLnNlcnZpY2VzID0gYXJncy5fLnNsaWNlKDEpXG4gIGNvbnN0IGNvbmZpZyA9IGF3YWl0IGdldENvbmZpZyhhcmdzLm1vZGUpXG4gIGNvbnN0IGhhbmRsZXIgPSBjbWRzW25hbWVdXG4gIGhhbmRsZXIoY29uZmlnLCBhcmdzKVxufVxuXG5jb25zdCBhc3NlcnRBcmdzVmFsaWQgPSAoYXJncykgPT4ge1xuICBpZiAoYXJncy5jbWQgPT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ25vIGNvbW1hbmQgZ2l2ZW4nKVxuICAgIHByb2Nlc3MuZXhpdCgxKVxuICB9XG5cbiAgaWYgKCFjbWRzLmhhc093blByb3BlcnR5KGFyZ3MuY21kKSkge1xuICAgIGNvbnNvbGUuZXJyb3IoYFwiJHthcmdzLmNtZH1cIiBpcyBub3QgYSB2YWxpZCBjb21tYW5kYClcbiAgICBwcm9jZXNzLmV4aXQoMSlcbiAgfVxufVxuXG5jb25zdCBhcmdzID0geWFyZ3MudXNhZ2UoJ1xcblVzYWdlOiAkMCBbb3B0aW9uc10gPGNvbW1hbmQ+IFtzZXJ2aWNlcy4uLl0nKVxuICAub3B0aW9uKCdtJywge1xuICAgIGFsaWFzOiAnbW9kZScsXG4gICAgZGVzY3JpYmU6ICd1c2UgZ2l2ZW4gbW9kZSBzcGVjaWZpYyBjb25maWcnLFxuICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIGdsb2JhbDogdHJ1ZVxuICB9KVxuICAub3B0aW9uKCdoJywge1xuICAgIGFsaWFzOiAnaGVscCcsXG4gICAgZGVzY3JpYmU6ICdvdXRwdXQgdXNhZ2UgaW5mb3JtYXRpb24nLFxuICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICBnbG9iYWw6IHRydWVcbiAgfSlcbiAgLmNvbW1hbmQoe1xuICAgIGNvbW1hbmQ6ICdidWlsZCcsXG4gICAgZGVzYzogJ2J1aWxkIGltYWdlKHMpJyxcbiAgICBoYW5kbGVyOiAoYXJncykgPT4gaGFuZGxlcignYnVpbGQnLCBhcmdzKVxuICB9KVxuICAuY29tbWFuZCh7XG4gICAgY29tbWFuZDogJ3VwJyxcbiAgICBkZXNjOiAnc3RhcnQgc2VydmljZShzKScsXG4gICAgaGFuZGxlcjogKGFyZ3MpID0+IGhhbmRsZXIoJ2J1aWxkJywgYXJncylcbiAgfSlcbiAgLmFyZ3ZcblxuY29uc3QgY21kQXJnID0gYXJncy5fWzBdXG5pZiAoIWNtZHMuaGFzT3duUHJvcGVydHkoY21kQXJnKSkge1xuICBjb25zb2xlLmVycm9yKGZvcm1hdC5yZWQoYFwiJHtjbWRBcmd9XCIgaXMgbm90IGEgdmFsaWQgY29tbWFuZGApKVxuICB5YXJncy5zaG93SGVscCgpXG4gIHByb2Nlc3MuZXhpdCgxKVxufVxuIl19