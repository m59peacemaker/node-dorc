const R = require('ramda');
const moveProps = require('../../lib/move-props');
const mergeProps = require('../../lib/merge-props');

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

const transformDockerOptions = R.pipe(R.toPairs, R.map(([key, value]) => getTransform(key)(value, key)), R.flatten);

// options may contain any docker run options
const makeRunArgs = (service, options = {}) => R.pipe(moveProps(dorcArgs, R.lensProp('service'), R.lensProp('dorc')), // move non-docker-run keys
mergeProps(['service', 'options'], R.lensProp('options')), // the rest are docker run args
R.over(R.lensProp('options'), transformDockerOptions), R.converge((cmd, options) => {
  return cmd ? R.append(cmd)(options) : options;
}, [R.path(['dorc', 'cmd']), R.prop('options')]))({ service, options });
/*  R.pipe(
    R.map(([key, value]) => getTransform(key)(value, key)),
    R.flatten
    //R.ifElse(() => R.isNil(detached.name), R.identity, R.assoc('name', name)),
    //R.toPairs
  )({service, options})
  const _options = dockerRunProps.map(([key, value]) => {
    return getTransform(key)(value, key)
  })
  const cmd = R.ifElse(R.isNil, R.F, R.identity)(service.cmd)
  const detachedArg = R.ifElse(R.equals(false), R.identity, R.always('-d'))(detached)
  const args = R.flatten(['-it', detachedArg, options, service.image, cmd])
    .filter(v => v)
  return args
}*/

module.exports = makeRunArgs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbWRzL3J1bi9tYWtlLXJ1bi1hcmdzLmpzIl0sIm5hbWVzIjpbIlIiLCJyZXF1aXJlIiwibW92ZVByb3BzIiwibWVyZ2VQcm9wcyIsImRvcmNBcmdzIiwicHJvcFRyYW5zZm9ybXMiLCJ2b2x1bWVzIiwidmFsdWUiLCJtYXAiLCJ2IiwicGF0aCIsImlzQWJzb2x1dGUiLCJqb2luIiwicHJvY2VzcyIsImN3ZCIsImVudiIsInRvUGFpcnMiLCJrIiwicG9ydHMiLCJnZXRUcmFuc2Zvcm0iLCJwcm9wIiwidHJhbnNmb3JtIiwiQXJyYXkiLCJpc0FycmF5IiwidHJhbnNmb3JtRG9ja2VyT3B0aW9ucyIsInBpcGUiLCJrZXkiLCJmbGF0dGVuIiwibWFrZVJ1bkFyZ3MiLCJzZXJ2aWNlIiwib3B0aW9ucyIsImxlbnNQcm9wIiwib3ZlciIsImNvbnZlcmdlIiwiY21kIiwiYXBwZW5kIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTUEsSUFBSUMsUUFBUSxPQUFSLENBQVY7QUFDQSxNQUFNQyxZQUFZRCxRQUFRLHNCQUFSLENBQWxCO0FBQ0EsTUFBTUUsYUFBYUYsUUFBUSx1QkFBUixDQUFuQjs7QUFFQSxNQUFNRyxXQUFXLENBQ2YsTUFEZSxFQUVmLE9BRmUsRUFHZixPQUhlLEVBSWYsS0FKZSxDQUFqQjs7QUFPQSxNQUFNQyxpQkFBaUI7QUFDckJDLFdBQVNDLFNBQVM7QUFDaEIsV0FBT0EsTUFBTUMsR0FBTixDQUFVQyxLQUFLO0FBQ3BCLFVBQUksQ0FBQ0MsS0FBS0MsVUFBTCxDQUFnQkYsQ0FBaEIsQ0FBTCxFQUF5QjtBQUN2QixlQUFPLENBQUMsSUFBRCxFQUFPQyxLQUFLRSxJQUFMLENBQVVDLFFBQVFDLEdBQVIsRUFBVixFQUF5QkwsQ0FBekIsQ0FBUCxDQUFQO0FBQ0Q7QUFDRCxhQUFPLENBQUMsSUFBRCxFQUFPRixLQUFQLENBQVA7QUFDRCxLQUxNLENBQVA7QUFNRCxHQVJvQjtBQVNyQlEsT0FBS1IsU0FBU1AsRUFBRWdCLE9BQUYsQ0FBVVQsS0FBVixFQUFpQkMsR0FBakIsQ0FBcUIsQ0FBQyxDQUFDUyxDQUFELEVBQUlSLENBQUosQ0FBRCxLQUFZLENBQUMsSUFBRCxFQUFRLElBQUVRLENBQUUsTUFBR1IsQ0FBRSxHQUFqQixDQUFqQyxDQVRPO0FBVXJCUyxTQUFPWCxTQUFTQSxNQUFNQyxHQUFOLENBQVVDLEtBQUssQ0FBQyxJQUFELEVBQU9BLENBQVAsQ0FBZjtBQVZLLENBQXZCOztBQWFBLE1BQU1VLGVBQWVDLFFBQVE7QUFDM0IsUUFBTUMsWUFBWWhCLGVBQWVlLElBQWYsQ0FBbEI7QUFDQSxNQUFJLENBQUNDLFNBQUwsRUFBZ0I7QUFDZCxXQUFPLENBQUNkLEtBQUQsRUFBUWEsSUFBUixLQUFpQjtBQUN0QixVQUFJRSxNQUFNQyxPQUFOLENBQWNoQixLQUFkLENBQUosRUFBMEI7QUFDeEIsZUFBT0EsTUFBTUMsR0FBTixDQUFVQyxLQUFLLENBQUMsT0FBT1csSUFBUixFQUFjWCxDQUFkLENBQWYsQ0FBUDtBQUNELE9BRkQsTUFFTztBQUNMLGVBQU8sQ0FBQyxPQUFPVyxJQUFSLEVBQWNiLEtBQWQsQ0FBUDtBQUNEO0FBQ0YsS0FORDtBQU9ELEdBUkQsTUFRTztBQUNMLFdBQU9jLFNBQVA7QUFDRDtBQUNGLENBYkQ7O0FBZUEsTUFBTUcseUJBQXlCeEIsRUFBRXlCLElBQUYsQ0FDN0J6QixFQUFFZ0IsT0FEMkIsRUFFN0JoQixFQUFFUSxHQUFGLENBQU0sQ0FBQyxDQUFDa0IsR0FBRCxFQUFNbkIsS0FBTixDQUFELEtBQWtCWSxhQUFhTyxHQUFiLEVBQWtCbkIsS0FBbEIsRUFBeUJtQixHQUF6QixDQUF4QixDQUY2QixFQUc3QjFCLEVBQUUyQixPQUgyQixDQUEvQjs7QUFNQTtBQUNBLE1BQU1DLGNBQWMsQ0FBQ0MsT0FBRCxFQUFVQyxVQUFVLEVBQXBCLEtBQTJCOUIsRUFBRXlCLElBQUYsQ0FDN0N2QixVQUFVRSxRQUFWLEVBQW9CSixFQUFFK0IsUUFBRixDQUFXLFNBQVgsQ0FBcEIsRUFBMkMvQixFQUFFK0IsUUFBRixDQUFXLE1BQVgsQ0FBM0MsQ0FENkMsRUFDbUI7QUFDaEU1QixXQUFXLENBQUMsU0FBRCxFQUFZLFNBQVosQ0FBWCxFQUFtQ0gsRUFBRStCLFFBQUYsQ0FBVyxTQUFYLENBQW5DLENBRjZDLEVBRWM7QUFDM0QvQixFQUFFZ0MsSUFBRixDQUFPaEMsRUFBRStCLFFBQUYsQ0FBVyxTQUFYLENBQVAsRUFBOEJQLHNCQUE5QixDQUg2QyxFQUk3Q3hCLEVBQUVpQyxRQUFGLENBQ0UsQ0FBQ0MsR0FBRCxFQUFNSixPQUFOLEtBQWtCO0FBQ2hCLFNBQU9JLE1BQU1sQyxFQUFFbUMsTUFBRixDQUFTRCxHQUFULEVBQWNKLE9BQWQsQ0FBTixHQUErQkEsT0FBdEM7QUFDRCxDQUhILEVBR0ssQ0FDRDlCLEVBQUVVLElBQUYsQ0FBTyxDQUFDLE1BQUQsRUFBUyxLQUFULENBQVAsQ0FEQyxFQUVEVixFQUFFb0IsSUFBRixDQUFPLFNBQVAsQ0FGQyxDQUhMLENBSjZDLEVBWTdDLEVBQUNTLE9BQUQsRUFBVUMsT0FBVixFQVo2QyxDQUEvQztBQWFBOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBTSxPQUFPQyxPQUFQLEdBQWlCVCxXQUFqQiIsImZpbGUiOiJtYWtlLXJ1bi1hcmdzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgUiA9IHJlcXVpcmUoJ3JhbWRhJylcbmNvbnN0IG1vdmVQcm9wcyA9IHJlcXVpcmUoJ34vbGliL21vdmUtcHJvcHMnKVxuY29uc3QgbWVyZ2VQcm9wcyA9IHJlcXVpcmUoJ34vbGliL21lcmdlLXByb3BzJylcblxuY29uc3QgZG9yY0FyZ3MgPSBbXG4gICdtb2RlJyxcbiAgJ2hvb2tzJyxcbiAgJ2ltYWdlJyxcbiAgJ2NtZCdcbl1cblxuY29uc3QgcHJvcFRyYW5zZm9ybXMgPSB7XG4gIHZvbHVtZXM6IHZhbHVlID0+IHtcbiAgICByZXR1cm4gdmFsdWUubWFwKHYgPT4ge1xuICAgICAgaWYgKCFwYXRoLmlzQWJzb2x1dGUodikpIHtcbiAgICAgICAgcmV0dXJuIFsnLXYnLCBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgdildXG4gICAgICB9XG4gICAgICByZXR1cm4gWyctdicsIHZhbHVlXVxuICAgIH0pXG4gIH0sXG4gIGVudjogdmFsdWUgPT4gUi50b1BhaXJzKHZhbHVlKS5tYXAoKFtrLCB2XSkgPT4gWyctZScsIGAke2t9PSR7dn1gXSksXG4gIHBvcnRzOiB2YWx1ZSA9PiB2YWx1ZS5tYXAodiA9PiBbJy1wJywgdl0pXG59XG5cbmNvbnN0IGdldFRyYW5zZm9ybSA9IHByb3AgPT4ge1xuICBjb25zdCB0cmFuc2Zvcm0gPSBwcm9wVHJhbnNmb3Jtc1twcm9wXVxuICBpZiAoIXRyYW5zZm9ybSkge1xuICAgIHJldHVybiAodmFsdWUsIHByb3ApID0+IHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gdmFsdWUubWFwKHYgPT4gWyctLScgKyBwcm9wLCB2XSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbJy0tJyArIHByb3AsIHZhbHVlXVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdHJhbnNmb3JtXG4gIH1cbn1cblxuY29uc3QgdHJhbnNmb3JtRG9ja2VyT3B0aW9ucyA9IFIucGlwZShcbiAgUi50b1BhaXJzLFxuICBSLm1hcCgoW2tleSwgdmFsdWVdKSA9PiBnZXRUcmFuc2Zvcm0oa2V5KSh2YWx1ZSwga2V5KSksXG4gIFIuZmxhdHRlblxuKVxuXG4vLyBvcHRpb25zIG1heSBjb250YWluIGFueSBkb2NrZXIgcnVuIG9wdGlvbnNcbmNvbnN0IG1ha2VSdW5BcmdzID0gKHNlcnZpY2UsIG9wdGlvbnMgPSB7fSkgPT4gUi5waXBlKFxuICBtb3ZlUHJvcHMoZG9yY0FyZ3MsIFIubGVuc1Byb3AoJ3NlcnZpY2UnKSwgUi5sZW5zUHJvcCgnZG9yYycpKSwgLy8gbW92ZSBub24tZG9ja2VyLXJ1biBrZXlzXG4gIG1lcmdlUHJvcHMoWydzZXJ2aWNlJywgJ29wdGlvbnMnXSwgUi5sZW5zUHJvcCgnb3B0aW9ucycpKSwgLy8gdGhlIHJlc3QgYXJlIGRvY2tlciBydW4gYXJnc1xuICBSLm92ZXIoUi5sZW5zUHJvcCgnb3B0aW9ucycpLCB0cmFuc2Zvcm1Eb2NrZXJPcHRpb25zKSxcbiAgUi5jb252ZXJnZShcbiAgICAoY21kLCBvcHRpb25zKSA9PiB7XG4gICAgICByZXR1cm4gY21kID8gUi5hcHBlbmQoY21kKShvcHRpb25zKSA6IG9wdGlvbnNcbiAgICB9LCBbXG4gICAgICBSLnBhdGgoWydkb3JjJywgJ2NtZCddKSxcbiAgICAgIFIucHJvcCgnb3B0aW9ucycpXG4gICAgXVxuICApXG4pKHtzZXJ2aWNlLCBvcHRpb25zfSlcbi8qICBSLnBpcGUoXG4gICAgUi5tYXAoKFtrZXksIHZhbHVlXSkgPT4gZ2V0VHJhbnNmb3JtKGtleSkodmFsdWUsIGtleSkpLFxuICAgIFIuZmxhdHRlblxuICAgIC8vUi5pZkVsc2UoKCkgPT4gUi5pc05pbChkZXRhY2hlZC5uYW1lKSwgUi5pZGVudGl0eSwgUi5hc3NvYygnbmFtZScsIG5hbWUpKSxcbiAgICAvL1IudG9QYWlyc1xuICApKHtzZXJ2aWNlLCBvcHRpb25zfSlcbiAgY29uc3QgX29wdGlvbnMgPSBkb2NrZXJSdW5Qcm9wcy5tYXAoKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgIHJldHVybiBnZXRUcmFuc2Zvcm0oa2V5KSh2YWx1ZSwga2V5KVxuICB9KVxuICBjb25zdCBjbWQgPSBSLmlmRWxzZShSLmlzTmlsLCBSLkYsIFIuaWRlbnRpdHkpKHNlcnZpY2UuY21kKVxuICBjb25zdCBkZXRhY2hlZEFyZyA9IFIuaWZFbHNlKFIuZXF1YWxzKGZhbHNlKSwgUi5pZGVudGl0eSwgUi5hbHdheXMoJy1kJykpKGRldGFjaGVkKVxuICBjb25zdCBhcmdzID0gUi5mbGF0dGVuKFsnLWl0JywgZGV0YWNoZWRBcmcsIG9wdGlvbnMsIHNlcnZpY2UuaW1hZ2UsIGNtZF0pXG4gICAgLmZpbHRlcih2ID0+IHYpXG4gIHJldHVybiBhcmdzXG59Ki9cblxubW9kdWxlLmV4cG9ydHMgPSBtYWtlUnVuQXJnc1xuIl19