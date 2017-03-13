var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const R = require('ramda');
const minimist = require('minimist');
const dockerRunOptions = require('./docker-run-options');
const keysMatching = require('../../lib/keys-matching');
const mapKeys = require('../../lib/map-keys');
const zipObjRest = R.curry(require('../../lib/zip-obj-rest'));
const prepOptionsForMinimist = require('../../lib/prep-options-for-minimist');

const separateDockerOpts = (dorcOpts, mixedOpts) => {
  const toFix = keysMatching(/^no-/, dockerRunOptions).map(v => v.replace(/^no-/, ''));
  const fixed = R.pipe(R.pick(toFix), mapKeys(k => 'no-' + k), R.map(R.not))(mixedOpts);
  return {
    options: R.pick(R.keys(dorcOpts), mixedOpts),
    docker: R.pipe(R.pick(R.keys(dockerRunOptions)), R.reject(R.equals(false)), R.merge(fixed))(mixedOpts)
  };
};

const parse = (args, options) => {
  const minimistOpts = prepOptionsForMinimist(R.mergeAll([options, dockerRunOptions]));

  var _minimist = minimist(args, _extends({}, minimistOpts, { stopEarly: true }));

  const remaining = _minimist._,
        parsed = _objectWithoutProperties(_minimist, ['_']);

  const separate = separateDockerOpts(options, parsed);

  var _remaining = _toArray(remaining);

  const service = _remaining[0],
        cmd = _remaining.slice(1);

  return _extends({ service, cmd }, separate);
};

module.exports = parse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVyL3J1bi9wYXJzZS5qcyJdLCJuYW1lcyI6WyJSIiwicmVxdWlyZSIsIm1pbmltaXN0IiwiZG9ja2VyUnVuT3B0aW9ucyIsImtleXNNYXRjaGluZyIsIm1hcEtleXMiLCJ6aXBPYmpSZXN0IiwiY3VycnkiLCJwcmVwT3B0aW9uc0Zvck1pbmltaXN0Iiwic2VwYXJhdGVEb2NrZXJPcHRzIiwiZG9yY09wdHMiLCJtaXhlZE9wdHMiLCJ0b0ZpeCIsIm1hcCIsInYiLCJyZXBsYWNlIiwiZml4ZWQiLCJwaXBlIiwicGljayIsImsiLCJub3QiLCJvcHRpb25zIiwia2V5cyIsImRvY2tlciIsInJlamVjdCIsImVxdWFscyIsIm1lcmdlIiwicGFyc2UiLCJhcmdzIiwibWluaW1pc3RPcHRzIiwibWVyZ2VBbGwiLCJzdG9wRWFybHkiLCJyZW1haW5pbmciLCJfIiwicGFyc2VkIiwic2VwYXJhdGUiLCJzZXJ2aWNlIiwiY21kIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsTUFBTUEsSUFBSUMsUUFBUSxPQUFSLENBQVY7QUFDQSxNQUFNQyxXQUFXRCxRQUFRLFVBQVIsQ0FBakI7QUFDQSxNQUFNRSxtQkFBbUJGLFFBQVEsc0JBQVIsQ0FBekI7QUFDQSxNQUFNRyxlQUFlSCxRQUFRLHlCQUFSLENBQXJCO0FBQ0EsTUFBTUksVUFBVUosUUFBUSxvQkFBUixDQUFoQjtBQUNBLE1BQU1LLGFBQWFOLEVBQUVPLEtBQUYsQ0FBUU4sUUFBUSx3QkFBUixDQUFSLENBQW5CO0FBQ0EsTUFBTU8seUJBQXlCUCxRQUFRLHFDQUFSLENBQS9COztBQUVBLE1BQU1RLHFCQUFxQixDQUFDQyxRQUFELEVBQVdDLFNBQVgsS0FBeUI7QUFDbEQsUUFBTUMsUUFBUVIsYUFBYSxNQUFiLEVBQXFCRCxnQkFBckIsRUFBdUNVLEdBQXZDLENBQTJDQyxLQUFLQSxFQUFFQyxPQUFGLENBQVUsTUFBVixFQUFrQixFQUFsQixDQUFoRCxDQUFkO0FBQ0EsUUFBTUMsUUFBUWhCLEVBQUVpQixJQUFGLENBQ1pqQixFQUFFa0IsSUFBRixDQUFPTixLQUFQLENBRFksRUFFWlAsUUFBUWMsS0FBSyxRQUFRQSxDQUFyQixDQUZZLEVBR1puQixFQUFFYSxHQUFGLENBQU1iLEVBQUVvQixHQUFSLENBSFksRUFJWlQsU0FKWSxDQUFkO0FBS0EsU0FBTztBQUNMVSxhQUFTckIsRUFBRWtCLElBQUYsQ0FBT2xCLEVBQUVzQixJQUFGLENBQU9aLFFBQVAsQ0FBUCxFQUF5QkMsU0FBekIsQ0FESjtBQUVMWSxZQUFRdkIsRUFBRWlCLElBQUYsQ0FDTmpCLEVBQUVrQixJQUFGLENBQU9sQixFQUFFc0IsSUFBRixDQUFPbkIsZ0JBQVAsQ0FBUCxDQURNLEVBRU5ILEVBQUV3QixNQUFGLENBQVN4QixFQUFFeUIsTUFBRixDQUFTLEtBQVQsQ0FBVCxDQUZNLEVBR056QixFQUFFMEIsS0FBRixDQUFRVixLQUFSLENBSE0sRUFJTkwsU0FKTTtBQUZILEdBQVA7QUFRRCxDQWZEOztBQWlCQSxNQUFNZ0IsUUFBUSxDQUFDQyxJQUFELEVBQU9QLE9BQVAsS0FBbUI7QUFDL0IsUUFBTVEsZUFBZXJCLHVCQUF1QlIsRUFBRThCLFFBQUYsQ0FBVyxDQUFDVCxPQUFELEVBQVVsQixnQkFBVixDQUFYLENBQXZCLENBQXJCOztBQUQrQixrQkFFR0QsU0FBUzBCLElBQVQsZUFBbUJDLFlBQW5CLElBQWlDRSxXQUFXLElBQTVDLElBRkg7O0FBQUEsUUFFckJDLFNBRnFCLGFBRXhCQyxDQUZ3QjtBQUFBLFFBRVBDLE1BRk87O0FBRy9CLFFBQU1DLFdBQVcxQixtQkFBbUJZLE9BQW5CLEVBQTRCYSxNQUE1QixDQUFqQjs7QUFIK0IsNEJBSUxGLFNBSks7O0FBQUEsUUFJeEJJLE9BSndCO0FBQUEsUUFJWkMsR0FKWTs7QUFLL0Isb0JBQVFELE9BQVIsRUFBaUJDLEdBQWpCLElBQXlCRixRQUF6QjtBQUNELENBTkQ7O0FBUUFHLE9BQU9DLE9BQVAsR0FBaUJaLEtBQWpCIiwiZmlsZSI6InBhcnNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgUiA9IHJlcXVpcmUoJ3JhbWRhJylcbmNvbnN0IG1pbmltaXN0ID0gcmVxdWlyZSgnbWluaW1pc3QnKVxuY29uc3QgZG9ja2VyUnVuT3B0aW9ucyA9IHJlcXVpcmUoJy4vZG9ja2VyLXJ1bi1vcHRpb25zJylcbmNvbnN0IGtleXNNYXRjaGluZyA9IHJlcXVpcmUoJ34vbGliL2tleXMtbWF0Y2hpbmcnKVxuY29uc3QgbWFwS2V5cyA9IHJlcXVpcmUoJ34vbGliL21hcC1rZXlzJylcbmNvbnN0IHppcE9ialJlc3QgPSBSLmN1cnJ5KHJlcXVpcmUoJ34vbGliL3ppcC1vYmotcmVzdCcpKVxuY29uc3QgcHJlcE9wdGlvbnNGb3JNaW5pbWlzdCA9IHJlcXVpcmUoJ34vbGliL3ByZXAtb3B0aW9ucy1mb3ItbWluaW1pc3QnKVxuXG5jb25zdCBzZXBhcmF0ZURvY2tlck9wdHMgPSAoZG9yY09wdHMsIG1peGVkT3B0cykgPT4ge1xuICBjb25zdCB0b0ZpeCA9IGtleXNNYXRjaGluZygvXm5vLS8sIGRvY2tlclJ1bk9wdGlvbnMpLm1hcCh2ID0+IHYucmVwbGFjZSgvXm5vLS8sICcnKSlcbiAgY29uc3QgZml4ZWQgPSBSLnBpcGUoXG4gICAgUi5waWNrKHRvRml4KSxcbiAgICBtYXBLZXlzKGsgPT4gJ25vLScgKyBrKSxcbiAgICBSLm1hcChSLm5vdClcbiAgKShtaXhlZE9wdHMpXG4gIHJldHVybiB7XG4gICAgb3B0aW9uczogUi5waWNrKFIua2V5cyhkb3JjT3B0cyksIG1peGVkT3B0cyksXG4gICAgZG9ja2VyOiBSLnBpcGUoXG4gICAgICBSLnBpY2soUi5rZXlzKGRvY2tlclJ1bk9wdGlvbnMpKSxcbiAgICAgIFIucmVqZWN0KFIuZXF1YWxzKGZhbHNlKSksXG4gICAgICBSLm1lcmdlKGZpeGVkKVxuICAgICkobWl4ZWRPcHRzKVxuICB9XG59XG5cbmNvbnN0IHBhcnNlID0gKGFyZ3MsIG9wdGlvbnMpID0+IHtcbiAgY29uc3QgbWluaW1pc3RPcHRzID0gcHJlcE9wdGlvbnNGb3JNaW5pbWlzdChSLm1lcmdlQWxsKFtvcHRpb25zLCBkb2NrZXJSdW5PcHRpb25zXSkpXG4gIGNvbnN0IHtfOiByZW1haW5pbmcsIC4uLnBhcnNlZH0gPSBtaW5pbWlzdChhcmdzLCB7Li4ubWluaW1pc3RPcHRzLCBzdG9wRWFybHk6IHRydWV9KVxuICBjb25zdCBzZXBhcmF0ZSA9IHNlcGFyYXRlRG9ja2VyT3B0cyhvcHRpb25zLCBwYXJzZWQpXG4gIGNvbnN0IFtzZXJ2aWNlLCAuLi5jbWRdID0gcmVtYWluaW5nXG4gIHJldHVybiB7c2VydmljZSwgY21kLCAuLi5zZXBhcmF0ZX1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwYXJzZVxuIl19