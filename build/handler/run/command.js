var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const R = require('ramda');
const parse = require('minimist');
const zipObjRest = R.curry(require('../../lib/zip-obj-rest'));

const dryOption = {
  dry: {
    type: 'boolean',
    description: 'print only dry run'
  }
};

const command = {
  usage: 'run [options...] <service> [cmd...]',
  description: 'run service (also accepts all docker run options)',
  options: _extends({}, dryOption),
  parse: (args, options) => {
    throw JSON.stringify(args);
    return R.over(R.lensProp('sub'), R.pipe(parse, R.converge(R.apply(R.mergeAll), [R.lensProp('_', zipObjRest(['service', 'cmd'])), v => {
      options: R.omit('_', v);
    }]))
    //R.merge(zipObjRest(['service', 'cmd'], args))
    )(args);
  }
};

module.exports = command;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVyL3J1bi9jb21tYW5kLmpzIl0sIm5hbWVzIjpbIlIiLCJyZXF1aXJlIiwicGFyc2UiLCJ6aXBPYmpSZXN0IiwiY3VycnkiLCJkcnlPcHRpb24iLCJkcnkiLCJ0eXBlIiwiZGVzY3JpcHRpb24iLCJjb21tYW5kIiwidXNhZ2UiLCJvcHRpb25zIiwiYXJncyIsIkpTT04iLCJzdHJpbmdpZnkiLCJvdmVyIiwibGVuc1Byb3AiLCJwaXBlIiwiY29udmVyZ2UiLCJhcHBseSIsIm1lcmdlQWxsIiwidiIsIm9taXQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU1BLElBQUlDLFFBQVEsT0FBUixDQUFWO0FBQ0EsTUFBTUMsUUFBUUQsUUFBUSxVQUFSLENBQWQ7QUFDQSxNQUFNRSxhQUFhSCxFQUFFSSxLQUFGLENBQVFILFFBQVEsd0JBQVIsQ0FBUixDQUFuQjs7QUFFQSxNQUFNSSxZQUFZO0FBQ2hCQyxPQUFLO0FBQ0hDLFVBQU0sU0FESDtBQUVIQyxpQkFBYTtBQUZWO0FBRFcsQ0FBbEI7O0FBT0EsTUFBTUMsVUFBVTtBQUNkQyxTQUFPLHFDQURPO0FBRWRGLGVBQWEsbURBRkM7QUFHZEcsd0JBQ0tOLFNBREwsQ0FIYztBQU1kSCxTQUFPLENBQUNVLElBQUQsRUFBT0QsT0FBUCxLQUFtQjtBQUN4QixVQUFNRSxLQUFLQyxTQUFMLENBQWVGLElBQWYsQ0FBTjtBQUNBLFdBQU9aLEVBQUVlLElBQUYsQ0FDUGYsRUFBRWdCLFFBQUYsQ0FBVyxLQUFYLENBRE8sRUFFUGhCLEVBQUVpQixJQUFGLENBQ0VmLEtBREYsRUFFRUYsRUFBRWtCLFFBQUYsQ0FDRWxCLEVBQUVtQixLQUFGLENBQVFuQixFQUFFb0IsUUFBVixDQURGLEVBRUUsQ0FDRXBCLEVBQUVnQixRQUFGLENBQVcsR0FBWCxFQUFnQmIsV0FBVyxDQUFDLFNBQUQsRUFBWSxLQUFaLENBQVgsQ0FBaEIsQ0FERixFQUVFa0IsS0FBSztBQUFDVixlQUFTWCxFQUFFc0IsSUFBRixDQUFPLEdBQVAsRUFBWUQsQ0FBWjtBQUFlLEtBRmhDLENBRkYsQ0FGRjtBQVVBO0FBWk8sTUFhUFQsSUFiTyxDQUFQO0FBY0Q7QUF0QmEsQ0FBaEI7O0FBeUJBVyxPQUFPQyxPQUFQLEdBQWlCZixPQUFqQiIsImZpbGUiOiJjb21tYW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgUiA9IHJlcXVpcmUoJ3JhbWRhJylcbmNvbnN0IHBhcnNlID0gcmVxdWlyZSgnbWluaW1pc3QnKVxuY29uc3QgemlwT2JqUmVzdCA9IFIuY3VycnkocmVxdWlyZSgnfi9saWIvemlwLW9iai1yZXN0JykpXG5cbmNvbnN0IGRyeU9wdGlvbiA9IHtcbiAgZHJ5OiB7XG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlc2NyaXB0aW9uOiAncHJpbnQgb25seSBkcnkgcnVuJ1xuICB9XG59XG5cbmNvbnN0IGNvbW1hbmQgPSB7XG4gIHVzYWdlOiAncnVuIFtvcHRpb25zLi4uXSA8c2VydmljZT4gW2NtZC4uLl0nLFxuICBkZXNjcmlwdGlvbjogJ3J1biBzZXJ2aWNlIChhbHNvIGFjY2VwdHMgYWxsIGRvY2tlciBydW4gb3B0aW9ucyknLFxuICBvcHRpb25zOiB7XG4gICAgLi4uZHJ5T3B0aW9uXG4gIH0sXG4gIHBhcnNlOiAoYXJncywgb3B0aW9ucykgPT4ge1xuICAgIHRocm93KEpTT04uc3RyaW5naWZ5KGFyZ3MpKVxuICAgIHJldHVybiBSLm92ZXIoXG4gICAgUi5sZW5zUHJvcCgnc3ViJyksXG4gICAgUi5waXBlKFxuICAgICAgcGFyc2UsXG4gICAgICBSLmNvbnZlcmdlKFxuICAgICAgICBSLmFwcGx5KFIubWVyZ2VBbGwpLFxuICAgICAgICBbXG4gICAgICAgICAgUi5sZW5zUHJvcCgnXycsIHppcE9ialJlc3QoWydzZXJ2aWNlJywgJ2NtZCddKSksXG4gICAgICAgICAgdiA9PiB7b3B0aW9uczogUi5vbWl0KCdfJywgdil9XG4gICAgICAgIF1cbiAgICAgIClcbiAgICApXG4gICAgLy9SLm1lcmdlKHppcE9ialJlc3QoWydzZXJ2aWNlJywgJ2NtZCddLCBhcmdzKSlcbiAgKShhcmdzKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29tbWFuZFxuIl19