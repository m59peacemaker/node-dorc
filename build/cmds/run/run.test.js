const test = require('tape');
const outputFile = require('output-file-sync');

var _require = require('path');

const joinPath = _require.join;

var _require2 = require('child_process');

const exec = _require2.exec,
      execSync = _require2.execSync;


const cmd = require.resolve('../../cmd.js');
const tmpDir = '/tmp/dorc';
const setup = config => {
  outputFile(joinPath(tmpDir, '/dorc.yaml'), config);
};

test('"run {service}" starts the container with default command', t => {
  t.plan(1);
  const config = `
    services:
      foo:
        image: pmkr/hello:1.0
  `;
  setup(config);
  exec(`${ cmd } run foo`, (err, stdout, stderr) => {
    if (err) {
      t.fail(err);
    } else if (stderr === undefined && stdout.trim === 'Hello, World!') {
      t.pass();
    } else {
      console.log('stdout:', stdout);
      console.error('stderr:', stderr);
      t.fail('Wrong output');
    }
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbWRzL3J1bi9ydW4udGVzdC5qcyJdLCJuYW1lcyI6WyJ0ZXN0IiwicmVxdWlyZSIsIm91dHB1dEZpbGUiLCJqb2luUGF0aCIsImpvaW4iLCJleGVjIiwiZXhlY1N5bmMiLCJjbWQiLCJyZXNvbHZlIiwidG1wRGlyIiwic2V0dXAiLCJjb25maWciLCJ0IiwicGxhbiIsImVyciIsInN0ZG91dCIsInN0ZGVyciIsImZhaWwiLCJ1bmRlZmluZWQiLCJ0cmltIiwicGFzcyIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciJdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTUEsT0FBT0MsUUFBUSxNQUFSLENBQWI7QUFDQSxNQUFNQyxhQUFhRCxRQUFRLGtCQUFSLENBQW5COztlQUN5QkEsUUFBUSxNQUFSLEM7O01BQVpFLFEsWUFBTkMsSTs7Z0JBQ2tCSCxRQUFRLGVBQVIsQzs7TUFBbEJJLEksYUFBQUEsSTtNQUFNQyxRLGFBQUFBLFE7OztBQUViLE1BQU1DLE1BQU1OLFFBQVFPLE9BQVIsQ0FBZ0IsY0FBaEIsQ0FBWjtBQUNBLE1BQU1DLFNBQVMsV0FBZjtBQUNBLE1BQU1DLFFBQVFDLFVBQVU7QUFDdEJULGFBQVdDLFNBQVNNLE1BQVQsRUFBaUIsWUFBakIsQ0FBWCxFQUEyQ0UsTUFBM0M7QUFDRCxDQUZEOztBQUlBWCxLQUFLLDJEQUFMLEVBQWtFWSxLQUFLO0FBQ3JFQSxJQUFFQyxJQUFGLENBQU8sQ0FBUDtBQUNBLFFBQU1GLFNBQVU7Ozs7R0FBaEI7QUFLQUQsUUFBTUMsTUFBTjtBQUNBTixPQUFNLElBQUVFLEdBQUksV0FBWixFQUF1QixDQUFDTyxHQUFELEVBQU1DLE1BQU4sRUFBY0MsTUFBZCxLQUF5QjtBQUM5QyxRQUFJRixHQUFKLEVBQVM7QUFDUEYsUUFBRUssSUFBRixDQUFPSCxHQUFQO0FBQ0QsS0FGRCxNQUVPLElBQUlFLFdBQVdFLFNBQVgsSUFBd0JILE9BQU9JLElBQVAsS0FBZ0IsZUFBNUMsRUFBNkQ7QUFDbEVQLFFBQUVRLElBQUY7QUFDRCxLQUZNLE1BRUE7QUFDTEMsY0FBUUMsR0FBUixDQUFZLFNBQVosRUFBdUJQLE1BQXZCO0FBQ0FNLGNBQVFFLEtBQVIsQ0FBYyxTQUFkLEVBQXlCUCxNQUF6QjtBQUNBSixRQUFFSyxJQUFGLENBQU8sY0FBUDtBQUNEO0FBQ0YsR0FWRDtBQVdELENBbkJEIiwiZmlsZSI6InJ1bi50ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgdGVzdCA9IHJlcXVpcmUoJ3RhcGUnKVxuY29uc3Qgb3V0cHV0RmlsZSA9IHJlcXVpcmUoJ291dHB1dC1maWxlLXN5bmMnKVxuY29uc3Qge2pvaW46IGpvaW5QYXRofSA9IHJlcXVpcmUoJ3BhdGgnKVxuY29uc3Qge2V4ZWMsIGV4ZWNTeW5jfSA9IHJlcXVpcmUoJ2NoaWxkX3Byb2Nlc3MnKVxuXG5jb25zdCBjbWQgPSByZXF1aXJlLnJlc29sdmUoJ34vY21kLmpzJylcbmNvbnN0IHRtcERpciA9ICcvdG1wL2RvcmMnXG5jb25zdCBzZXR1cCA9IGNvbmZpZyA9PiB7XG4gIG91dHB1dEZpbGUoam9pblBhdGgodG1wRGlyLCAnL2RvcmMueWFtbCcpLCBjb25maWcpXG59XG5cbnRlc3QoJ1wicnVuIHtzZXJ2aWNlfVwiIHN0YXJ0cyB0aGUgY29udGFpbmVyIHdpdGggZGVmYXVsdCBjb21tYW5kJywgdCA9PiB7XG4gIHQucGxhbigxKVxuICBjb25zdCBjb25maWcgPSBgXG4gICAgc2VydmljZXM6XG4gICAgICBmb286XG4gICAgICAgIGltYWdlOiBwbWtyL2hlbGxvOjEuMFxuICBgXG4gIHNldHVwKGNvbmZpZylcbiAgZXhlYyhgJHtjbWR9IHJ1biBmb29gLCAoZXJyLCBzdGRvdXQsIHN0ZGVycikgPT4ge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIHQuZmFpbChlcnIpXG4gICAgfSBlbHNlIGlmIChzdGRlcnIgPT09IHVuZGVmaW5lZCAmJiBzdGRvdXQudHJpbSA9PT0gJ0hlbGxvLCBXb3JsZCEnKSB7XG4gICAgICB0LnBhc3MoKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygnc3Rkb3V0OicsIHN0ZG91dClcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ3N0ZGVycjonLCBzdGRlcnIpXG4gICAgICB0LmZhaWwoJ1dyb25nIG91dHB1dCcpXG4gICAgfVxuICB9KVxufSlcbiJdfQ==