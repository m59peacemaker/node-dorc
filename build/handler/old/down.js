function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = require('child_process');

const exec = _require.exec;

const R = require('ramda');

var _require2 = require('figures-colored');

const tick = _require2.tick,
      cross = _require2.cross;


const stop = containerName => new Promise((resolve, reject) => {
  exec(`docker stop ${ containerName }`, (err, stdout, stderr) => {
    err ? reject(stderr) : resolve(stdout);
  });
});

const rm = containerName => new Promise((resolve, reject) => {
  exec(`docker rm ${ containerName }`, (err, stdout, stderr) => {
    err ? reject(stderr) : resolve(stdout);
  });
});

const down = (() => {
  var _ref = _asyncToGenerator(function* (services, config) {
    return Promise.all(R.toPairs(services).map(function ([serviceName, service]) {
      const containerName = `${ config.project.name }_${ serviceName }`;
      return stop(containerName, serviceName).then(function () {
        return rm(containerName);
      }).then(function () {
        process.stdout.write(`${ tick } ${ serviceName } is down\n`);
      }).catch(function (err) {
        process.stdout.write(`${ cross } ${ serviceName } - ${ err.trim() }\n`);
      });
    }));
  });

  return function down(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

module.exports = down;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVyL29sZC9kb3duLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJleGVjIiwiUiIsInRpY2siLCJjcm9zcyIsInN0b3AiLCJjb250YWluZXJOYW1lIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJlcnIiLCJzdGRvdXQiLCJzdGRlcnIiLCJybSIsImRvd24iLCJzZXJ2aWNlcyIsImNvbmZpZyIsImFsbCIsInRvUGFpcnMiLCJtYXAiLCJzZXJ2aWNlTmFtZSIsInNlcnZpY2UiLCJwcm9qZWN0IiwibmFtZSIsInRoZW4iLCJwcm9jZXNzIiwid3JpdGUiLCJjYXRjaCIsInRyaW0iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztlQUFlQSxRQUFRLGVBQVIsQzs7TUFBUkMsSSxZQUFBQSxJOztBQUNQLE1BQU1DLElBQUlGLFFBQVEsT0FBUixDQUFWOztnQkFDc0JBLFFBQVEsaUJBQVIsQzs7TUFBZkcsSSxhQUFBQSxJO01BQU1DLEssYUFBQUEsSzs7O0FBRWIsTUFBTUMsT0FBUUMsYUFBRCxJQUFtQixJQUFJQyxPQUFKLENBQVksQ0FBQ0MsT0FBRCxFQUFVQyxNQUFWLEtBQXFCO0FBQy9EUixPQUFNLGdCQUFjSyxhQUFjLEdBQWxDLEVBQXFDLENBQUNJLEdBQUQsRUFBTUMsTUFBTixFQUFjQyxNQUFkLEtBQXlCO0FBQzVERixVQUFNRCxPQUFPRyxNQUFQLENBQU4sR0FBdUJKLFFBQVFHLE1BQVIsQ0FBdkI7QUFDRCxHQUZEO0FBR0QsQ0FKK0IsQ0FBaEM7O0FBTUEsTUFBTUUsS0FBTVAsYUFBRCxJQUFtQixJQUFJQyxPQUFKLENBQVksQ0FBQ0MsT0FBRCxFQUFVQyxNQUFWLEtBQXFCO0FBQzdEUixPQUFNLGNBQVlLLGFBQWMsR0FBaEMsRUFBbUMsQ0FBQ0ksR0FBRCxFQUFNQyxNQUFOLEVBQWNDLE1BQWQsS0FBeUI7QUFDMURGLFVBQU1ELE9BQU9HLE1BQVAsQ0FBTixHQUF1QkosUUFBUUcsTUFBUixDQUF2QjtBQUNELEdBRkQ7QUFHRCxDQUo2QixDQUE5Qjs7QUFNQSxNQUFNRztBQUFBLCtCQUFPLFdBQU9DLFFBQVAsRUFBaUJDLE1BQWpCLEVBQTRCO0FBQ3ZDLFdBQU9ULFFBQVFVLEdBQVIsQ0FBWWYsRUFBRWdCLE9BQUYsQ0FBVUgsUUFBVixFQUFvQkksR0FBcEIsQ0FBd0IsVUFBQyxDQUFDQyxXQUFELEVBQWNDLE9BQWQsQ0FBRCxFQUE0QjtBQUNyRSxZQUFNZixnQkFBaUIsSUFBRVUsT0FBT00sT0FBUCxDQUFlQyxJQUFLLE1BQUdILFdBQVksR0FBNUQ7QUFDQSxhQUFPZixLQUFLQyxhQUFMLEVBQW9CYyxXQUFwQixFQUNKSSxJQURJLENBQ0M7QUFBQSxlQUFNWCxHQUFHUCxhQUFILENBQU47QUFBQSxPQURELEVBRUprQixJQUZJLENBRUMsWUFBTTtBQUNWQyxnQkFBUWQsTUFBUixDQUFlZSxLQUFmLENBQXNCLElBQUV2QixJQUFLLE1BQUdpQixXQUFZLGFBQTVDO0FBQ0QsT0FKSSxFQUtKTyxLQUxJLENBS0UsZUFBTztBQUNaRixnQkFBUWQsTUFBUixDQUFlZSxLQUFmLENBQXNCLElBQUV0QixLQUFNLE1BQUdnQixXQUFZLFFBQUtWLElBQUlrQixJQUFKLEVBQVcsS0FBN0Q7QUFDRCxPQVBJLENBQVA7QUFRRCxLQVZrQixDQUFaLENBQVA7QUFXRCxHQVpLOztBQUFBO0FBQUE7QUFBQTtBQUFBLElBQU47O0FBY0FDLE9BQU9DLE9BQVAsR0FBaUJoQixJQUFqQiIsImZpbGUiOiJkb3duLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qge2V4ZWN9ID0gcmVxdWlyZSgnY2hpbGRfcHJvY2VzcycpXG5jb25zdCBSID0gcmVxdWlyZSgncmFtZGEnKVxuY29uc3Qge3RpY2ssIGNyb3NzfSA9IHJlcXVpcmUoJ2ZpZ3VyZXMtY29sb3JlZCcpXG5cbmNvbnN0IHN0b3AgPSAoY29udGFpbmVyTmFtZSkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICBleGVjKGBkb2NrZXIgc3RvcCAke2NvbnRhaW5lck5hbWV9YCwgKGVyciwgc3Rkb3V0LCBzdGRlcnIpID0+IHtcbiAgICBlcnIgPyByZWplY3Qoc3RkZXJyKSA6IHJlc29sdmUoc3Rkb3V0KVxuICB9KVxufSlcblxuY29uc3Qgcm0gPSAoY29udGFpbmVyTmFtZSkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICBleGVjKGBkb2NrZXIgcm0gJHtjb250YWluZXJOYW1lfWAsIChlcnIsIHN0ZG91dCwgc3RkZXJyKSA9PiB7XG4gICAgZXJyID8gcmVqZWN0KHN0ZGVycikgOiByZXNvbHZlKHN0ZG91dClcbiAgfSlcbn0pXG5cbmNvbnN0IGRvd24gPSBhc3luYyAoc2VydmljZXMsIGNvbmZpZykgPT4ge1xuICByZXR1cm4gUHJvbWlzZS5hbGwoUi50b1BhaXJzKHNlcnZpY2VzKS5tYXAoKFtzZXJ2aWNlTmFtZSwgc2VydmljZV0pID0+IHtcbiAgICBjb25zdCBjb250YWluZXJOYW1lID0gYCR7Y29uZmlnLnByb2plY3QubmFtZX1fJHtzZXJ2aWNlTmFtZX1gXG4gICAgcmV0dXJuIHN0b3AoY29udGFpbmVyTmFtZSwgc2VydmljZU5hbWUpXG4gICAgICAudGhlbigoKSA9PiBybShjb250YWluZXJOYW1lKSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoYCR7dGlja30gJHtzZXJ2aWNlTmFtZX0gaXMgZG93blxcbmApXG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGAke2Nyb3NzfSAke3NlcnZpY2VOYW1lfSAtICR7ZXJyLnRyaW0oKX1cXG5gKVxuICAgICAgfSlcbiAgfSkpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG93blxuIl19