var _require = require('child_process');

const spawn = _require.spawn;


const singleServiceCommand = handler => {
  return (services, config, args) => {
    if (!args.serviceName) {
      throw new Error('No service name given'); // list service names
    }
    const service = services[args.service];
    if (!service) {
      throw new Error(`"${ args.service }" - no such service`);
    }
    return handler(service, config, args);
  };
};

const run = singleServiceCommand((service, config, { service: serviceName }) => {
  const name = `${ config.project.name }_${ serviceName }`;
  const args = ['run', '--rm', ...makeRunArgs(prepare(service), name), '/bin/sh'];
  const cmd = `docker ${ args.join(' ') }`;
  console.log(cmd);
  spawn('docker', args, { stdio: 'inherit' });
});

module.exports = run;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbWRzL3J1bi9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwic3Bhd24iLCJzaW5nbGVTZXJ2aWNlQ29tbWFuZCIsImhhbmRsZXIiLCJzZXJ2aWNlcyIsImNvbmZpZyIsImFyZ3MiLCJzZXJ2aWNlTmFtZSIsIkVycm9yIiwic2VydmljZSIsInJ1biIsIm5hbWUiLCJwcm9qZWN0IiwibWFrZVJ1bkFyZ3MiLCJwcmVwYXJlIiwiY21kIiwiam9pbiIsImNvbnNvbGUiLCJsb2ciLCJzdGRpbyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJlQUFnQkEsUUFBUSxlQUFSLEM7O01BQVRDLEssWUFBQUEsSzs7O0FBRVAsTUFBTUMsdUJBQXVCQyxXQUFXO0FBQ3RDLFNBQU8sQ0FBQ0MsUUFBRCxFQUFXQyxNQUFYLEVBQW1CQyxJQUFuQixLQUE0QjtBQUNqQyxRQUFJLENBQUNBLEtBQUtDLFdBQVYsRUFBdUI7QUFDckIsWUFBTSxJQUFJQyxLQUFKLENBQVUsdUJBQVYsQ0FBTixDQURxQixDQUNvQjtBQUMxQztBQUNELFVBQU1DLFVBQVVMLFNBQVNFLEtBQUtHLE9BQWQsQ0FBaEI7QUFDQSxRQUFJLENBQUNBLE9BQUwsRUFBYztBQUNaLFlBQU0sSUFBSUQsS0FBSixDQUFXLEtBQUdGLEtBQUtHLE9BQVEsc0JBQTNCLENBQU47QUFDRDtBQUNELFdBQU9OLFFBQVFNLE9BQVIsRUFBaUJKLE1BQWpCLEVBQXlCQyxJQUF6QixDQUFQO0FBQ0QsR0FURDtBQVVELENBWEQ7O0FBYUEsTUFBTUksTUFBTVIscUJBQXFCLENBQUNPLE9BQUQsRUFBVUosTUFBVixFQUFrQixFQUFDSSxTQUFTRixXQUFWLEVBQWxCLEtBQTZDO0FBQzVFLFFBQU1JLE9BQVEsSUFBRU4sT0FBT08sT0FBUCxDQUFlRCxJQUFLLE1BQUdKLFdBQVksR0FBbkQ7QUFDQSxRQUFNRCxPQUFPLENBQUMsS0FBRCxFQUFRLE1BQVIsRUFBZ0IsR0FBR08sWUFBWUMsUUFBUUwsT0FBUixDQUFaLEVBQThCRSxJQUE5QixDQUFuQixFQUF3RCxTQUF4RCxDQUFiO0FBQ0EsUUFBTUksTUFBTyxXQUFTVCxLQUFLVSxJQUFMLENBQVUsR0FBVixDQUFlLEdBQXJDO0FBQ0FDLFVBQVFDLEdBQVIsQ0FBWUgsR0FBWjtBQUNBZCxRQUFNLFFBQU4sRUFBZ0JLLElBQWhCLEVBQXNCLEVBQUNhLE9BQU8sU0FBUixFQUF0QjtBQUNELENBTlcsQ0FBWjs7QUFRQUMsT0FBT0MsT0FBUCxHQUFpQlgsR0FBakIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7c3Bhd259ID0gcmVxdWlyZSgnY2hpbGRfcHJvY2VzcycpXG5cbmNvbnN0IHNpbmdsZVNlcnZpY2VDb21tYW5kID0gaGFuZGxlciA9PiB7XG4gIHJldHVybiAoc2VydmljZXMsIGNvbmZpZywgYXJncykgPT4ge1xuICAgIGlmICghYXJncy5zZXJ2aWNlTmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBzZXJ2aWNlIG5hbWUgZ2l2ZW4nKSAvLyBsaXN0IHNlcnZpY2UgbmFtZXNcbiAgICB9XG4gICAgY29uc3Qgc2VydmljZSA9IHNlcnZpY2VzW2FyZ3Muc2VydmljZV1cbiAgICBpZiAoIXNlcnZpY2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgXCIke2FyZ3Muc2VydmljZX1cIiAtIG5vIHN1Y2ggc2VydmljZWApXG4gICAgfVxuICAgIHJldHVybiBoYW5kbGVyKHNlcnZpY2UsIGNvbmZpZywgYXJncylcbiAgfVxufVxuXG5jb25zdCBydW4gPSBzaW5nbGVTZXJ2aWNlQ29tbWFuZCgoc2VydmljZSwgY29uZmlnLCB7c2VydmljZTogc2VydmljZU5hbWV9KSA9PiB7XG4gIGNvbnN0IG5hbWUgPSBgJHtjb25maWcucHJvamVjdC5uYW1lfV8ke3NlcnZpY2VOYW1lfWBcbiAgY29uc3QgYXJncyA9IFsncnVuJywgJy0tcm0nLCAuLi5tYWtlUnVuQXJncyhwcmVwYXJlKHNlcnZpY2UpLCBuYW1lKSwgJy9iaW4vc2gnXVxuICBjb25zdCBjbWQgPSBgZG9ja2VyICR7YXJncy5qb2luKCcgJyl9YFxuICBjb25zb2xlLmxvZyhjbWQpXG4gIHNwYXduKCdkb2NrZXInLCBhcmdzLCB7c3RkaW86ICdpbmhlcml0J30pXG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJ1blxuIl19