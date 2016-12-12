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
    // merge config objects with mode specific objects,
    //   so that we have only the config for the given mode
    const modeConfig = getModeConfig(mode || parsed.defaultMode, parsed);
    // filter services that don't have an image
    const prepare = R.pipe(R.over(R.lensProp('services'), R.filter(R.has('image'))),
    /*R.lensProp('with')(
      R.ifElse(
        R.isNil,
        Future.of,
        futurizeP(paths => Promise.all(
          paths.map(path => getConfig(path, mode || parsed.defaultMode))
        ))
      )
    ),
    R.map(normalizeConfig)*/
    normalizeConfig);

    //const prepared = await promisifyF(prepare)(modeConfig)
    const prepared = prepare(modeConfig);

    const projectConfig = {
      project: {
        path: projectPath,
        name: parsed.projectName
      },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZ2V0LWNvbmZpZy5qcyJdLCJuYW1lcyI6WyJwYXRoIiwicmVxdWlyZSIsInJlYWRGaWxlIiwicGFyc2VZQU1MIiwic2FmZUxvYWQiLCJpbnRlcnBvbGF0ZSIsImludGVycG9sYXRlU2hlbGwiLCJnZXRNb2RlQ29uZmlnIiwiUiIsIm5vcm1hbGl6ZUNvbmZpZyIsIkZ1dHVyZSIsInByb21pc2lmeUYiLCJmdXR1cml6ZVAiLCJnZXREZWZhdWx0cyIsInByb2plY3RQYXRoIiwicHJvamVjdE5hbWUiLCJiYXNlbmFtZSIsImdldExvY2FscyIsImxvY2Fsc0ZpbGUiLCJ1bmRlZmluZWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInRoZW4iLCJyYXciLCJjYXRjaCIsImVyciIsImludGVycG9sYXRlQ29uZmlnIiwibG9jYWxzIiwiZG9jXyIsIk9iamVjdCIsImFzc2lnbiIsInByb2Nlc3MiLCJlbnYiLCJnZXRDb25maWciLCJtb2RlIiwiY29uZmlnRG9jUGF0aCIsImpvaW4iLCJzdGRvdXQiLCJ3cml0ZSIsImV4aXQiLCJwcmVJbnRlcnBvbGF0ZUNvbmZpZyIsImludGVycG9sYXRlZCIsInBhcnNlZCIsIm1vZGVDb25maWciLCJkZWZhdWx0TW9kZSIsInByZXBhcmUiLCJwaXBlIiwib3ZlciIsImxlbnNQcm9wIiwiZmlsdGVyIiwiaGFzIiwicHJlcGFyZWQiLCJwcm9qZWN0Q29uZmlnIiwicHJvamVjdCIsIm5hbWUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU1BLE9BQU9DLFFBQVEsTUFBUixDQUFiOztlQUNtQkEsUUFBUSxPQUFSLEM7O01BQVpDLFEsWUFBQUEsUTs7Z0JBQ3VCRCxRQUFRLFNBQVIsQzs7TUFBYkUsUyxhQUFWQyxROztBQUNQLE1BQU1DLGNBQWNKLFFBQVEsV0FBUixDQUFwQjtBQUNBLE1BQU1LLG1CQUFtQkwsUUFBUSxxQkFBUixDQUF6QjtBQUNBLE1BQU1NLGdCQUFnQk4sUUFBUSxtQkFB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LFNBQWpCIiwiZmlsZSI6ImdldC1jb25maWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5jb25zdCB7cmVhZEZpbGV9ID0gcmVxdWlyZSgnbXovZnMnKVxuY29uc3Qge3NhZmVMb2FkOiBwYXJzZVlBTUx9ID0gcmVxdWlyZSgnanMteWFtbCcpXG5jb25zdCBpbnRlcnBvbGF0ZSA9IHJlcXVpcmUoJ2ludGVycG9sOCcpXG5jb25zdCBpbnRlcnBvbGF0ZVNoZWxsID0gcmVxdWlyZSgnLi9pbnRlcnBvbGF0ZS1zaGVsbCcpXG5jb25zdCBnZXRNb2RlQ29uZmlnID0gcmVxdWlyZSgnLi9nZXQtbW9kZS1jb25maWcnKVxuY29uc3QgUiA9IHJlcXVpcmUoJ3JhbWRhJylcbmNvbnN0IG5vcm1hbGl6ZUNvbmZpZyA9IHJlcXVpcmUoJy4vbm9ybWFsaXplLWNvbmZpZycpXG5jb25zdCB7RnV0dXJlfSA9IHJlcXVpcmUoJ3JhbWRhLWZhbnRhc3knKVxuY29uc3QgcHJvbWlzaWZ5RiA9IHJlcXVpcmUoJ3Byb21pc2lmeS1mJylcbmNvbnN0IGZ1dHVyaXplUCA9IHJlcXVpcmUoJ2Z1dHVyaXplLXAnKShGdXR1cmUpXG5cbmNvbnN0IGdldERlZmF1bHRzID0gKHByb2plY3RQYXRoKSA9PiAoe1xuICBwcm9qZWN0TmFtZTogcGF0aC5iYXNlbmFtZShwcm9qZWN0UGF0aClcbn0pXG5cbmNvbnN0IGdldExvY2FscyA9IChsb2NhbHNGaWxlKSA9PiB7XG4gIGlmIChsb2NhbHNGaWxlID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHt9KVxuICB9XG4gIHJldHVybiByZWFkRmlsZShsb2NhbHNGaWxlKVxuICAgIC50aGVuKHJhdyA9PiBwYXJzZVlBTUwocmF3KSlcbiAgICAuY2F0Y2goZXJyID0+ICh7fSkpXG59XG5cbmNvbnN0IGludGVycG9sYXRlQ29uZmlnID0gYXN5bmMgKHJhdywgbG9jYWxzKSA9PiB7XG4gIC8vIGludGVycG9sYXRlICR7eyB9fSBzaGVsbCBwbGFjZWhvbGRlcnMgaW4gcmF3IGNvbmZpZ1xuICBjb25zdCBkb2NfID0gYXdhaXQgaW50ZXJwb2xhdGVTaGVsbChyYXcpXG4gIC8vIGludGVycG9sYXRlIHt7IH19IHBsYWNlaG9sZGVycyBpbiByYXcgY29uZmlnXG4gIHJldHVybiBpbnRlcnBvbGF0ZShkb2NfLCBPYmplY3QuYXNzaWduKHt9LCBwcm9jZXNzLmVudiwgbG9jYWxzKSlcbn1cblxuY29uc3QgZ2V0Q29uZmlnID0gYXN5bmMgKHByb2plY3RQYXRoLCBtb2RlKSA9PiB7XG4gIC8vIHJlYWQgZG9yYy55YW1sXG4gIGNvbnN0IGNvbmZpZ0RvY1BhdGggPSBwYXRoLmpvaW4ocHJvamVjdFBhdGgsICdkb3JjLnlhbWwnKVxuICBsZXQgcmF3XG4gIHRyeSB7XG4gICAgcmF3ID0gYXdhaXQgcmVhZEZpbGUoY29uZmlnRG9jUGF0aCwgJ3V0ZjgnKVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShgTm8gZG9yYy55YW1sIGZvdW5kIGF0ICR7cHJvamVjdFBhdGh9XFxuYClcbiAgICBwcm9jZXNzLmV4aXQoMSlcbiAgfVxuICAvLyBwYXJzZSBpbnRvIGpzIG9iamVjdCBzbyB3ZSBjYW4gZ2V0IGxvY2FscyBmaWxlIHBhdGhcbiAgY29uc3QgcHJlSW50ZXJwb2xhdGVDb25maWcgPSBwYXJzZVlBTUwocmF3KVxuICBjb25zdCBsb2NhbHMgPSBhd2FpdCBnZXRMb2NhbHMocHJlSW50ZXJwb2xhdGVDb25maWcubG9jYWxzKVxuICBjb25zdCBpbnRlcnBvbGF0ZWQgPSBhd2FpdCBpbnRlcnBvbGF0ZUNvbmZpZyhyYXcsIGxvY2FscylcbiAgY29uc3QgcGFyc2VkID0gT2JqZWN0LmFzc2lnbih7fSwgZ2V0RGVmYXVsdHMocHJvamVjdFBhdGgpLCBwYXJzZVlBTUwoaW50ZXJwb2xhdGVkKSlcbiAgLy8gbWVyZ2UgY29uZmlnIG9iamVjdHMgd2l0aCBtb2RlIHNwZWNpZmljIG9iamVjdHMsXG4gIC8vICAgc28gdGhhdCB3ZSBoYXZlIG9ubHkgdGhlIGNvbmZpZyBmb3IgdGhlIGdpdmVuIG1vZGVcbiAgY29uc3QgbW9kZUNvbmZpZyA9IGdldE1vZGVDb25maWcobW9kZSB8fCBwYXJzZWQuZGVmYXVsdE1vZGUsIHBhcnNlZClcbiAgLy8gZmlsdGVyIHNlcnZpY2VzIHRoYXQgZG9uJ3QgaGF2ZSBhbiBpbWFnZVxuICBjb25zdCBwcmVwYXJlID0gUi5waXBlKFxuICAgIFIub3ZlcihcbiAgICAgIFIubGVuc1Byb3AoJ3NlcnZpY2VzJyksXG4gICAgICBSLmZpbHRlcihSLmhhcygnaW1hZ2UnKSlcbiAgICApLFxuICAgIC8qUi5sZW5zUHJvcCgnd2l0aCcpKFxuICAgICAgUi5pZkVsc2UoXG4gICAgICAgIFIuaXNOaWwsXG4gICAgICAgIEZ1dHVyZS5vZixcbiAgICAgICAgZnV0dXJpemVQKHBhdGhzID0+IFByb21pc2UuYWxsKFxuICAgICAgICAgIHBhdGhzLm1hcChwYXRoID0+IGdldENvbmZpZyhwYXRoLCBtb2RlIHx8IHBhcnNlZC5kZWZhdWx0TW9kZSkpXG4gICAgICAgICkpXG4gICAgICApXG4gICAgKSxcbiAgICBSLm1hcChub3JtYWxpemVDb25maWcpKi9cbiAgICBub3JtYWxpemVDb25maWdcbiAgKVxuXG4gIC8vY29uc3QgcHJlcGFyZWQgPSBhd2FpdCBwcm9taXNpZnlGKHByZXBhcmUpKG1vZGVDb25maWcpXG4gIGNvbnN0IHByZXBhcmVkID0gcHJlcGFyZShtb2RlQ29uZmlnKVxuXG4gIGNvbnN0IHByb2plY3RDb25maWcgPSB7XG4gICAgcHJvamVjdDoge1xuICAgICAgcGF0aDogcHJvamVjdFBhdGgsXG4gICAgICBuYW1lOiBwYXJzZWQucHJvamVjdE5hbWVcbiAgICB9LFxuICAgIGxvY2FscyxcbiAgICByYXcsXG4gICAgcGFyc2VkLFxuICAgIHByZXBhcmVkXG4gIH1cbiAgcmV0dXJuIHByb2plY3RDb25maWdcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRDb25maWdcbiJdfQ==