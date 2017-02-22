var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = require('child_process');

const spawn = _require.spawn;

const makeRunArgs = require('./make-run-args');

const singleServiceCommand = handler => {
  return (services, config, args, options) => {
    if (!args.service) {
      throw new Error('No service name given'); // list service names
    }
    const service = services[args.service];
    if (!service) {
      throw new Error(`"${ args.service }" - no such service`);
    }
    return handler(service, config, args, options);
  };
};

const run = singleServiceCommand((service, config, args, options = {}) => {
  // const name = `${config.project.name}_${args.service}`
  service = args.cmd ? _extends({}, service, { cmd: args.cmd }) : service;
  service = options.containerName ? _extends({}, service, { name: options.containerName }) : service;
  const runArgs = ['run', '--rm', ...makeRunArgs(service)];
  console.log(`docker ${ runArgs.join(' ') }`);
  spawn('docker', runArgs, { stdio: 'inherit' });
});

module.exports = run;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbWRzL3J1bi9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwic3Bhd24iLCJtYWtlUnVuQXJncyIsInNpbmdsZVNlcnZpY2VDb21tYW5kIiwiaGFuZGxlciIsInNlcnZpY2VzIiwiY29uZmlnIiwiYXJncyIsIm9wdGlvbnMiLCJzZXJ2aWNlIiwiRXJyb3IiLCJydW4iLCJjbWQiLCJjb250YWluZXJOYW1lIiwibmFtZSIsInJ1bkFyZ3MiLCJjb25zb2xlIiwibG9nIiwiam9pbiIsInN0ZGlvIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7ZUFBZ0JBLFFBQVEsZUFBUixDOztNQUFUQyxLLFlBQUFBLEs7O0FBQ1AsTUFBTUMsY0FBY0YsUUFBUSxpQkFBUixDQUFwQjs7QUFFQSxNQUFNRyx1QkFBdUJDLFdBQVc7QUFDdEMsU0FBTyxDQUFDQyxRQUFELEVBQVdDLE1BQVgsRUFBbUJDLElBQW5CLEVBQXlCQyxPQUF6QixLQUFxQztBQUMxQyxRQUFJLENBQUNELEtBQUtFLE9BQVYsRUFBbUI7QUFDakIsWUFBTSxJQUFJQyxLQUFKLENBQVUsdUJBQVYsQ0FBTixDQURpQixDQUN3QjtBQUMxQztBQUNELFVBQU1ELFVBQVVKLFNBQVNFLEtBQUtFLE9BQWQsQ0FBaEI7QUFDQSxRQUFJLENBQUNBLE9BQUwsRUFBYztBQUNaLFlBQU0sSUFBSUMsS0FBSixDQUFXLEtBQUdILEtBQUtFLE9BQVEsc0JBQTNCLENBQU47QUFDRDtBQUNELFdBQU9MLFFBQVFLLE9BQVIsRUFBaUJILE1BQWpCLEVBQXlCQyxJQUF6QixFQUErQkMsT0FBL0IsQ0FBUDtBQUNELEdBVEQ7QUFVRCxDQVhEOztBQWFBLE1BQU1HLE1BQU1SLHFCQUFxQixDQUFDTSxPQUFELEVBQVVILE1BQVYsRUFBa0JDLElBQWxCLEVBQXdCQyxVQUFVLEVBQWxDLEtBQXlDO0FBQ3hFO0FBQ0FDLFlBQVVGLEtBQUtLLEdBQUwsZ0JBQWVILE9BQWYsSUFBd0JHLEtBQUtMLEtBQUtLLEdBQWxDLE1BQXlDSCxPQUFuRDtBQUNBQSxZQUFVRCxRQUFRSyxhQUFSLGdCQUE0QkosT0FBNUIsSUFBcUNLLE1BQU1OLFFBQVFLLGFBQW5ELE1BQW9FSixPQUE5RTtBQUNBLFFBQU1NLFVBQVUsQ0FBQyxLQUFELEVBQVEsTUFBUixFQUFnQixHQUFHYixZQUFZTyxPQUFaLENBQW5CLENBQWhCO0FBQ0FPLFVBQVFDLEdBQVIsQ0FBYSxXQUFTRixRQUFRRyxJQUFSLENBQWEsR0FBYixDQUFrQixHQUF4QztBQUNBakIsUUFBTSxRQUFOLEVBQWdCYyxPQUFoQixFQUF5QixFQUFDSSxPQUFPLFNBQVIsRUFBekI7QUFDRCxDQVBXLENBQVo7O0FBU0FDLE9BQU9DLE9BQVAsR0FBaUJWLEdBQWpCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qge3NwYXdufSA9IHJlcXVpcmUoJ2NoaWxkX3Byb2Nlc3MnKVxuY29uc3QgbWFrZVJ1bkFyZ3MgPSByZXF1aXJlKCcuL21ha2UtcnVuLWFyZ3MnKVxuXG5jb25zdCBzaW5nbGVTZXJ2aWNlQ29tbWFuZCA9IGhhbmRsZXIgPT4ge1xuICByZXR1cm4gKHNlcnZpY2VzLCBjb25maWcsIGFyZ3MsIG9wdGlvbnMpID0+IHtcbiAgICBpZiAoIWFyZ3Muc2VydmljZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBzZXJ2aWNlIG5hbWUgZ2l2ZW4nKSAvLyBsaXN0IHNlcnZpY2UgbmFtZXNcbiAgICB9XG4gICAgY29uc3Qgc2VydmljZSA9IHNlcnZpY2VzW2FyZ3Muc2VydmljZV1cbiAgICBpZiAoIXNlcnZpY2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgXCIke2FyZ3Muc2VydmljZX1cIiAtIG5vIHN1Y2ggc2VydmljZWApXG4gICAgfVxuICAgIHJldHVybiBoYW5kbGVyKHNlcnZpY2UsIGNvbmZpZywgYXJncywgb3B0aW9ucylcbiAgfVxufVxuXG5jb25zdCBydW4gPSBzaW5nbGVTZXJ2aWNlQ29tbWFuZCgoc2VydmljZSwgY29uZmlnLCBhcmdzLCBvcHRpb25zID0ge30pID0+IHtcbiAgLy8gY29uc3QgbmFtZSA9IGAke2NvbmZpZy5wcm9qZWN0Lm5hbWV9XyR7YXJncy5zZXJ2aWNlfWBcbiAgc2VydmljZSA9IGFyZ3MuY21kID8gey4uLnNlcnZpY2UsIGNtZDogYXJncy5jbWR9IDogc2VydmljZVxuICBzZXJ2aWNlID0gb3B0aW9ucy5jb250YWluZXJOYW1lID8gey4uLnNlcnZpY2UsIG5hbWU6IG9wdGlvbnMuY29udGFpbmVyTmFtZX0gOiBzZXJ2aWNlXG4gIGNvbnN0IHJ1bkFyZ3MgPSBbJ3J1bicsICctLXJtJywgLi4ubWFrZVJ1bkFyZ3Moc2VydmljZSldXG4gIGNvbnNvbGUubG9nKGBkb2NrZXIgJHtydW5BcmdzLmpvaW4oJyAnKX1gKVxuICBzcGF3bignZG9ja2VyJywgcnVuQXJncywge3N0ZGlvOiAnaW5oZXJpdCd9KVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBydW5cbiJdfQ==