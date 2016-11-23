function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = require('child_process');

const spawn = _require.spawn;

const R = require('ramda');
const tryHook = require('../try-hook');

const dorcArgs = ['scan', 'poll', 'mode', 'hooks', 'image', 'command' // why is this here? It probably should not be
];

const propTransforms = {
  volumes: (prop, value) => {
    return value.map(v => {
      if (!path.isAbsolute(v)) {
        return ['-v', path.join(process.cwd(), v)];
      }
      return ['-v', value];
    });
  },
  ports: (prop, value) => value.map(v => ['-p', v])
};

const getTransform = prop => {
  const transform = propTransforms[prop];
  if (!transform) {
    return (prop, value) => {
      if (Array.isArray(value)) {
        return value.map(v => ['--' + prop, v]);
      } else {
        return ['--' + prop, value];
      }
    };
  } else {
    return transform;
  }
};

const makeRunArgs = service => {
  const dockerRunProps = R.omit(dorcArgs.concat('serviceName'), service);
  const options = R.toPairs(dockerRunProps).map(([key, value]) => {
    return getTransform(key)(key, value);
  });
  const args = R.flatten([options, service.image, service.command || '']).filter(v => v);
  return args;
};

const startService = service => new Promise((resolve, reject) => {
  return;
  const args = ['run', '-d', ...makeRunArgs(service)];
  console.log(['docker', ...args].join(' '));
  return;
  const p = spawn('docker', args);
  p.stdout.pipe(process.stdout);
  p.stderr.pipe(process.stderr);
  // check ports, resolve
  p.on('close', exitCode => exitCode ? reject() : resolve());
});

const startServices = services => Promise.all(R.map(service => {
  console.log(JSON.stringify(service, null, 2));
  return tryHook('before-up', service, service.serviceName).then(() => startService(service));
}, R.values(services)));

const up = (() => {
  var _ref = _asyncToGenerator(function* (config) {
    const services = config.services;
    yield tryHook('before-up', config.global);
    yield startServices(services);
    console.log('ALL SERVICES UP');
  });

  return function up(_x) {
    return _ref.apply(this, arguments);
  };
})();

module.exports = up;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvY21kcy91cC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwic3Bhd24iLCJSIiwidHJ5SG9vayIsImRvcmNBcmdzIiwicHJvcFRyYW5zZm9ybXMiLCJ2b2x1bWVzIiwicHJvcCIsInZhbHVlIiwibWFwIiwidiIsInBhdGgiLCJpc0Fic29sdXRlIiwiam9pbiIsInByb2Nlc3MiLCJjd2QiLCJwb3J0cyIsImdldFRyYW5zZm9ybSIsInRyYW5zZm9ybSIsIkFycmF5IiwiaXNBcnJheSIsIm1ha2VSdW5BcmdzIiwic2VydmljZSIsImRvY2tlclJ1blByb3BzIiwib21pdCIsImNvbmNhdCIsIm9wdGlvbnMiLCJ0b1BhaXJzIiwia2V5IiwiYXJncyIsImZsYXR0ZW4iLCJpbWFnZSIsImNvbW1hbmQiLCJmaWx0ZXIiLCJzdGFydFNlcnZpY2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImNvbnNvbGUiLCJsb2ciLCJwIiwic3Rkb3V0IiwicGlwZSIsInN0ZGVyciIsIm9uIiwiZXhpdENvZGUiLCJzdGFydFNlcnZpY2VzIiwic2VydmljZXMiLCJhbGwiLCJKU09OIiwic3RyaW5naWZ5Iiwic2VydmljZU5hbWUiLCJ0aGVuIiwidmFsdWVzIiwidXAiLCJjb25maWciLCJnbG9iYWwiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztlQUFnQkEsUUFBUSxlQUFSLEM7O01BQVRDLEssWUFBQUEsSzs7QUFDUCxNQUFNQyxJQUFJRixRQUFRLE9BQVIsQ0FBVjtBQUNBLE1BQU1HLFVBQVVILFFBQVEsYUFBUixDQUFoQjs7QUFFQSxNQUFNSSxXQUFXLENBQ2YsTUFEZSxFQUVmLE1BRmUsRUFHZixNQUhlLEVBSWYsT0FKZSxFQUtmLE9BTGUsRUFNZixTQU5lLENBTUw7QUFOSyxDQUFqQjs7QUFTQSxNQUFNQyxpQkFBaUI7QUFDckJDLFdBQVMsQ0FBQ0MsSUFBRCxFQUFPQyxLQUFQLEtBQWlCO0FBQ3hCLFdBQU9BLE1BQU1DLEdB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T0FBYixDQURQLENBQVA7QUFFRCxDQUo2QyxFQUkzQ3BCLEVBQUVtRCxNQUFGLENBQVNOLFFBQVQsQ0FKMkMsQ0FBWixDQUFsQzs7QUFNQSxNQUFNTztBQUFBLCtCQUFLLFdBQU9DLE1BQVAsRUFBa0I7QUFDM0IsVUFBTVIsV0FBV1EsT0FBT1IsUUFBeEI7QUFDQSxVQUFNNUMsUUFBUSxXQUFSLEVBQXFCb0QsT0FBT0MsTUFBNUIsQ0FBTjtBQUNBLFVBQU1WLGNBQWNDLFFBQWQsQ0FBTjtBQUNBVCxZQUFRQyxHQUFSLENBQVksaUJBQVo7QUFDRCxHQUxLOztBQUFBO0FBQUE7QUFBQTtBQUFBLElBQU47O0FBT0FrQixPQUFPQyxPQUFQLEdBQWlCSixFQUFqQiIsImZpbGUiOiJ1cC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHtzcGF3bn0gPSByZXF1aXJlKCdjaGlsZF9wcm9jZXNzJylcbmNvbnN0IFIgPSByZXF1aXJlKCdyYW1kYScpXG5jb25zdCB0cnlIb29rID0gcmVxdWlyZSgnLi4vdHJ5LWhvb2snKVxuXG5jb25zdCBkb3JjQXJncyA9IFtcbiAgJ3NjYW4nLFxuICAncG9sbCcsXG4gICdtb2RlJyxcbiAgJ2hvb2tzJyxcbiAgJ2ltYWdlJyxcbiAgJ2NvbW1hbmQnIC8vIHdoeSBpcyB0aGlzIGhlcmU/IEl0IHByb2JhYmx5IHNob3VsZCBub3QgYmVcbl1cblxuY29uc3QgcHJvcFRyYW5zZm9ybXMgPSB7XG4gIHZvbHVtZXM6IChwcm9wLCB2YWx1ZSkgPT4ge1xuICAgIHJldHVybiB2YWx1ZS5tYXAodiA9PiB7XG4gICAgICBpZiAoIXBhdGguaXNBYnNvbHV0ZSh2KSkge1xuICAgICAgICByZXR1cm4gWyctdicsIHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCB2KV1cbiAgICAgIH1cbiAgICAgIHJldHVybiBbJy12JywgdmFsdWVdXG4gICAgfSlcbiAgfSxcbiAgcG9ydHM6IChwcm9wLCB2YWx1ZSkgPT4gdmFsdWUubWFwKHYgPT4gWyctcCcsIHZdKVxufVxuXG5jb25zdCBnZXRUcmFuc2Zvcm0gPSBwcm9wID0+IHtcbiAgY29uc3QgdHJhbnNmb3JtID0gcHJvcFRyYW5zZm9ybXNbcHJvcF1cbiAgaWYgKCF0cmFuc2Zvcm0pIHtcbiAgICByZXR1cm4gKHByb3AsIHZhbHVlKSA9PiB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLm1hcCh2ID0+IFsnLS0nICsgcHJvcCwgdl0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gWyctLScgKyBwcm9wLCB2YWx1ZV1cbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRyYW5zZm9ybVxuICB9XG59XG5cbmNvbnN0IG1ha2VSdW5BcmdzID0gc2VydmljZSA9PiB7XG4gIGNvbnN0IGRvY2tlclJ1blByb3BzID0gUi5vbWl0KGRvcmNBcmdzLmNvbmNhdCgnc2VydmljZU5hbWUnKSwgc2VydmljZSlcbiAgY29uc3Qgb3B0aW9ucyA9IFIudG9QYWlycyhkb2NrZXJSdW5Qcm9wcykubWFwKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICByZXR1cm4gZ2V0VHJhbnNmb3JtKGtleSkoa2V5LCB2YWx1ZSlcbiAgfSlcbiAgY29uc3QgYXJncyA9IFIuZmxhdHRlbihbb3B0aW9ucywgc2VydmljZS5pbWFnZSwgc2VydmljZS5jb21tYW5kIHx8ICcnXSlcbiAgICAuZmlsdGVyKHYgPT4gdilcbiAgcmV0dXJuIGFyZ3Ncbn1cblxuY29uc3Qgc3RhcnRTZXJ2aWNlID0gc2VydmljZSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gIHJldHVyblxuICBjb25zdCBhcmdzID0gWydydW4nLCAnLWQnLCAuLi5tYWtlUnVuQXJncyhzZXJ2aWNlKV1cbiAgY29uc29sZS5sb2coWydkb2NrZXInLCAuLi5hcmdzXS5qb2luKCcgJykpXG4gIHJldHVyblxuICBjb25zdCBwID0gc3Bhd24oJ2RvY2tlcicsIGFyZ3MpXG4gIHAuc3Rkb3V0LnBpcGUocHJvY2Vzcy5zdGRvdXQpXG4gIHAuc3RkZXJyLnBpcGUocHJvY2Vzcy5zdGRlcnIpXG4gIC8vIGNoZWNrIHBvcnRzLCByZXNvbHZlXG4gIHAub24oJ2Nsb3NlJywgZXhpdENvZGUgPT4gZXhpdENvZGU/IHJlamVjdCgpOiByZXNvbHZlKCkpXG59KVxuXG5jb25zdCBzdGFydFNlcnZpY2VzID0gc2VydmljZXMgPT4gUHJvbWlzZS5hbGwoUi5tYXAoc2VydmljZSA9PiB7XG4gIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHNlcnZpY2UsIG51bGwsIDIpKVxuICByZXR1cm4gdHJ5SG9vaygnYmVmb3JlLXVwJywgc2VydmljZSwgc2VydmljZS5zZXJ2aWNlTmFtZSlcbiAgICAudGhlbigoKSA9PiBzdGFydFNlcnZpY2Uoc2VydmljZSkpXG59LCBSLnZhbHVlcyhzZXJ2aWNlcykpKVxuXG5jb25zdCB1cCA9IGFzeW5jIChjb25maWcpID0+IHtcbiAgY29uc3Qgc2VydmljZXMgPSBjb25maWcuc2VydmljZXNcbiAgYXdhaXQgdHJ5SG9vaygnYmVmb3JlLXVwJywgY29uZmlnLmdsb2JhbClcbiAgYXdhaXQgc3RhcnRTZXJ2aWNlcyhzZXJ2aWNlcylcbiAgY29uc29sZS5sb2coJ0FMTCBTRVJWSUNFUyBVUCcpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gdXBcbiJdfQ==