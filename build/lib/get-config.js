function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const path = require('path');

var _require = require('mz/fs');

const readFile = _require.readFile;

var _require2 = require('js-yaml');

const parseYAML = _require2.safeLoad;

const interpolate = require('interpol8');
const interpolateShell = require('./interpolate-shell');
const getModeConfig = require('./get-mode-config');

const defaults = {
  projectName: path.basename(process.cwd())
};

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
    const config = Object.assign({}, defaults, parseYAML(doc__));
    // merge config objects with mode specific objects,
    //   so that we have only the config for the given mode
    const modeConfig = getModeConfig(mode || config.defaultMode, config);
    return modeConfig;
  });

  return function getConfig(_x) {
    return _ref.apply(this, arguments);
  };
})();

module.exports = getConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZ2V0LWNvbmZpZy5qcyJdLCJuYW1lcyI6WyJwYXRoIiwicmVxdWlyZSIsInJlYWRGaWxlIiwicGFyc2VZQU1MIiwic2FmZUxvYWQiLCJpbnRlcnBvbGF0ZSIsImludGVycG9sYXRlU2hlbGwiLCJnZXRNb2RlQ29uZmlnIiwiZGVmYXVsdHMiLCJwcm9qZWN0TmFtZSIsImJhc2VuYW1lIiwicHJvY2VzcyIsImN3ZCIsImdldExvY2FscyIsImVudiIsImxvY2Fsc0ZpbGUiLCJ1bmRlZmluZWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInRoZW4iLCJsb2NhbHMiLCJPYmplY3QiLCJhc3NpZ24iLCJjYXRjaCIsImVyciIsImdldENvbmZpZyIsIm1vZGUiLCJjb25maWdEb2MiLCJjb25zb2xlIiwibG9nIiwiZXhpdCIsInByZUludGVycG9sYXRlQ29uZmlnIiwiZG9jXyIsImRvY19fIiwiY29uZmlnIiwibW9kZUNvbmZpZyIsImRlZmF1bHRNb2RlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNQSxPQUFPQyxRQUFRLE1BQVIsQ0FBYjs7ZUFDbUJBLFFBQVEsT0FBUixDOztNQUFaQyxRLFlBQUFBLFE7O2dCQUN1QkQsUUFBUSxTQUFSLEM7O01BQWJFLFMsYUFBVkMsUTs7QUFDUCxNQUFNQyxjQUFjSixRQUFRLFdBQVIsQ0FBcEI7QUFDQSxNQUFNSyxtQkFBbUJMLFFBQVEscUJBQVIsQ0FBekI7QUFDQSxNQUFNTSxnQkFBZ0JOLFFBQVEsbUJBQVIsQ0FBdEI7O0FBRUEsTUFBTU8sV0FBVztBQUNmQyxlQUFhVCxLQUFLVSxRQUFMLENBQWNDLFFBQVFDLEdBQVIsRUFBZDtBQURFLENBQWpCOztBQUlBLE1BQU1DLFlBQVksQ0FBQ0MsR0FBRCxFQUFNQyxVQUFOLEtBQXFCO0FBQ3JDLE1BQUlBLGVBQWVDLFNBQW5CLEVBQThCO0FBQzVCLFdBQU9DLFFBQVFDLE9BQVIsQ0FBZ0JKLEdBQWhCLENBQVA7QUFDRDtBQUNELFNBQU9aLFNBQVNhLFVBQVQsRUFDSkksSUFESSxDQUNFQyxNQUFELElBQVlDLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCUixHQUFsQixFQUF1QlgsVUFBVWlCLE1BQVYsQ0FBdkIsQ0FEYixFQUVKRyxLQUZJLENBRUVDLE9BQU9WLEdBRlQsQ0FBUDtBQUdELENBUEQ7O0FBU0EsTUFBTVc7QUFBQSwrQkFBWSxXQUFPQyxJQUFQLEVBQWdCO0FBQ2hDO0FBQ0EsUUFBSUMsU0FBSjtBQUNBLFFBQUk7QUFDRkEsa0JBQVksTUFBTXpCLFNBQVMsV0FBVCxFQUFzQixNQUF0QixDQUFsQjtBQUNELEtBRkQsQ0FFRSxPQUFPc0IsR0FBUCxFQUFZO0FBQ1pJLGNBQVFDLEdBQVIsQ0FBYSwwQkFBd0JsQixRQUFRQyxHQUFSLEVBQWMsR0FBbkQ7QUFDQUQsY0FBUW1CLElBQVIsQ0FBYSxDQUFiO0FBQ0Q7QUFDRDtBQUNBLFVBQU1DLHVCQUF1QjVCLFVBQVV3QixTQUFWLENBQTdCO0FBQ0E7QUFDQSxVQUFNUCxTQUFTLE1BQU1QLFVBQVVGLFFBQVFHLEdBQWxCLEVBQXVCaUIscUJBQXFCWCxNQUE1QyxDQUFyQjtBQUNBO0FBQ0EsVUFBTVksT0FBTyxNQUFNMUIsaUJBQWlCcUIsU0FBakIsQ0FBbkI7QUFDQTtBQUNBLFVBQU1NLFFBQVE1QixZQUFZMkIsSUFBWixFQUFrQlosTUFBbEIsQ0FBZDtBQUNBO0FBQ0EsVUFBTWMsU0FBU2IsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JkLFFBQWxCLEVBQTRCTCxVQUFVOEIsS0FBVixDQUE1QixDQUFmO0FBQ0E7QUFDQTtBQUNBLFVBQU1FLGFBQWE1QixjQUFjbUIsUUFBUVEsT0FBT0UsV0FBN0IsRUFBMENGLE1BQTFDLENBQW5CO0FBQ0EsV0FBT0MsVUFBUDtBQUNELEdBdkJLOztBQUFBO0FBQUE7QUFBQTtBQUFBLElBQU47O0FBeUJBRSxPQUFPQyxPQUFQLEdBQWlCYixTQUFqQiIsImZpbGUiOiJnZXQtY29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuY29uc3Qge3JlYWRGaWxlfSA9IHJlcXVpcmUoJ216L2ZzJylcbmNvbnN0IHtzYWZlTG9hZDogcGFyc2VZQU1MfSA9IHJlcXVpcmUoJ2pzLXlhbWwnKVxuY29uc3QgaW50ZXJwb2xhdGUgPSByZXF1aXJlKCdpbnRlcnBvbDgnKVxuY29uc3QgaW50ZXJwb2xhdGVTaGVsbCA9IHJlcXVpcmUoJy4vaW50ZXJwb2xhdGUtc2hlbGwnKVxuY29uc3QgZ2V0TW9kZUNvbmZpZyA9IHJlcXVpcmUoJy4vZ2V0LW1vZGUtY29uZmlnJylcblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gIHByb2plY3ROYW1lOiBwYXRoLmJhc2VuYW1lKHByb2Nlc3MuY3dkKCkpXG59XG5cbmNvbnN0IGdldExvY2FscyA9IChlbnYsIGxvY2Fsc0ZpbGUpID0+IHtcbiAgaWYgKGxvY2Fsc0ZpbGUgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZW52KVxuICB9XG4gIHJldHVybiByZWFkRmlsZShsb2NhbHNGaWxlKVxuICAgIC50aGVuKChsb2NhbHMpID0+IE9iamVjdC5hc3NpZ24oe30sIGVudiwgcGFyc2VZQU1MKGxvY2FscykpKVxuICAgIC5jYXRjaChlcnIgPT4gZW52KVxufVxuXG5jb25zdCBnZXRDb25maWcgPSBhc3luYyAobW9kZSkgPT4ge1xuICAvLyByZWFkIGRvcmMueWFtbFxuICBsZXQgY29uZmlnRG9jXG4gIHRyeSB7XG4gICAgY29uZmlnRG9jID0gYXdhaXQgcmVhZEZpbGUoJ2RvcmMueWFtbCcsICd1dGY4JylcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5sb2coYE5vIGRvcmMueWFtbCBmb3VuZCBhdCAke3Byb2Nlc3MuY3dkKCl9YClcbiAgICBwcm9jZXNzLmV4aXQoMSlcbiAgfVxuICAvLyBwYXJzZSBpbnRvIGpzIG9iamVjdCBzbyB3ZSBjYW4gZ2V0IGxvY2FscyBmaWxlIHBhdGhcbiAgY29uc3QgcHJlSW50ZXJwb2xhdGVDb25maWcgPSBwYXJzZVlBTUwoY29uZmlnRG9jKVxuICAvLyByZWFkIG9iamVjdCBmcm9tIGNvbmZpZy5sb2NhbHMgZmlsZSBhbmQgbWVyZ2UgaXQgd2l0aCBlbnZpcm9ubWVudCB2YXJzXG4gIGNvbnN0IGxvY2FscyA9IGF3YWl0IGdldExvY2Fscyhwcm9jZXNzLmVudiwgcHJlSW50ZXJwb2xhdGVDb25maWcubG9jYWxzKVxuICAvLyBpbnRlcnBvbGF0ZSAke3sgfX0gc2hlbGwgcGxhY2Vob2xkZXJzIGluIHJhdyBjb25maWdcbiAgY29uc3QgZG9jXyA9IGF3YWl0IGludGVycG9sYXRlU2hlbGwoY29uZmlnRG9jKVxuICAvLyBpbnRlcnBvbGF0ZSB7eyB9fSBwbGFjZWhvbGRlcnMgaW4gcmF3IGNvbmZpZ1xuICBjb25zdCBkb2NfXyA9IGludGVycG9sYXRlKGRvY18sIGxvY2FscylcbiAgLy8gcGFyc2UgaW50ZXJwb2xhdGVkIGNvbmZpZyBpbnRvIGpzIG9iamVjdFxuICBjb25zdCBjb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgcGFyc2VZQU1MKGRvY19fKSlcbiAgLy8gbWVyZ2UgY29uZmlnIG9iamVjdHMgd2l0aCBtb2RlIHNwZWNpZmljIG9iamVjdHMsXG4gIC8vICAgc28gdGhhdCB3ZSBoYXZlIG9ubHkgdGhlIGNvbmZpZyBmb3IgdGhlIGdpdmVuIG1vZGVcbiAgY29uc3QgbW9kZUNvbmZpZyA9IGdldE1vZGVDb25maWcobW9kZSB8fCBjb25maWcuZGVmYXVsdE1vZGUsIGNvbmZpZylcbiAgcmV0dXJuIG1vZGVDb25maWdcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRDb25maWdcbiJdfQ==