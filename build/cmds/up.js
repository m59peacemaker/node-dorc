function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = require('child_process');

const exec = _require.exec;

const R = require('ramda');
const path = require('path');
const tryHook = require('../try-hook');
const build = require('./build');

var _require2 = require('figures-colored');

const tick = _require2.tick,
      cross = _require2.cross;

const prefixLines = require('prefix-stream-lines');
const format = require('chalk');
const connectLogs = require('./logs');

const dorcArgs = ['mode', 'hooks', 'image', 'cmd'];

const propTransforms = {
  volumes: value => {
    return value.map(v => {
      if (!path.isAbsolute(v)) {
        return ['-v', path.join(process.cwd(), v)];
      }
      return ['-v', value];
    });
  },
  env: value => R.toPairs(value).map(([k, v]) => ['-e', `${ k }=${ v }`]),
  ports: value => value.map(v => ['-p', v])
};

const getTransform = prop => {
  const transform = propTransforms[prop];
  if (!transform) {
    return (value, prop) => {
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

const makeRunArgs = (service, containerName, detached = false) => {
  const dockerRunProps = R.pipe(() => service, R.omit(dorcArgs), R.assoc('name', containerName), R.toPairs)();
  const options = dockerRunProps.map(([key, value]) => {
    return getTransform(key)(value, key);
  });
  const cmd = R.ifElse(R.isNil, R.F, R.identity)(service.cmd);
  const detachedArg = R.ifElse(R.equals(false), R.identity, R.always('-d'))(detached);
  const args = R.flatten(['-it', detachedArg, options, service.image, cmd]).filter(v => v);
  return args;
};

const startService = (service, containerName, _args) => new Promise((resolve, reject) => {
  const args = ['run', ...makeRunArgs(service, containerName, true)];
  const cmd = `docker ${ args.join(' ') }`;
  process.stdout.write(`  > ${ cmd }\n\n`);
  const p = exec(cmd);
  p.stderr.pipe(process.stderr);
  p.on('close', exitCode => {
    exitCode !== 0 ? reject(exitCode) : resolve();
  });
});

const startServices = (services, config, args) => Promise.all(R.pipe(R.toPairs, R.addIndex(R.map)(([name, service], idx) => {
  const containerName = `${ config.project.name }_${ name }`;
  return tryHook('before-up', service, name).then(() => {
    return startService(service, containerName, args);
  }).then(() => {
    process.stdout.write(`${ tick } ${ name } is up\n`);
  }).catch(err => {
    process.stdout.write(`${ cross } could not start ${ name }\n`);
  });
}))(services));

const prepare = R.over(R.lensProp('image'), R.ifElse(R.is(String), R.identity, R.pipe(R.nth(-1), R.prop('tags'), R.nth(0))));

const up = (() => {
  var _ref = _asyncToGenerator(function* (services, config, args) {
    yield build(services, config);
    return startServices(R.map(prepare)(services), config, args).then(function () {
      if (args.detached !== true) {
        return connectLogs(services, config);
      }
    });
  });

  return function up(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

up.prepare = prepare;
up.makeRunArgs = makeRunArgs;

module.exports = up;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbWRzL3VwLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJleGVjIiwiUiIsInBhdGgiLCJ0cnlIb29rIiwiYnVpbGQiLCJ0aWNrIiwiY3Jvc3MiLCJwcmVmaXhMaW5lcyIsImZvcm1hdCIsImNvbm5lY3RMb2dzIiwiZG9yY0FyZ3MiLCJwcm9wVHJhbnNmb3JtcyIsInZvbHVtZXMiLCJ2YWx1ZSIsIm1hcCIsInYiLCJpc0Fic29sdXRlIiwiam9pbiIsInByb2Nlc3MiLCJjd2QiLCJlbnYiLCJ0b1BhaXJzIiwiayIsInBvcnRzIiwiZ2V0VHJhbnNmb3JtIiwicHJvcCIsInRyYW5zZm9ybSIsIkFycmF5IiwiaXNBcnJheSIsIm1ha2VSdW5BcmdzIiwic2VydmljZSIsImNvbnRhaW5lck5hbWUiLCJkZXRhY2hlZCIsImRvY2tlclJ1blByb3BzIiwicGlwZSIsIm9taXQiLCJhc3NvYyIsIm9wdGlvbnMiLCJrZXkiLCJjbWQiLCJpZkVsc2UiLCJpc05pbCIsIkYiLCJpZGVudGl0eSIsImRldGFjaGVkQXJnIiwiZXF1YWxzIiwiYWx3YXlzIiwiYXJncyIsImZsYXR0ZW4iLCJpbWFnZSIsImZpbHRlciIsInN0YXJ0U2VydmljZSIsIl9hcmdzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzdGRvdXQiLCJ3cml0ZSIsInAiLCJzdGRlcnIiLCJvbiIsImV4aXRDb2RlIiwic3RhcnRTZXJ2aWNlcyIsInNlcnZpY2VzIiwiY29uZmlnIiwiYWxsIiwiYWRkSW5kZXgiLCJuYW1lIiwiaWR4IiwicHJvamVjdCIsInRoZW4iLCJjYXRjaCIsImVyciIsInByZXBhcmUiLCJvdmVyIiwibGVuc1Byb3AiLCJpcyIsIlN0cmluZyIsIm50aCIsInVwIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7ZUFBZUEsUUFBUSxlQUFSLEM7O01BQVJDLEksWUFBQUEsSTs7QUFDUCxNQUFNQyxJQUFJRixRQUFRLE9BQVIsQ0FBVjtBQUNBLE1BQU1HLE9B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dUIsSUFESSxDQUNDLFlBQU07QUFDVixVQUFJdkIsS0FBS2YsUUFBTCxLQUFrQixJQUF0QixFQUE0QjtBQUMxQixlQUFPdkIsWUFBWXNELFFBQVosRUFBc0JDLE1BQXRCLENBQVA7QUFDRDtBQUNGLEtBTEksQ0FBUDtBQU1ELEdBUks7O0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFBTjs7QUFVQWUsR0FBR04sT0FBSCxHQUFhQSxPQUFiO0FBQ0FNLEdBQUdsRCxXQUFILEdBQWlCQSxXQUFqQjs7QUFFQW1ELE9BQU9DLE9BQVAsR0FBaUJGLEVBQWpCIiwiZmlsZSI6InVwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qge2V4ZWN9ID0gcmVxdWlyZSgnY2hpbGRfcHJvY2VzcycpXG5jb25zdCBSID0gcmVxdWlyZSgncmFtZGEnKVxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuY29uc3QgdHJ5SG9vayA9IHJlcXVpcmUoJy4uL3RyeS1ob29rJylcbmNvbnN0IGJ1aWxkID0gcmVxdWlyZSgnLi9idWlsZCcpXG5jb25zdCB7dGljaywgY3Jvc3N9ID0gcmVxdWlyZSgnZmlndXJlcy1jb2xvcmVkJylcbmNvbnN0IHByZWZpeExpbmVzID0gcmVxdWlyZSgncHJlZml4LXN0cmVhbS1saW5lcycpXG5jb25zdCBmb3JtYXQgPSByZXF1aXJlKCdjaGFsaycpXG5jb25zdCBjb25uZWN0TG9ncyA9IHJlcXVpcmUoJy4vbG9ncycpXG5cbmNvbnN0IGRvcmNBcmdzID0gW1xuICAnbW9kZScsXG4gICdob29rcycsXG4gICdpbWFnZScsXG4gICdjbWQnXG5dXG5cbmNvbnN0IHByb3BUcmFuc2Zvcm1zID0ge1xuICB2b2x1bWVzOiB2YWx1ZSA9PiB7XG4gICAgcmV0dXJuIHZhbHVlLm1hcCh2ID0+IHtcbiAgICAgIGlmICghcGF0aC5pc0Fic29sdXRlKHYpKSB7XG4gICAgICAgIHJldHVybiBbJy12JywgcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIHYpXVxuICAgICAgfVxuICAgICAgcmV0dXJuIFsnLXYnLCB2YWx1ZV1cbiAgICB9KVxuICB9LFxuICBlbnY6IHZhbHVlID0+IFIudG9QYWlycyh2YWx1ZSkubWFwKChbaywgdl0pID0+IFsnLWUnLCBgJHtrfT0ke3Z9YF0pLFxuICBwb3J0czogdmFsdWUgPT4gdmFsdWUubWFwKHYgPT4gWyctcCcsIHZdKVxufVxuXG5jb25zdCBnZXRUcmFuc2Zvcm0gPSBwcm9wID0+IHtcbiAgY29uc3QgdHJhbnNmb3JtID0gcHJvcFRyYW5zZm9ybXNbcHJvcF1cbiAgaWYgKCF0cmFuc2Zvcm0pIHtcbiAgICByZXR1cm4gKHZhbHVlLCBwcm9wKSA9PiB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLm1hcCh2ID0+IFsnLS0nICsgcHJvcCwgdl0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gWyctLScgKyBwcm9wLCB2YWx1ZV1cbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRyYW5zZm9ybVxuICB9XG59XG5cbmNvbnN0IG1ha2VSdW5BcmdzID0gKHNlcnZpY2UsIGNvbnRhaW5lck5hbWUsIGRldGFjaGVkID0gZmFsc2UpID0+IHtcbiAgY29uc3QgZG9ja2VyUnVuUHJvcHMgPSBSLnBpcGUoXG4gICAgKCkgPT4gc2VydmljZSxcbiAgICBSLm9taXQoZG9yY0FyZ3MpLFxuICAgIFIuYXNzb2MoJ25hbWUnLCBjb250YWluZXJOYW1lKSxcbiAgICBSLnRvUGFpcnNcbiAgKSgpXG4gIGNvbnN0IG9wdGlvbnMgPSBkb2NrZXJSdW5Qcm9wcy5tYXAoKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgIHJldHVybiBnZXRUcmFuc2Zvcm0oa2V5KSh2YWx1ZSwga2V5KVxuICB9KVxuICBjb25zdCBjbWQgPSBSLmlmRWxzZShSLmlzTmlsLCBSLkYsIFIuaWRlbnRpdHkpKHNlcnZpY2UuY21kKVxuICBjb25zdCBkZXRhY2hlZEFyZyA9IFIuaWZFbHNlKFIuZXF1YWxzKGZhbHNlKSwgUi5pZGVudGl0eSwgUi5hbHdheXMoJy1kJykpKGRldGFjaGVkKVxuICBjb25zdCBhcmdzID0gUi5mbGF0dGVuKFsnLWl0JywgZGV0YWNoZWRBcmcsIG9wdGlvbnMsIHNlcnZpY2UuaW1hZ2UsIGNtZF0pXG4gICAgLmZpbHRlcih2ID0+IHYpXG4gIHJldHVybiBhcmdzXG59XG5cbmNvbnN0IHN0YXJ0U2VydmljZSA9IChzZXJ2aWNlLCBjb250YWluZXJOYW1lLCBfYXJncykgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICBjb25zdCBhcmdzID0gWydydW4nLCAuLi5tYWtlUnVuQXJncyhzZXJ2aWNlLCBjb250YWluZXJOYW1lLCB0cnVlKV1cbiAgY29uc3QgY21kID0gYGRvY2tlciAke2FyZ3Muam9pbignICcpfWBcbiAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoYCAgPiAke2NtZH1cXG5cXG5gKVxuICBjb25zdCBwID0gZXhlYyhjbWQpXG4gIHAuc3RkZXJyLnBpcGUocHJvY2Vzcy5zdGRlcnIpXG4gIHAub24oJ2Nsb3NlJywgZXhpdENvZGUgPT4ge1xuICAgIGV4aXRDb2RlICE9PSAwID8gcmVqZWN0KGV4aXRDb2RlKSA6IHJlc29sdmUoKVxuICB9KVxufSlcblxuY29uc3Qgc3RhcnRTZXJ2aWNlcyA9IChzZXJ2aWNlcywgY29uZmlnLCBhcmdzKSA9PiBQcm9taXNlLmFsbChSLnBpcGUoXG4gIFIudG9QYWlycyxcbiAgUi5hZGRJbmRleChSLm1hcCkoKFtuYW1lLCBzZXJ2aWNlXSwgaWR4KSA9PiB7XG4gICAgY29uc3QgY29udGFpbmVyTmFtZSA9IGAke2NvbmZpZy5wcm9qZWN0Lm5hbWV9XyR7bmFtZX1gXG4gICAgcmV0dXJuIHRyeUhvb2soJ2JlZm9yZS11cCcsIHNlcnZpY2UsIG5hbWUpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHJldHVybiBzdGFydFNlcnZpY2Uoc2VydmljZSwgY29udGFpbmVyTmFtZSwgYXJncylcbiAgICAgIH0pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGAke3RpY2t9ICR7bmFtZX0gaXMgdXBcXG5gKVxuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShgJHtjcm9zc30gY291bGQgbm90IHN0YXJ0ICR7bmFtZX1cXG5gKVxuICAgICAgfSlcbiAgfSlcbikoc2VydmljZXMpKVxuXG5jb25zdCBwcmVwYXJlID0gUi5vdmVyKFxuICBSLmxlbnNQcm9wKCdpbWFnZScpLFxuICBSLmlmRWxzZShcbiAgICBSLmlzKFN0cmluZyksXG4gICAgUi5pZGVudGl0eSxcbiAgICBSLnBpcGUoXG4gICAgICBSLm50aCgtMSksXG4gICAgICBSLnByb3AoJ3RhZ3MnKSxcbiAgICAgIFIubnRoKDApXG4gICAgKVxuICApXG4pXG5cbmNvbnN0IHVwID0gYXN5bmMgKHNlcnZpY2VzLCBjb25maWcsIGFyZ3MpID0+IHtcbiAgYXdhaXQgYnVpbGQoc2VydmljZXMsIGNvbmZpZylcbiAgcmV0dXJuIHN0YXJ0U2VydmljZXMoUi5tYXAocHJlcGFyZSkoc2VydmljZXMpLCBjb25maWcsIGFyZ3MpXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgaWYgKGFyZ3MuZGV0YWNoZWQgIT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIGNvbm5lY3RMb2dzKHNlcnZpY2VzLCBjb25maWcpXG4gICAgICB9XG4gICAgfSlcbn1cblxudXAucHJlcGFyZSA9IHByZXBhcmVcbnVwLm1ha2VSdW5BcmdzID0gbWFrZVJ1bkFyZ3NcblxubW9kdWxlLmV4cG9ydHMgPSB1cFxuIl19