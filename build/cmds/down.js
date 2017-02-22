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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbWRzL2Rvd24uanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImV4ZWMiLCJSIiwidGljayIsImNyb3NzIiwic3RvcCIsImNvbnRhaW5lck5hbWUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImVyciIsInN0ZG91dCIsInN0ZGVyciIsInJtIiwiZG93biIsInNlcnZpY2VzIiwiY29uZmlnIiwiYWxsIiwidG9QYWlycyIsIm1hcCIsInNlcnZpY2VOYW1lIiwic2VydmljZSIsInByb2plY3QiLCJuYW1lIiwidGhlbiIsInByb2Nlc3MiLCJ3cml0ZSIsImNhdGNoIiwidHJpbSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O2VBQWVBLFFBQVEsZUFBUixDOztNQUFSQyxJLFlBQUFBLEk7O0FBQ1AsTUFBTUMsSUFBSUYsUUFBUSxPQUFSLENBQVY7O2dCQUNzQkEsUUFBUSxpQkFBUixDOztNQUFmRyxJLGFBQUFBLEk7TUFBTUMsSyxhQUFBQSxLOzs7QUFFYixNQUFNQyxPQUFRQyxhQUFELElBQW1CLElBQUlDLE9BQUosQ0FBWSxDQUFDQyxPQUFELEVBQVVDLE1BQVYsS0FBcUI7QUFDL0RSLE9BQU0sZ0JBQWNLLGFBQWMsR0FBbEMsRUFBcUMsQ0FBQ0ksR0FBRCxFQUFNQyxNQUFOLEVBQWNDLE1BQWQsS0FBeUI7QUFDNURGLFVBQU1ELE9BQU9HLE1BQVAsQ0FBTixHQUF1QkosUUFBUUcsTUFBUixDQUF2QjtBQUNELEdBRkQ7QUFHRCxDQUorQixDQUFoQzs7QUFNQSxNQUFNRSxLQUFNUCxhQUFELElBQW1CLElBQUlDLE9BQUosQ0FBWSxDQUFDQyxPQUFELEVBQVVDLE1BQVYsS0FBcUI7QUFDN0RSLE9BQU0sY0FBWUssYUFBYyxHQUFoQyxFQUFtQyxDQUFDSSxHQUFELEVBQU1DLE1BQU4sRUFBY0MsTUFBZCxLQUF5QjtBQUMxREYsVUFBTUQsT0FBT0csTUFBUCxDQUFOLEdBQXVCSixRQUFRRyxNQUFSLENBQXZCO0FBQ0QsR0FGRDtBQUdELENBSjZCLENBQTlCOztBQU1BLE1BQU1HO0FBQUEsK0JBQU8sV0FBT0MsUUFBUCxFQUFpQkMsTUFBakIsRUFBNEI7QUFDdkMsV0FBT1QsUUFBUVUsR0FBUixDQUFZZixFQUFFZ0IsT0FBRixDQUFVSCxRQUFWLEVBQW9CSSxHQUFwQixDQUF3QixVQUFDLENBQUNDLFdBQUQsRUFBY0MsT0FBZCxDQUFELEVBQTRCO0FBQ3JFLFlBQU1mLGdCQUFpQixJQUFFVSxPQUFPTSxPQUFQLENBQWVDLElBQUssTUFBR0gsV0FBWSxHQUE1RDtBQUNBLGFBQU9mLEtBQUtDLGFBQUwsRUFBb0JjLFdBQXBCLEVBQ0pJLElBREksQ0FDQztBQUFBLGVBQU1YLEdBQUdQLGFBQUgsQ0FBTjtBQUFBLE9BREQsRUFFSmtCLElBRkksQ0FFQyxZQUFNO0FBQ1ZDLGdCQUFRZCxNQUFSLENBQWVlLEtBQWYsQ0FBc0IsSUFBRXZCLElBQUssTUFBR2lCLFdBQVksYUFBNUM7QUFDRCxPQUpJLEVBS0pPLEtBTEksQ0FLRSxlQUFPO0FBQ1pGLGdCQUFRZCxNQUFSLENBQWVlLEtBQWYsQ0FBc0IsSUFBRXRCLEtBQU0sTUFBR2dCLFdBQVksUUFBS1YsSUFBSWtCLElBQUosRUFBVyxLQUE3RDtBQUNELE9BUEksQ0FBUDtBQVFELEtBVmtCLENBQVosQ0FBUDtBQVdELEdBWks7O0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFBTjs7QUFjQUMsT0FBT0MsT0FBUCxHQUFpQmhCLElBQWpCIiwiZmlsZSI6ImRvd24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7ZXhlY30gPSByZXF1aXJlKCdjaGlsZF9wcm9jZXNzJylcbmNvbnN0IFIgPSByZXF1aXJlKCdyYW1kYScpXG5jb25zdCB7dGljaywgY3Jvc3N9ID0gcmVxdWlyZSgnZmlndXJlcy1jb2xvcmVkJylcblxuY29uc3Qgc3RvcCA9IChjb250YWluZXJOYW1lKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gIGV4ZWMoYGRvY2tlciBzdG9wICR7Y29udGFpbmVyTmFtZX1gLCAoZXJyLCBzdGRvdXQsIHN0ZGVycikgPT4ge1xuICAgIGVyciA/IHJlamVjdChzdGRlcnIpIDogcmVzb2x2ZShzdGRvdXQpXG4gIH0pXG59KVxuXG5jb25zdCBybSA9IChjb250YWluZXJOYW1lKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gIGV4ZWMoYGRvY2tlciBybSAke2NvbnRhaW5lck5hbWV9YCwgKGVyciwgc3Rkb3V0LCBzdGRlcnIpID0+IHtcbiAgICBlcnIgPyByZWplY3Qoc3RkZXJyKSA6IHJlc29sdmUoc3Rkb3V0KVxuICB9KVxufSlcblxuY29uc3QgZG93biA9IGFzeW5jIChzZXJ2aWNlcywgY29uZmlnKSA9PiB7XG4gIHJldHVybiBQcm9taXNlLmFsbChSLnRvUGFpcnMoc2VydmljZXMpLm1hcCgoW3NlcnZpY2VOYW1lLCBzZXJ2aWNlXSkgPT4ge1xuICAgIGNvbnN0IGNvbnRhaW5lck5hbWUgPSBgJHtjb25maWcucHJvamVjdC5uYW1lfV8ke3NlcnZpY2VOYW1lfWBcbiAgICByZXR1cm4gc3RvcChjb250YWluZXJOYW1lLCBzZXJ2aWNlTmFtZSlcbiAgICAgIC50aGVuKCgpID0+IHJtKGNvbnRhaW5lck5hbWUpKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShgJHt0aWNrfSAke3NlcnZpY2VOYW1lfSBpcyBkb3duXFxuYClcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoYCR7Y3Jvc3N9ICR7c2VydmljZU5hbWV9IC0gJHtlcnIudHJpbSgpfVxcbmApXG4gICAgICB9KVxuICB9KSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb3duXG4iXX0=