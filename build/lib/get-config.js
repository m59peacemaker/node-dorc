function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = require('mz/fs');

const readFile = _require.readFile;

var _require2 = require('js-yaml');

const parseYAML = _require2.safeLoad;

const interpolate = require('interpol8');
const interpolateShell = require('./interpolate-shell');
const getModeConfig = require('./get-mode-config');

const getLocals = (env, localsFile) => {
  if (localsFile === undefined) {
    return Promise.resolve(env);
  }
  return readFile(localsFile).then(locals => Object.assign({}, env, parseYAML(locals))).catch(err => env);
};

const getConfig = (() => {
  var _ref = _asyncToGenerator(function* (mode) {
    // read dorc.yaml
    let configDoc;
    try {
      configDoc = yield readFile('dorc.yaml', 'utf8');
    } catch (err) {
      console.log(`No dorc.yaml found at ${ process.cwd() }`);
      process.exit(1);
    }
    // parse into js object so we can get locals file path
    const preInterpolateConfig = parseYAML(configDoc);
    // read object from config.locals file and merge it with environment vars
    const locals = yield getLocals(process.env, preInterpolateConfig.locals);
    // interpolate ${{ }} shell placeholders in raw config
    const doc_ = yield interpolateShell(configDoc);
    // interpolate {{ }} placeholders in raw config
    const doc__ = interpolate(doc_, locals);
    // parse interpolated config into js object
    const config = parseYAML(doc__);
    // merge config objects with mode specific objects,
    //   so that we have only the config for the given mode
    const modeConfig = getModeConfig(mode, config);
    return modeConfig;
  });

  return function getConfig(_x) {
    return _ref.apply(this, arguments);
  };
})();

module.exports = getConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZ2V0LWNvbmZpZy5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwicmVhZEZpbGUiLCJwYXJzZVlBTUwiLCJzYWZlTG9hZCIsImludGVycG9sYXRlIiwiaW50ZXJwb2xhdGVTaGVsbCIsImdldE1vZGVDb25maWciLCJnZXRMb2NhbHMiLCJlbnYiLCJsb2NhbHNGaWxlIiwidW5kZWZpbmVkIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ0aGVuIiwibG9jYWxzIiwiT2JqZWN0IiwiYXNzaWduIiwiY2F0Y2giLCJlcnIiLCJnZXRDb25maWciLCJtb2RlIiwiY29uZmlnRG9jIiwiY29uc29sZSIsImxvZyIsInByb2Nlc3MiLCJjd2QiLCJleGl0IiwicHJlSW50ZXJwb2xhdGVDb25maWciLCJkb2NfIiwiZG9jX18iLCJjb25maWciLCJtb2RlQ29uZmlnIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7ZUFBbUJBLFFBQVEsT0FBUixDOztNQUFaQyxRLFlBQUFBLFE7O2dCQUN1QkQsUUFBUSxTQUFSLEM7O01BQWJFLFMsYUFBVkMsUTs7QUFDUCxNQUFNQyxjQUFjSixRQUFRLFdBQVIsQ0FBcEI7QUFDQSxNQUFNSyxtQkFBbUJMLFFBQVEscUJBQVIsQ0FBekI7QUFDQSxNQUFNTSxnQkFBZ0JOLFFBQVEsbUJBQVIsQ0FBdEI7O0FBRUEsTUFBTU8sWUFBWSxDQUFDQyxHQUFELEVBQU1DLFVBQU4sS0FBcUI7QUFDckMsTUFBSUEsZUFBZUMsU0FBbkIsRUFBOEI7QUFDNUIsV0FBT0MsUUFBUUMsT0FBUixDQUFnQkosR0FBaEIsQ0FBUDtBQUNEO0FBQ0QsU0FBT1AsU0FBU1EsVUFBVCxFQUNKSSxJQURJLENBQ0VDLE1BQUQsSUFBWUMsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JSLEdBQWxCLEVBQXVCTixVQUFVWSxNQUFWLENBQXZCLENBRGIsRUFFSkcsS0FGSSxDQUVFQyxPQUFPVixHQUZULENBQVA7QUFHRCxDQVBEOztBQVNBLE1BQU1XO0FBQUEsK0JBQVksV0FBT0MsSUFBUCxFQUFnQjtBQUNoQztBQUNBLFFBQUlDLFNBQUo7QUFDQSxRQUFJO0FBQ0ZBLGtCQUFZLE1BQU1wQixTQUFTLFdBQVQsRUFBc0IsTUFBdEIsQ0FBbEI7QUFDRCxLQUZELENBRUUsT0FBT2lCLEdBQVAsRUFBWTtBQUNaSSxjQUFRQyxHQUFSLENBQWEsMEJBQXdCQyxRQUFRQyxHQUFSLEVBQWMsR0FBbkQ7QUFDQUQsY0FBUUUsSUFBUixDQUFhLENBQWI7QUFDRDtBQUNEO0FBQ0EsVUFBTUMsdUJBQXVCekIsVUFBVW1CLFNBQVYsQ0FBN0I7QUFDQTtBQUNBLFVBQU1QLFNBQVMsTUFBTVAsVUFBVWlCLFFBQVFoQixHQUFsQixFQUF1Qm1CLHFCQUFxQmIsTUFBNUMsQ0FBckI7QUFDQTtBQUNBLFVBQU1jLE9BQU8sTUFBTXZCLGlCQUFpQmdCLFNBQWpCLENBQW5CO0FBQ0E7QUFDQSxVQUFNUSxRQUFRekIsWUFBWXdCLElBQVosRUFBa0JkLE1BQWxCLENBQWQ7QUFDQTtBQUNBLFVBQU1nQixTQUFTNUIsVUFBVTJCLEtBQVYsQ0FBZjtBQUNBO0FBQ0E7QUFDQSxVQUFNRSxhQUFhekIsY0FBY2MsSUFBZCxFQUFvQlUsTUFBcEIsQ0FBbkI7QUFDQSxXQUFPQyxVQUFQO0FBQ0QsR0F2Qks7O0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFBTjs7QUF5QkFDLE9BQU9DLE9BQVAsR0FBaUJkLFNBQWpCIiwiZmlsZSI6ImdldC1jb25maWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7cmVhZEZpbGV9ID0gcmVxdWlyZSgnbXovZnMnKVxuY29uc3Qge3NhZmVMb2FkOiBwYXJzZVlBTUx9ID0gcmVxdWlyZSgnanMteWFtbCcpXG5jb25zdCBpbnRlcnBvbGF0ZSA9IHJlcXVpcmUoJ2ludGVycG9sOCcpXG5jb25zdCBpbnRlcnBvbGF0ZVNoZWxsID0gcmVxdWlyZSgnLi9pbnRlcnBvbGF0ZS1zaGVsbCcpXG5jb25zdCBnZXRNb2RlQ29uZmlnID0gcmVxdWlyZSgnLi9nZXQtbW9kZS1jb25maWcnKVxuXG5jb25zdCBnZXRMb2NhbHMgPSAoZW52LCBsb2NhbHNGaWxlKSA9PiB7XG4gIGlmIChsb2NhbHNGaWxlID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGVudilcbiAgfVxuICByZXR1cm4gcmVhZEZpbGUobG9jYWxzRmlsZSlcbiAgICAudGhlbigobG9jYWxzKSA9PiBPYmplY3QuYXNzaWduKHt9LCBlbnYsIHBhcnNlWUFNTChsb2NhbHMpKSlcbiAgICAuY2F0Y2goZXJyID0+IGVudilcbn1cblxuY29uc3QgZ2V0Q29uZmlnID0gYXN5bmMgKG1vZGUpID0+IHtcbiAgLy8gcmVhZCBkb3JjLnlhbWxcbiAgbGV0IGNvbmZpZ0RvY1xuICB0cnkge1xuICAgIGNvbmZpZ0RvYyA9IGF3YWl0IHJlYWRGaWxlKCdkb3JjLnlhbWwnLCAndXRmOCcpXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUubG9nKGBObyBkb3JjLnlhbWwgZm91bmQgYXQgJHtwcm9jZXNzLmN3ZCgpfWApXG4gICAgcHJvY2Vzcy5leGl0KDEpXG4gIH1cbiAgLy8gcGFyc2UgaW50byBqcyBvYmplY3Qgc28gd2UgY2FuIGdldCBsb2NhbHMgZmlsZSBwYXRoXG4gIGNvbnN0IHByZUludGVycG9sYXRlQ29uZmlnID0gcGFyc2VZQU1MKGNvbmZpZ0RvYylcbiAgLy8gcmVhZCBvYmplY3QgZnJvbSBjb25maWcubG9jYWxzIGZpbGUgYW5kIG1lcmdlIGl0IHdpdGggZW52aXJvbm1lbnQgdmFyc1xuICBjb25zdCBsb2NhbHMgPSBhd2FpdCBnZXRMb2NhbHMocHJvY2Vzcy5lbnYsIHByZUludGVycG9sYXRlQ29uZmlnLmxvY2FscylcbiAgLy8gaW50ZXJwb2xhdGUgJHt7IH19IHNoZWxsIHBsYWNlaG9sZGVycyBpbiByYXcgY29uZmlnXG4gIGNvbnN0IGRvY18gPSBhd2FpdCBpbnRlcnBvbGF0ZVNoZWxsKGNvbmZpZ0RvYylcbiAgLy8gaW50ZXJwb2xhdGUge3sgfX0gcGxhY2Vob2xkZXJzIGluIHJhdyBjb25maWdcbiAgY29uc3QgZG9jX18gPSBpbnRlcnBvbGF0ZShkb2NfLCBsb2NhbHMpXG4gIC8vIHBhcnNlIGludGVycG9sYXRlZCBjb25maWcgaW50byBqcyBvYmplY3RcbiAgY29uc3QgY29uZmlnID0gcGFyc2VZQU1MKGRvY19fKVxuICAvLyBtZXJnZSBjb25maWcgb2JqZWN0cyB3aXRoIG1vZGUgc3BlY2lmaWMgb2JqZWN0cyxcbiAgLy8gICBzbyB0aGF0IHdlIGhhdmUgb25seSB0aGUgY29uZmlnIGZvciB0aGUgZ2l2ZW4gbW9kZVxuICBjb25zdCBtb2RlQ29uZmlnID0gZ2V0TW9kZUNvbmZpZyhtb2RlLCBjb25maWcpXG4gIHJldHVybiBtb2RlQ29uZmlnXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0Q29uZmlnXG4iXX0=