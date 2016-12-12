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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvY21kcy91cC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiZXhlYyIsIlIiLCJwYXRoIiwidHJ5SG9vayIsImJ1aWxkIiwidGljayIsImNyb3NzIiwicHJlZml4TGluZXMiLCJmb3JtYXQiLCJjb25uZWN0TG9ncyIsImRvcmNBcmdzIiwicHJvcFRyYW5zZm9ybXMiLCJ2b2x1bWVzIiwidmFsdWUiLCJtYXAiLCJ2IiwiaXNBYnNvbHV0ZSIsImpvaW4iLCJwcm9jZXNzIiwiY3dkIiwiZW52IiwidG9QYWlycyIsImsiLCJwb3J0cyIsImdldFRyYW5zZm9ybSIsInByb3AiLCJ0cmFuc2Zvcm0iLCJBcnJheSIsImlzQXJyYXkiLCJtYWtlUnVuQXJncyIsInNlcnZpY2UiLCJjb250YWluZXJOYW1lIiwiZGV0YWNoZWQiLCJkb2NrZXJSdW5Qcm9wcyIsInBpcGUiLCJvbWl0IiwiYXNzb2MiLCJvcHRpb25zIiwia2V5IiwiY21kIiwiaWZFbHNlIiwiaXNOaWwiLCJGIiwiaWRlbnRpdHkiLCJkZXRhY2hlZEFyZyIsImVxdWFscyIsImFsd2F5cyIsImFyZ3MiLCJmbGF0dGVuIiwiaW1hZ2UiLCJmaWx0ZXIiLCJzdGFydFNlcnZpY2UiLCJfYXJncyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic3Rkb3V0Iiwid3JpdGUiLCJwIiwic3RkZXJyIiwib24iLCJleGl0Q29kZSIsInN0YXJ0U2VydmljZXMiLCJzZXJ2aWNlcyIsImNvbmZpZyIsImFsbCIsImFkZEluZGV4IiwibmFtZSIsImlkeCIsInByb2plY3QiLCJ0aGVuIiwiY2F0Y2giLCJlcnIiLCJwcmVwYXJlIiwib3ZlciIsImxlbnNQcm9wIiwiaXMiLCJTdHJpbmciLCJudGgiLCJ1cCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O2VBQWVBLFFBQVEsZUFBUixDOztNQUFSQyxJLFlBQUFBLEk7O0FBQ1AsTUFBTUMsSUFBSUYsUUFBUSxPQUFSLENBQVY7QUFDQSxN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aEQsRUFDSnVCLElBREksQ0FDQyxZQUFNO0FBQ1YsVUFBSXZCLEtBQUtmLFFBQUwsS0FBa0IsSUFBdEIsRUFBNEI7QUFDMUIsZUFBT3ZCLFlBQVlzRCxRQUFaLEVBQXNCQyxNQUF0QixDQUFQO0FBQ0Q7QUFDRixLQUxJLENBQVA7QUFNRCxHQVJLOztBQUFBO0FBQUE7QUFBQTtBQUFBLElBQU47O0FBVUFlLEdBQUdOLE9BQUgsR0FBYUEsT0FBYjtBQUNBTSxHQUFHbEQsV0FBSCxHQUFpQkEsV0FBakI7O0FBRUFtRCxPQUFPQyxPQUFQLEdBQWlCRixFQUFqQiIsImZpbGUiOiJ1cC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHtleGVjfSA9IHJlcXVpcmUoJ2NoaWxkX3Byb2Nlc3MnKVxuY29uc3QgUiA9IHJlcXVpcmUoJ3JhbWRhJylcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbmNvbnN0IHRyeUhvb2sgPSByZXF1aXJlKCcuLi90cnktaG9vaycpXG5jb25zdCBidWlsZCA9IHJlcXVpcmUoJy4vYnVpbGQnKVxuY29uc3Qge3RpY2ssIGNyb3NzfSA9IHJlcXVpcmUoJ2ZpZ3VyZXMtY29sb3JlZCcpXG5jb25zdCBwcmVmaXhMaW5lcyA9IHJlcXVpcmUoJ3ByZWZpeC1zdHJlYW0tbGluZXMnKVxuY29uc3QgZm9ybWF0ID0gcmVxdWlyZSgnY2hhbGsnKVxuY29uc3QgY29ubmVjdExvZ3MgPSByZXF1aXJlKCcuL2xvZ3MnKVxuXG5jb25zdCBkb3JjQXJncyA9IFtcbiAgJ21vZGUnLFxuICAnaG9va3MnLFxuICAnaW1hZ2UnLFxuICAnY21kJ1xuXVxuXG5jb25zdCBwcm9wVHJhbnNmb3JtcyA9IHtcbiAgdm9sdW1lczogdmFsdWUgPT4ge1xuICAgIHJldHVybiB2YWx1ZS5tYXAodiA9PiB7XG4gICAgICBpZiAoIXBhdGguaXNBYnNvbHV0ZSh2KSkge1xuICAgICAgICByZXR1cm4gWyctdicsIHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCB2KV1cbiAgICAgIH1cbiAgICAgIHJldHVybiBbJy12JywgdmFsdWVdXG4gICAgfSlcbiAgfSxcbiAgZW52OiB2YWx1ZSA9PiBSLnRvUGFpcnModmFsdWUpLm1hcCgoW2ssIHZdKSA9PiBbJy1lJywgYCR7a309JHt2fWBdKSxcbiAgcG9ydHM6IHZhbHVlID0+IHZhbHVlLm1hcCh2ID0+IFsnLXAnLCB2XSlcbn1cblxuY29uc3QgZ2V0VHJhbnNmb3JtID0gcHJvcCA9PiB7XG4gIGNvbnN0IHRyYW5zZm9ybSA9IHByb3BUcmFuc2Zvcm1zW3Byb3BdXG4gIGlmICghdHJhbnNmb3JtKSB7XG4gICAgcmV0dXJuICh2YWx1ZSwgcHJvcCkgPT4ge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS5tYXAodiA9PiBbJy0tJyArIHByb3AsIHZdKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFsnLS0nICsgcHJvcCwgdmFsdWVdXG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiB0cmFuc2Zvcm1cbiAgfVxufVxuXG5jb25zdCBtYWtlUnVuQXJncyA9IChzZXJ2aWNlLCBjb250YWluZXJOYW1lLCBkZXRhY2hlZCA9IGZhbHNlKSA9PiB7XG4gIGNvbnN0IGRvY2tlclJ1blByb3BzID0gUi5waXBlKFxuICAgICgpID0+IHNlcnZpY2UsXG4gICAgUi5vbWl0KGRvcmNBcmdzKSxcbiAgICBSLmFzc29jKCduYW1lJywgY29udGFpbmVyTmFtZSksXG4gICAgUi50b1BhaXJzXG4gICkoKVxuICBjb25zdCBvcHRpb25zID0gZG9ja2VyUnVuUHJvcHMubWFwKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICByZXR1cm4gZ2V0VHJhbnNmb3JtKGtleSkodmFsdWUsIGtleSlcbiAgfSlcbiAgY29uc3QgY21kID0gUi5pZkVsc2UoUi5pc05pbCwgUi5GLCBSLmlkZW50aXR5KShzZXJ2aWNlLmNtZClcbiAgY29uc3QgZGV0YWNoZWRBcmcgPSBSLmlmRWxzZShSLmVxdWFscyhmYWxzZSksIFIuaWRlbnRpdHksIFIuYWx3YXlzKCctZCcpKShkZXRhY2hlZClcbiAgY29uc3QgYXJncyA9IFIuZmxhdHRlbihbJy1pdCcsIGRldGFjaGVkQXJnLCBvcHRpb25zLCBzZXJ2aWNlLmltYWdlLCBjbWRdKVxuICAgIC5maWx0ZXIodiA9PiB2KVxuICByZXR1cm4gYXJnc1xufVxuXG5jb25zdCBzdGFydFNlcnZpY2UgPSAoc2VydmljZSwgY29udGFpbmVyTmFtZSwgX2FyZ3MpID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgY29uc3QgYXJncyA9IFsncnVuJywgLi4ubWFrZVJ1bkFyZ3Moc2VydmljZSwgY29udGFpbmVyTmFtZSwgdHJ1ZSldXG4gIGNvbnN0IGNtZCA9IGBkb2NrZXIgJHthcmdzLmpvaW4oJyAnKX1gXG4gIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGAgID4gJHtjbWR9XFxuXFxuYClcbiAgY29uc3QgcCA9IGV4ZWMoY21kKVxuICBwLnN0ZGVyci5waXBlKHByb2Nlc3Muc3RkZXJyKVxuICBwLm9uKCdjbG9zZScsIGV4aXRDb2RlID0+IHtcbiAgICBleGl0Q29kZSAhPT0gMCA/IHJlamVjdChleGl0Q29kZSkgOiByZXNvbHZlKClcbiAgfSlcbn0pXG5cbmNvbnN0IHN0YXJ0U2VydmljZXMgPSAoc2VydmljZXMsIGNvbmZpZywgYXJncykgPT4gUHJvbWlzZS5hbGwoUi5waXBlKFxuICBSLnRvUGFpcnMsXG4gIFIuYWRkSW5kZXgoUi5tYXApKChbbmFtZSwgc2VydmljZV0sIGlkeCkgPT4ge1xuICAgIGNvbnN0IGNvbnRhaW5lck5hbWUgPSBgJHtjb25maWcucHJvamVjdC5uYW1lfV8ke25hbWV9YFxuICAgIHJldHVybiB0cnlIb29rKCdiZWZvcmUtdXAnLCBzZXJ2aWNlLCBuYW1lKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3RhcnRTZXJ2aWNlKHNlcnZpY2UsIGNvbnRhaW5lck5hbWUsIGFyZ3MpXG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShgJHt0aWNrfSAke25hbWV9IGlzIHVwXFxuYClcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoYCR7Y3Jvc3N9IGNvdWxkIG5vdCBzdGFydCAke25hbWV9XFxuYClcbiAgICAgIH0pXG4gIH0pXG4pKHNlcnZpY2VzKSlcblxuY29uc3QgcHJlcGFyZSA9IFIub3ZlcihcbiAgUi5sZW5zUHJvcCgnaW1hZ2UnKSxcbiAgUi5pZkVsc2UoXG4gICAgUi5pcyhTdHJpbmcpLFxuICAgIFIuaWRlbnRpdHksXG4gICAgUi5waXBlKFxuICAgICAgUi5udGgoLTEpLFxuICAgICAgUi5wcm9wKCd0YWdzJyksXG4gICAgICBSLm50aCgwKVxuICAgIClcbiAgKVxuKVxuXG5jb25zdCB1cCA9IGFzeW5jIChzZXJ2aWNlcywgY29uZmlnLCBhcmdzKSA9PiB7XG4gIGF3YWl0IGJ1aWxkKHNlcnZpY2VzLCBjb25maWcpXG4gIHJldHVybiBzdGFydFNlcnZpY2VzKFIubWFwKHByZXBhcmUpKHNlcnZpY2VzKSwgY29uZmlnLCBhcmdzKVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIGlmIChhcmdzLmRldGFjaGVkICE9PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBjb25uZWN0TG9ncyhzZXJ2aWNlcywgY29uZmlnKVxuICAgICAgfVxuICAgIH0pXG59XG5cbnVwLnByZXBhcmUgPSBwcmVwYXJlXG51cC5tYWtlUnVuQXJncyA9IG1ha2VSdW5BcmdzXG5cbm1vZHVsZS5leHBvcnRzID0gdXBcbiJdfQ==