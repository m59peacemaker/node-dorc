var _require = require('child_process');

const exec = _require.exec,
      execSync = _require.execSync;

var _require2 = require('../../test');

const test = _require2.test,
      cmd = _require2.cmd,
      tmpDir = _require2.tmpDir,
      setup = _require2.setup,
      cleanup = _require2.cleanup;


test('"run {service}" runs service with default command', t => {
  t.plan(1);
  const config = `
    services:
      hello:
        image: pmkr/hello:1.0
  `;
  setup(config);
  exec(`${ cmd } run hello`, { cwd: tmpDir }, (err, stdout, stderr) => {
    if (err) {
      t.fail(err);
    } else if (stderr === '' && stdout.split('\n').includes('Hello, World!')) {
      t.pass();
    } else {
      console.log('stdout:', stdout);
      console.error('stderr:', stderr);
      t.fail('Wrong output');
    }
    cleanup();
  });
});

test('"run {service} {cmd}" runs service with {cmd}"', t => {
  t.plan(1);
  const config = `
    services:
      hello:
        image: pmkr/hello:1.0
  `;
  setup(config);
  exec(`${ cmd } run hello Darkness, my old friend`, { cwd: tmpDir }, (err, stdout, stderr) => {
    if (err) {
      t.fail(err);
    } else if (stderr === '' && stdout.split('\n').includes('Hello, Darkness, my old friend')) {
      t.pass();
    } else {
      console.log('stdout:', stdout);
      console.error('stderr:', stderr);
      t.fail('Wrong output');
    }
    cleanup();
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbWRzL3J1bi9ydW4udGVzdC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiZXhlYyIsImV4ZWNTeW5jIiwidGVzdCIsImNtZCIsInRtcERpciIsInNldHVwIiwiY2xlYW51cCIsInQiLCJwbGFuIiwiY29uZmlnIiwiY3dkIiwiZXJyIiwic3Rkb3V0Iiwic3RkZXJyIiwiZmFpbCIsInNwbGl0IiwiaW5jbHVkZXMiLCJwYXNzIiwiY29uc29sZSIsImxvZyIsImVycm9yIl0sIm1hcHBpbmdzIjoiZUFBeUJBLFFBQVEsZUFBUixDOztNQUFsQkMsSSxZQUFBQSxJO01BQU1DLFEsWUFBQUEsUTs7Z0JBT1RGLFFBQVEsWUFBUixDOztNQUxGRyxJLGFBQUFBLEk7TUFDQUMsRyxhQUFBQSxHO01BQ0FDLE0sYUFBQUEsTTtNQUNBQyxLLGFBQUFBLEs7TUFDQUMsTyxhQUFBQSxPOzs7QUFHRkosS0FBSyxtREFBTCxFQUEwREssS0FBSztBQUM3REEsSUFBRUMsSUFBRixDQUFPLENBQVA7QUFDQSxRQUFNQyxTQUFVOzs7O0dBQWhCO0FBS0FKLFFBQU1JLE1BQU47QUFDQVQsT0FBTSxJQUFFRyxHQUFJLGFBQVosRUFBeUIsRUFBQ08sS0FBS04sTUFBTixFQUF6QixFQUF3QyxDQUFDTyxHQUFELEVBQU1DLE1BQU4sRUFBY0MsTUFBZCxLQUF5QjtBQUMvRCxRQUFJRixHQUFKLEVBQVM7QUFDUEosUUFBRU8sSUFBRixDQUFPSCxHQUFQO0FBQ0QsS0FGRCxNQUVPLElBQUlFLFdBQVcsRUFBWCxJQUFpQkQsT0FBT0csS0FBUCxDQUFhLElBQWIsRUFBbUJDLFFBQW5CLENBQTRCLGVBQTVCLENBQXJCLEVBQW1FO0FBQ3hFVCxRQUFFVSxJQUFGO0FBQ0QsS0FGTSxNQUVBO0FBQ0xDLGNBQVFDLEdBQVIsQ0FBWSxTQUFaLEVBQXVCUCxNQUF2QjtBQUNBTSxjQUFRRSxLQUFSLENBQWMsU0FBZCxFQUF5QlAsTUFBekI7QUFDQU4sUUFBRU8sSUFBRixDQUFPLGNBQVA7QUFDRDtBQUNEUjtBQUNELEdBWEQ7QUFZRCxDQXBCRDs7QUFzQkFKLEtBQUssZ0RBQUwsRUFBdURLLEtBQUs7QUFDMURBLElBQUVDLElBQUYsQ0FBTyxDQUFQO0FBQ0EsUUFBTUMsU0FBVTs7OztHQUFoQjtBQUtBSixRQUFNSSxNQUFOO0FBQ0FULE9BQU0sSUFBRUcsR0FBSSxxQ0FBWixFQUFpRCxFQUFDTyxLQUFLTixNQUFOLEVBQWpELEVBQWdFLENBQUNPLEdBQUQsRUFBTUMsTUFBTixFQUFjQyxNQUFkLEtBQXlCO0FBQ3ZGLFFBQUlGLEdBQUosRUFBUztBQUNQSixRQUFFTyxJQUFGLENBQU9ILEdBQVA7QUFDRCxLQUZELE1BRU8sSUFBSUUsV0FBVyxFQUFYLElBQWlCRCxPQUFPRyxLQUFQLENBQWEsSUFBYixFQUFtQkMsUUFBbkIsQ0FBNEIsZ0NBQTVCLENBQXJCLEVBQW9GO0FBQ3pGVCxRQUFFVSxJQUFGO0FBQ0QsS0FGTSxNQUVBO0FBQ0xDLGNBQVFDLEdBQVIsQ0FBWSxTQUFaLEVBQXVCUCxNQUF2QjtBQUNBTSxjQUFRRSxLQUFSLENBQWMsU0FBZCxFQUF5QlAsTUFBekI7QUFDQU4sUUFBRU8sSUFBRixDQUFPLGNBQVA7QUFDRDtBQUNEUjtBQUNELEdBWEQ7QUFZRCxDQXBCRCIsImZpbGUiOiJydW4udGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHtleGVjLCBleGVjU3luY30gPSByZXF1aXJlKCdjaGlsZF9wcm9jZXNzJylcbmNvbnN0IHtcbiAgdGVzdCxcbiAgY21kLFxuICB0bXBEaXIsXG4gIHNldHVwLFxuICBjbGVhbnVwXG59ID0gcmVxdWlyZSgnfi90ZXN0JylcblxudGVzdCgnXCJydW4ge3NlcnZpY2V9XCIgcnVucyBzZXJ2aWNlIHdpdGggZGVmYXVsdCBjb21tYW5kJywgdCA9PiB7XG4gIHQucGxhbigxKVxuICBjb25zdCBjb25maWcgPSBgXG4gICAgc2VydmljZXM6XG4gICAgICBoZWxsbzpcbiAgICAgICAgaW1hZ2U6IHBta3IvaGVsbG86MS4wXG4gIGBcbiAgc2V0dXAoY29uZmlnKVxuICBleGVjKGAke2NtZH0gcnVuIGhlbGxvYCwge2N3ZDogdG1wRGlyfSwgKGVyciwgc3Rkb3V0LCBzdGRlcnIpID0+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0LmZhaWwoZXJyKVxuICAgIH0gZWxzZSBpZiAoc3RkZXJyID09PSAnJyAmJiBzdGRvdXQuc3BsaXQoJ1xcbicpLmluY2x1ZGVzKCdIZWxsbywgV29ybGQhJykpIHtcbiAgICAgIHQucGFzcygpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKCdzdGRvdXQ6Jywgc3Rkb3V0KVxuICAgICAgY29uc29sZS5lcnJvcignc3RkZXJyOicsIHN0ZGVycilcbiAgICAgIHQuZmFpbCgnV3Jvbmcgb3V0cHV0JylcbiAgICB9XG4gICAgY2xlYW51cCgpXG4gIH0pXG59KVxuXG50ZXN0KCdcInJ1biB7c2VydmljZX0ge2NtZH1cIiBydW5zIHNlcnZpY2Ugd2l0aCB7Y21kfVwiJywgdCA9PiB7XG4gIHQucGxhbigxKVxuICBjb25zdCBjb25maWcgPSBgXG4gICAgc2VydmljZXM6XG4gICAgICBoZWxsbzpcbiAgICAgICAgaW1hZ2U6IHBta3IvaGVsbG86MS4wXG4gIGBcbiAgc2V0dXAoY29uZmlnKVxuICBleGVjKGAke2NtZH0gcnVuIGhlbGxvIERhcmtuZXNzLCBteSBvbGQgZnJpZW5kYCwge2N3ZDogdG1wRGlyfSwgKGVyciwgc3Rkb3V0LCBzdGRlcnIpID0+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0LmZhaWwoZXJyKVxuICAgIH0gZWxzZSBpZiAoc3RkZXJyID09PSAnJyAmJiBzdGRvdXQuc3BsaXQoJ1xcbicpLmluY2x1ZGVzKCdIZWxsbywgRGFya25lc3MsIG15IG9sZCBmcmllbmQnKSkge1xuICAgICAgdC5wYXNzKClcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJ3N0ZG91dDonLCBzdGRvdXQpXG4gICAgICBjb25zb2xlLmVycm9yKCdzdGRlcnI6Jywgc3RkZXJyKVxuICAgICAgdC5mYWlsKCdXcm9uZyBvdXRwdXQnKVxuICAgIH1cbiAgICBjbGVhbnVwKClcbiAgfSlcbn0pXG4iXX0=