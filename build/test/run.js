const test = require('tape');
const outputFile = require('output-file-sync');

var _require = require('path');

const joinPath = _require.join;

var _require2 = require('child_process');

const exec = _require2.exec,
      execSync = _require2.execSync;

const cmd = require.resolve('../cmd.js');
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
    if (stderr === undefined && stdout.trim === 'Hello, World!') {
      t.pass();
    } else {
      console.log('stdout:', stdout);
      console.error('stderr:', stderr);
      t.fail('Wrong output');
    }
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L3J1bi5qcyJdLCJuYW1lcyI6WyJ0ZXN0IiwicmVxdWlyZSIsIm91dHB1dEZpbGUiLCJqb2luUGF0aCIsImpvaW4iLCJleGVjIiwiZXhlY1N5bmMiLCJjbWQiLCJyZXNvbHZlIiwidG1wRGlyIiwic2V0dXAiLCJjb25maWciLCJ0IiwicGxhbiIsImVyciIsInN0ZG91dCIsInN0ZGVyciIsInVuZGVmaW5lZCIsInRyaW0iLCJwYXNzIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwiZmFpbCJdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTUEsT0FBT0MsUUFBUSxNQUFSLENBQWI7QUFDQSxNQUFNQyxhQUFhRCxRQUFRLGtCQUFSLENBQW5COztlQUN5QkEsUUFBUSxNQUFSLEM7O01BQVpFLFEsWUFBTkMsSTs7Z0JBQ2tCSCxRQUFRLGVBQVIsQzs7TUFBbEJJLEksYUFBQUEsSTtNQUFNQyxRLGFBQUFBLFE7O0FBQ2IsTUFBTUMsTUFBTU4sUUFBUU8sT0FBUixDQUFnQixXQUFoQixDQUFaO0FBQ0EsTUFBTUMsU0FBUyxXQUFmO0FBQ0EsTUFBTUMsUUFBUUMsVUFBVTtBQUN0QlQsYUFBV0MsU0FBU00sTUFBVCxFQUFpQixZQUFqQixDQUFYLEVBQTJDRSxNQUEzQztBQUNELENBRkQ7QUFHQVgsS0FBSywyREFBTCxFQUFrRVksS0FBSztBQUNyRUEsSUFBRUMsSUFBRixDQUFPLENBQVA7QUFDQSxRQUFNRixTQUFVOzs7O0dBQWhCO0FBS0FELFFBQU1DLE1BQU47QUFDQU4sT0FBTSxJQUFFRSxHQUFJLFdBQVosRUFBdUIsQ0FBQ08sR0FBRCxFQUFNQyxNQUFOLEVBQWNDLE1BQWQsS0FBeUI7QUFDOUMsUUFBSUEsV0FBV0MsU0FBWCxJQUF3QkYsT0FBT0csSUFBUCxLQUFnQixlQUE1QyxFQUE2RDtBQUMzRE4sUUFBRU8sSUFBRjtBQUNELEtBRkQsTUFFTztBQUNMQyxjQUFRQyxHQUFSLENBQVksU0FBWixFQUF1Qk4sTUFBdkI7QUFDQUssY0FBUUUsS0FBUixDQUFjLFNBQWQsRUFBeUJOLE1BQXpCO0FBQ0FKLFFBQUVXLElBQUYsQ0FBTyxjQUFQO0FBQ0Q7QUFDRixHQVJEO0FBU0QsQ0FqQkQiLCJmaWxlIjoicnVuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgdGVzdCA9IHJlcXVpcmUoJ3RhcGUnKVxuY29uc3Qgb3V0cHV0RmlsZSA9IHJlcXVpcmUoJ291dHB1dC1maWxlLXN5bmMnKVxuY29uc3Qge2pvaW46IGpvaW5QYXRofSA9IHJlcXVpcmUoJ3BhdGgnKVxuY29uc3Qge2V4ZWMsIGV4ZWNTeW5jfSA9IHJlcXVpcmUoJ2NoaWxkX3Byb2Nlc3MnKVxuY29uc3QgY21kID0gcmVxdWlyZS5yZXNvbHZlKCcuLi9jbWQuanMnKVxuY29uc3QgdG1wRGlyID0gJy90bXAvZG9yYydcbmNvbnN0IHNldHVwID0gY29uZmlnID0+IHtcbiAgb3V0cHV0RmlsZShqb2luUGF0aCh0bXBEaXIsICcvZG9yYy55YW1sJyksIGNvbmZpZylcbn1cbnRlc3QoJ1wicnVuIHtzZXJ2aWNlfVwiIHN0YXJ0cyB0aGUgY29udGFpbmVyIHdpdGggZGVmYXVsdCBjb21tYW5kJywgdCA9PiB7XG4gIHQucGxhbigxKVxuICBjb25zdCBjb25maWcgPSBgXG4gICAgc2VydmljZXM6XG4gICAgICBmb286XG4gICAgICAgIGltYWdlOiBwbWtyL2hlbGxvOjEuMFxuICBgXG4gIHNldHVwKGNvbmZpZylcbiAgZXhlYyhgJHtjbWR9IHJ1biBmb29gLCAoZXJyLCBzdGRvdXQsIHN0ZGVycikgPT4ge1xuICAgIGlmIChzdGRlcnIgPT09IHVuZGVmaW5lZCAmJiBzdGRvdXQudHJpbSA9PT0gJ0hlbGxvLCBXb3JsZCEnKSB7XG4gICAgICB0LnBhc3MoKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygnc3Rkb3V0OicsIHN0ZG91dClcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ3N0ZGVycjonLCBzdGRlcnIpXG4gICAgICB0LmZhaWwoJ1dyb25nIG91dHB1dCcpXG4gICAgfVxuICB9KVxufSlcbiJdfQ==