function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const path = require('path');

var _require = require('mz/fs');

const readFile = _require.readFile;

var _require2 = require('js-yaml');

const parseYAML = _require2.safeLoad;

const interpolate = require('interpol8');
const interpolateShell = require('./interpolate-shell');
const getModeConfig = require('./get-mode-config');
const R = require('ramda');
const normalizeConfig = require('./normalize-config');

var _require3 = require('ramda-fantasy');

const Future = _require3.Future;

const promisifyF = require('promisify-f');
const futurizeP = require('futurize-p')(Future);
const configSchema = require('../schema/config');

const getDefaults = projectPath => ({
  projectName: path.basename(projectPath)
});

const getLocals = localsFile => {
  if (localsFile === undefined) {
    return Promise.resolve({});
  }
  return readFile(localsFile).then(raw => parseYAML(raw)).catch(err => ({}));
};

const interpolateConfig = (() => {
  var _ref = _asyncToGenerator(function* (raw, locals) {
    // interpolate ${{ }} shell placeholders in raw config
    const doc_ = yield interpolateShell(raw);
    // interpolate {{ }} placeholders in raw config
    return interpolate(doc_, Object.assign({}, process.env, locals));
  });

  return function interpolateConfig(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

const getConfig = (() => {
  var _ref2 = _asyncToGenerator(function* (projectPath, mode) {
    // read dorc.yaml
    const configDocPath = path.join(projectPath, 'dorc.yaml');
    let raw;
    try {
      raw = yield readFile(configDocPath, 'utf8');
    } catch (err) {
      process.stdout.write(`No dorc.yaml found at ${ projectPath }\n`);
      process.exit(1);
    }
    // parse into js object so we can get locals file path
    const preInterpolateConfig = parseYAML(raw);
    const locals = yield getLocals(preInterpolateConfig.locals);
    const interpolated = yield interpolateConfig(raw, locals);
    const parsed = Object.assign({}, getDefaults(projectPath), parseYAML(interpolated));
    configSchema.loose.validate(parsed);
    // merge config objects with mode specific objects,
    //   so that we have only the config for the given mode
    const modeConfig = getModeConfig(mode || parsed.defaultMode, parsed);
    const projectInfo = {
      path: projectPath,
      name: parsed.projectName
    };
    const prepared = R.pipe(
    // filter services that don't have an image
    R.over(R.lensProp('services'), R.filter(R.has('image'))), function (config) {
      return normalizeConfig(config, projectInfo);
    })(modeConfig);

    const projectConfig = {
      project: projectInfo,
      locals,
      raw,
      parsed,
      prepared
    };
    return projectConfig;
  });

  return function getConfig(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

module.exports = getConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZ2V0LWNvbmZpZy5qcyJdLCJuYW1lcyI6WyJwYXRoIiwicmVxdWlyZSIsInJlYWRGaWxlIiwicGFyc2VZQU1MIiwic2FmZUxvYWQiLCJpbnRlcnBvbGF0ZSIsImludGVycG9sYXRlU2hlbGwiLCJnZXRNb2RlQ29uZmlnIiwiUiIsIm5vcm1hbGl6ZUNvbmZpZyIsIkZ1dHVyZSIsInByb21pc2lmeUYiLCJmdXR1cml6ZVAiLCJjb25maWdTY2hlbWEiLCJnZXREZWZhdWx0cyIsInByb2plY3RQYXRoIiwicHJvamVjdE5hbWUiLCJiYXNlbmFtZSIsImdldExvY2FscyIsImxvY2Fsc0ZpbGUiLCJ1bmRlZmluZWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInRoZW4iLCJyYXciLCJjYXRjaCIsImVyciIsImludGVycG9sYXRlQ29uZmlnIiwibG9jYWxzIiwiZG9jXyIsIk9iamVjdCIsImFzc2lnbiIsInByb2Nlc3MiLCJlbnYiLCJnZXRDb25maWciLCJtb2RlIiwiY29uZmlnRG9jUGF0aCIsImpvaW4iLCJzdGRvdXQiLCJ3cml0ZSIsImV4aXQiLCJwcmVJbnRlcnBvbGF0ZUNvbmZpZyIsImludGVycG9sYXRlZCIsInBhcnNlZCIsImxvb3NlIiwidmFsaWRhdGUiLCJtb2RlQ29uZmlnIiwiZGVmYXVsdE1vZGUiLCJwcm9qZWN0SW5mbyIsIm5hbWUiLCJwcmVwYXJlZCIsInBpcGUiLCJvdmVyIiwibGVuc1Byb3AiLCJmaWx0ZXIiLCJoYXMiLCJjb25maWciLCJwcm9qZWN0Q29uZmlnIiwicHJvamVjdCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTUEsT0FBT0MsUUFBUSxNQUFSLENBQWI7O2VBQ21CQSxRQUFRLE9BQVIsQzs7TUFBWkMsUSxZQUFBQSxROztnQkFDdUJELFFBQVEsU0FBUixDOztNQUFiRSxTLGFBQVZDLFE7O0FBQ1AsTUFBTUMsY0FBY0osUUFBUSxXQUFSLENBQXBCO0FBQ0EsTUFBTUssbUJBQW1C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QjtBQUNwQkMsZUFBU1YsV0FEVztBQUVwQnBCLFlBRm9CO0FBR3BCSixTQUhvQjtBQUlwQm1CLFlBSm9CO0FBS3BCTztBQUxvQixLQUF0QjtBQU9BLFdBQU9PLGFBQVA7QUFDRCxHQXJDSzs7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUFOOztBQXVDQUUsT0FBT0MsT0FBUCxHQUFpQjFCLFNBQWpCIiwiZmlsZSI6ImdldC1jb25maWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5jb25zdCB7cmVhZEZpbGV9ID0gcmVxdWlyZSgnbXovZnMnKVxuY29uc3Qge3NhZmVMb2FkOiBwYXJzZVlBTUx9ID0gcmVxdWlyZSgnanMteWFtbCcpXG5jb25zdCBpbnRlcnBvbGF0ZSA9IHJlcXVpcmUoJ2ludGVycG9sOCcpXG5jb25zdCBpbnRlcnBvbGF0ZVNoZWxsID0gcmVxdWlyZSgnLi9pbnRlcnBvbGF0ZS1zaGVsbCcpXG5jb25zdCBnZXRNb2RlQ29uZmlnID0gcmVxdWlyZSgnLi9nZXQtbW9kZS1jb25maWcnKVxuY29uc3QgUiA9IHJlcXVpcmUoJ3JhbWRhJylcbmNvbnN0IG5vcm1hbGl6ZUNvbmZpZyA9IHJlcXVpcmUoJy4vbm9ybWFsaXplLWNvbmZpZycpXG5jb25zdCB7RnV0dXJlfSA9IHJlcXVpcmUoJ3JhbWRhLWZhbnRhc3knKVxuY29uc3QgcHJvbWlzaWZ5RiA9IHJlcXVpcmUoJ3Byb21pc2lmeS1mJylcbmNvbnN0IGZ1dHVyaXplUCA9IHJlcXVpcmUoJ2Z1dHVyaXplLXAnKShGdXR1cmUpXG5jb25zdCBjb25maWdTY2hlbWEgPSByZXF1aXJlKCd+L3NjaGVtYS9jb25maWcnKVxuXG5jb25zdCBnZXREZWZhdWx0cyA9IChwcm9qZWN0UGF0aCkgPT4gKHtcbiAgcHJvamVjdE5hbWU6IHBhdGguYmFzZW5hbWUocHJvamVjdFBhdGgpXG59KVxuXG5jb25zdCBnZXRMb2NhbHMgPSAobG9jYWxzRmlsZSkgPT4ge1xuICBpZiAobG9jYWxzRmlsZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7fSlcbiAgfVxuICByZXR1cm4gcmVhZEZpbGUobG9jYWxzRmlsZSlcbiAgICAudGhlbihyYXcgPT4gcGFyc2VZQU1MKHJhdykpXG4gICAgLmNhdGNoKGVyciA9PiAoe30pKVxufVxuXG5jb25zdCBpbnRlcnBvbGF0ZUNvbmZpZyA9IGFzeW5jIChyYXcsIGxvY2FscykgPT4ge1xuICAvLyBpbnRlcnBvbGF0ZSAke3sgfX0gc2hlbGwgcGxhY2Vob2xkZXJzIGluIHJhdyBjb25maWdcbiAgY29uc3QgZG9jXyA9IGF3YWl0IGludGVycG9sYXRlU2hlbGwocmF3KVxuICAvLyBpbnRlcnBvbGF0ZSB7eyB9fSBwbGFjZWhvbGRlcnMgaW4gcmF3IGNvbmZpZ1xuICByZXR1cm4gaW50ZXJwb2xhdGUoZG9jXywgT2JqZWN0LmFzc2lnbih7fSwgcHJvY2Vzcy5lbnYsIGxvY2FscykpXG59XG5cbmNvbnN0IGdldENvbmZpZyA9IGFzeW5jIChwcm9qZWN0UGF0aCwgbW9kZSkgPT4ge1xuICAvLyByZWFkIGRvcmMueWFtbFxuICBjb25zdCBjb25maWdEb2NQYXRoID0gcGF0aC5qb2luKHByb2plY3RQYXRoLCAnZG9yYy55YW1sJylcbiAgbGV0IHJhd1xuICB0cnkge1xuICAgIHJhdyA9IGF3YWl0IHJlYWRGaWxlKGNvbmZpZ0RvY1BhdGgsICd1dGY4JylcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoYE5vIGRvcmMueWFtbCBmb3VuZCBhdCAke3Byb2plY3RQYXRofVxcbmApXG4gICAgcHJvY2Vzcy5leGl0KDEpXG4gIH1cbiAgLy8gcGFyc2UgaW50byBqcyBvYmplY3Qgc28gd2UgY2FuIGdldCBsb2NhbHMgZmlsZSBwYXRoXG4gIGNvbnN0IHByZUludGVycG9sYXRlQ29uZmlnID0gcGFyc2VZQU1MKHJhdylcbiAgY29uc3QgbG9jYWxzID0gYXdhaXQgZ2V0TG9jYWxzKHByZUludGVycG9sYXRlQ29uZmlnLmxvY2FscylcbiAgY29uc3QgaW50ZXJwb2xhdGVkID0gYXdhaXQgaW50ZXJwb2xhdGVDb25maWcocmF3LCBsb2NhbHMpXG4gIGNvbnN0IHBhcnNlZCA9IE9iamVjdC5hc3NpZ24oe30sIGdldERlZmF1bHRzKHByb2plY3RQYXRoKSwgcGFyc2VZQU1MKGludGVycG9sYXRlZCkpXG4gIGNvbmZpZ1NjaGVtYS5sb29zZS52YWxpZGF0ZShwYXJzZWQpXG4gIC8vIG1lcmdlIGNvbmZpZyBvYmplY3RzIHdpdGggbW9kZSBzcGVjaWZpYyBvYmplY3RzLFxuICAvLyAgIHNvIHRoYXQgd2UgaGF2ZSBvbmx5IHRoZSBjb25maWcgZm9yIHRoZSBnaXZlbiBtb2RlXG4gIGNvbnN0IG1vZGVDb25maWcgPSBnZXRNb2RlQ29uZmlnKG1vZGUgfHwgcGFyc2VkLmRlZmF1bHRNb2RlLCBwYXJzZWQpXG4gIGNvbnN0IHByb2plY3RJbmZvID0ge1xuICAgIHBhdGg6IHByb2plY3RQYXRoLFxuICAgIG5hbWU6IHBhcnNlZC5wcm9qZWN0TmFtZVxuICB9XG4gIGNvbnN0IHByZXBhcmVkID0gUi5waXBlKFxuICAgIC8vIGZpbHRlciBzZXJ2aWNlcyB0aGF0IGRvbid0IGhhdmUgYW4gaW1hZ2VcbiAgICBSLm92ZXIoUi5sZW5zUHJvcCgnc2VydmljZXMnKSwgUi5maWx0ZXIoUi5oYXMoJ2ltYWdlJykpKSxcbiAgICBjb25maWcgPT4gbm9ybWFsaXplQ29uZmlnKGNvbmZpZywgcHJvamVjdEluZm8pXG4gICkobW9kZUNvbmZpZylcblxuICBjb25zdCBwcm9qZWN0Q29uZmlnID0ge1xuICAgIHByb2plY3Q6IHByb2plY3RJbmZvLFxuICAgIGxvY2FscyxcbiAgICByYXcsXG4gICAgcGFyc2VkLFxuICAgIHByZXBhcmVkXG4gIH1cbiAgcmV0dXJuIHByb2plY3RDb25maWdcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRDb25maWdcbiJdfQ==