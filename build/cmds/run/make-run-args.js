var _require = require('path');

const joinPath = _require.join,
      isAbsolutePath = _require.isAbsolute;

var _require2 = require('os');

const getHomedir = _require2.homedir;

const R = require('ramda');
const expandTilde = require('expand-tilde');
const moveProps = require('../../lib/move-props');
const mergeProps = require('../../lib/merge-props');
const transformDockerOptions = require('../../lib/transform-docker-options');

const dorcArgs = ['mode', 'hooks', 'image', 'cmd'];

const propTransforms = {
  volumes: (value, prop, dirs) => {
    return value.map(v => {
      v = expandTilde(v, dirs.homedir);
      if (!isAbsolutePath(v)) {
        return ['-v', joinPath(dirs.cwd, v)];
      } else {
        return ['-v', v];
      }
    });
  },
  env: value => R.toPairs(value).map(([k, v]) => ['-e', `${ k }="${ v }"`]),
  ports: value => value.map(v => ['-p', v])
};

// options may contain any docker run options
const makeRunArgs = (service, options = {}, dirs = {
  cwd: process.cwd(),
  homedir: getHomedir()
}) => {
  if (!service.image) {
    throw new Error('service image is required');
  }
  return R.pipe(
  // move props that aren't for docker run
  moveProps(dorcArgs, R.lensProp('service'), R.lensProp('dorc')), mergeProps(['service', 'options'], R.lensProp('options')), // the rest are docker run args
  R.over(R.lensProp('options'), transformDockerOptions(propTransforms, dirs)), R.converge((dorc, options) => {
    return R.pipe(R.pick(['image', 'cmd']), R.values, R.concat(options))(dorc);
  }, [R.prop('dorc'), R.prop('options')]))({ service, options });
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbWRzL3J1bi9tYWtlLXJ1bi1hcmdzLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJqb2luUGF0aCIsImpvaW4iLCJpc0Fic29sdXRlUGF0aCIsImlzQWJzb2x1dGUiLCJnZXRIb21lZGlyIiwiaG9tZWRpciIsIlIiLCJleHBhbmRUaWxkZSIsIm1vdmVQcm9wcyIsIm1lcmdlUHJvcHMiLCJ0cmFuc2Zvcm1Eb2NrZXJPcHRpb25zIiwiZG9yY0FyZ3MiLCJwcm9wVHJhbnNmb3JtcyIsInZvbHVtZXMiLCJ2YWx1ZSIsInByb3AiLCJkaXJzIiwibWFwIiwidiIsImN3ZCIsImVudiIsInRvUGFpcnMiLCJrIiwicG9ydHMiLCJtYWtlUnVuQXJncyIsInNlcnZpY2UiLCJvcHRpb25zIiwicHJvY2VzcyIsImltYWdlIiwiRXJyb3IiLCJwaXBlIiwibGVuc1Byb3AiLCJvdmVyIiwiY29udmVyZ2UiLCJkb3JjIiwicGljayIsInZhbHVlcyIsImNvbmNhdCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJlQUdJQSxRQUFRLE1BQVIsQzs7TUFGSUMsUSxZQUFOQyxJO01BQ1lDLGMsWUFBWkMsVTs7Z0JBRTRCSixRQUFRLElBQVIsQzs7TUFBZEssVSxhQUFUQyxPOztBQUNQLE1BQU1DLElBQUlQLFFBQVEsT0FBUixDQUFWO0FBQ0EsTUFBTVEsY0FBY1IsUUFBUSxjQUFSLENBQXBCO0FBQ0EsTUFBTVMsWUFBWVQsUUFBUSxzQkFBUixDQUFsQjtBQUNBLE1BQU1VLGFBQWFWLFFBQVEsdUJBQVIsQ0FBbkI7QUFDQSxNQUFNVyx5QkFBeUJYLFFBQVEsb0NBQVIsQ0FBL0I7O0FBRUEsTUFBTVksV0FBVyxDQUNmLE1BRGUsRUFFZixPQUZlLEVBR2YsT0FIZSxFQUlmLEtBSmUsQ0FBakI7O0FBT0EsTUFBTUMsaUJBQWlCO0FBQ3JCQyxXQUFTLENBQUNDLEtBQUQsRUFBUUMsSUFBUixFQUFjQyxJQUFkLEtBQXVCO0FBQzlCLFdBQU9GLE1BQU1HLEdBQU4sQ0FBVUMsS0FBSztBQUNwQkEsVUFBSVgsWUFBWVcsQ0FBWixFQUFlRixLQUFLWCxPQUFwQixDQUFKO0FBQ0EsVUFBSSxDQUFDSCxlQUFlZ0IsQ0FBZixDQUFMLEVBQXdCO0FBQ3RCLGVBQU8sQ0FBQyxJQUFELEVBQU9sQixTQUFTZ0IsS0FBS0csR0FBZCxFQUFtQkQsQ0FBbkIsQ0FBUCxDQUFQO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsZUFBTyxDQUFDLElBQUQsRUFBT0EsQ0FBUCxDQUFQO0FBQ0Q7QUFDRixLQVBNLENBQVA7QUFRRCxHQVZvQjtBQVdyQkUsT0FBS04sU0FBU1IsRUFBRWUsT0FBRixDQUFVUCxLQUFWLEVBQWlCRyxHQUFqQixDQUFxQixDQUFDLENBQUNLLENBQUQsRUFBSUosQ0FBSixDQUFELEtBQVksQ0FBQyxJQUFELEVBQVEsSUFBRUksQ0FBRSxPQUFJSixDQUFFLElBQWxCLENBQWpDLENBWE87QUFZckJLLFNBQU9ULFNBQVNBLE1BQU1HLEdBQU4sQ0FBVUMsS0FBSyxDQUFDLElBQUQsRUFBT0EsQ0FBUCxDQUFmO0FBWkssQ0FBdkI7O0FBZUE7QUFDQSxNQUFNTSxjQUFjLENBQ2xCQyxPQURrQixFQUVsQkMsVUFBVSxFQUZRLEVBR2xCVixPQUFPO0FBQ0xHLE9BQUtRLFFBQVFSLEdBQVIsRUFEQTtBQUVMZCxXQUFTRDtBQUZKLENBSFcsS0FPZjtBQUNILE1BQUksQ0FBQ3FCLFFBQVFHLEtBQWIsRUFBb0I7QUFDbEIsVUFBTSxJQUFJQyxLQUFKLENBQVUsMkJBQVYsQ0FBTjtBQUNEO0FBQ0QsU0FBT3ZCLEVBQUV3QixJQUFGO0FBQ0w7QUFDQXRCLFlBQVVHLFFBQVYsRUFBb0JMLEVBQUV5QixRQUFGLENBQVcsU0FBWCxDQUFwQixFQUEyQ3pCLEVBQUV5QixRQUFGLENBQVcsTUFBWCxDQUEzQyxDQUZLLEVBR0x0QixXQUFXLENBQUMsU0FBRCxFQUFZLFNBQVosQ0FBWCxFQUFtQ0gsRUFBRXlCLFFBQUYsQ0FBVyxTQUFYLENBQW5DLENBSEssRUFHc0Q7QUFDM0R6QixJQUFFMEIsSUFBRixDQUFPMUIsRUFBRXlCLFFBQUYsQ0FBVyxTQUFYLENBQVAsRUFBOEJyQix1QkFBdUJFLGNBQXZCLEVBQXVDSSxJQUF2QyxDQUE5QixDQUpLLEVBS0xWLEVBQUUyQixRQUFGLENBQ0UsQ0FBQ0MsSUFBRCxFQUFPUixPQUFQLEtBQW1CO0FBQ2pCLFdBQU9wQixFQUFFd0IsSUFBRixDQUNMeEIsRUFBRTZCLElBQUYsQ0FBTyxDQUFDLE9BQUQsRUFBVSxLQUFWLENBQVAsQ0FESyxFQUVMN0IsRUFBRThCLE1BRkcsRUFHTDlCLEVBQUUrQixNQUFGLENBQVNYLE9BQVQsQ0FISyxFQUlMUSxJQUpLLENBQVA7QUFLRCxHQVBILEVBT0ssQ0FDRDVCLEVBQUVTLElBQUYsQ0FBTyxNQUFQLENBREMsRUFFRFQsRUFBRVMsSUFBRixDQUFPLFNBQVAsQ0FGQyxDQVBMLENBTEssRUFpQkwsRUFBQ1UsT0FBRCxFQUFVQyxPQUFWLEVBakJLLENBQVA7QUFrQkQsQ0E3QkQ7QUE4QkE7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkFZLE9BQU9DLE9BQVAsR0FBaUJmLFdBQWpCIiwiZmlsZSI6Im1ha2UtcnVuLWFyZ3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7XG4gIGpvaW46IGpvaW5QYXRoLFxuICBpc0Fic29sdXRlOiBpc0Fic29sdXRlUGF0aFxufSA9IHJlcXVpcmUoJ3BhdGgnKVxuY29uc3Qge2hvbWVkaXI6IGdldEhvbWVkaXJ9ID0gcmVxdWlyZSgnb3MnKVxuY29uc3QgUiA9IHJlcXVpcmUoJ3JhbWRhJylcbmNvbnN0IGV4cGFuZFRpbGRlID0gcmVxdWlyZSgnZXhwYW5kLXRpbGRlJylcbmNvbnN0IG1vdmVQcm9wcyA9IHJlcXVpcmUoJ34vbGliL21vdmUtcHJvcHMnKVxuY29uc3QgbWVyZ2VQcm9wcyA9IHJlcXVpcmUoJ34vbGliL21lcmdlLXByb3BzJylcbmNvbnN0IHRyYW5zZm9ybURvY2tlck9wdGlvbnMgPSByZXF1aXJlKCd+L2xpYi90cmFuc2Zvcm0tZG9ja2VyLW9wdGlvbnMnKVxuXG5jb25zdCBkb3JjQXJncyA9IFtcbiAgJ21vZGUnLFxuICAnaG9va3MnLFxuICAnaW1hZ2UnLFxuICAnY21kJ1xuXVxuXG5jb25zdCBwcm9wVHJhbnNmb3JtcyA9IHtcbiAgdm9sdW1lczogKHZhbHVlLCBwcm9wLCBkaXJzKSA9PiB7XG4gICAgcmV0dXJuIHZhbHVlLm1hcCh2ID0+IHtcbiAgICAgIHYgPSBleHBhbmRUaWxkZSh2LCBkaXJzLmhvbWVkaXIpXG4gICAgICBpZiAoIWlzQWJzb2x1dGVQYXRoKHYpKSB7XG4gICAgICAgIHJldHVybiBbJy12Jywgam9pblBhdGgoZGlycy5jd2QsIHYpXVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFsnLXYnLCB2XVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIGVudjogdmFsdWUgPT4gUi50b1BhaXJzKHZhbHVlKS5tYXAoKFtrLCB2XSkgPT4gWyctZScsIGAke2t9PVwiJHt2fVwiYF0pLFxuICBwb3J0czogdmFsdWUgPT4gdmFsdWUubWFwKHYgPT4gWyctcCcsIHZdKVxufVxuXG4vLyBvcHRpb25zIG1heSBjb250YWluIGFueSBkb2NrZXIgcnVuIG9wdGlvbnNcbmNvbnN0IG1ha2VSdW5BcmdzID0gKFxuICBzZXJ2aWNlLFxuICBvcHRpb25zID0ge30sXG4gIGRpcnMgPSB7XG4gICAgY3dkOiBwcm9jZXNzLmN3ZCgpLFxuICAgIGhvbWVkaXI6IGdldEhvbWVkaXIoKVxuICB9XG4pID0+IHtcbiAgaWYgKCFzZXJ2aWNlLmltYWdlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXJ2aWNlIGltYWdlIGlzIHJlcXVpcmVkJylcbiAgfVxuICByZXR1cm4gUi5waXBlKFxuICAgIC8vIG1vdmUgcHJvcHMgdGhhdCBhcmVuJ3QgZm9yIGRvY2tlciBydW5cbiAgICBtb3ZlUHJvcHMoZG9yY0FyZ3MsIFIubGVuc1Byb3AoJ3NlcnZpY2UnKSwgUi5sZW5zUHJvcCgnZG9yYycpKSxcbiAgICBtZXJnZVByb3BzKFsnc2VydmljZScsICdvcHRpb25zJ10sIFIubGVuc1Byb3AoJ29wdGlvbnMnKSksIC8vIHRoZSByZXN0IGFyZSBkb2NrZXIgcnVuIGFyZ3NcbiAgICBSLm92ZXIoUi5sZW5zUHJvcCgnb3B0aW9ucycpLCB0cmFuc2Zvcm1Eb2NrZXJPcHRpb25zKHByb3BUcmFuc2Zvcm1zLCBkaXJzKSksXG4gICAgUi5jb252ZXJnZShcbiAgICAgIChkb3JjLCBvcHRpb25zKSA9PiB7XG4gICAgICAgIHJldHVybiBSLnBpcGUoXG4gICAgICAgICAgUi5waWNrKFsnaW1hZ2UnLCAnY21kJ10pLFxuICAgICAgICAgIFIudmFsdWVzLFxuICAgICAgICAgIFIuY29uY2F0KG9wdGlvbnMpXG4gICAgICAgICkoZG9yYylcbiAgICAgIH0sIFtcbiAgICAgICAgUi5wcm9wKCdkb3JjJyksXG4gICAgICAgIFIucHJvcCgnb3B0aW9ucycpXG4gICAgICBdXG4gICAgKVxuICApKHtzZXJ2aWNlLCBvcHRpb25zfSlcbn1cbi8qICBSLnBpcGUoXG4gICAgUi5tYXAoKFtrZXksIHZhbHVlXSkgPT4gZ2V0VHJhbnNmb3JtKGtleSkodmFsdWUsIGtleSkpLFxuICAgIFIuZmxhdHRlblxuICAgIC8vUi5pZkVsc2UoKCkgPT4gUi5pc05pbChkZXRhY2hlZC5uYW1lKSwgUi5pZGVudGl0eSwgUi5hc3NvYygnbmFtZScsIG5hbWUpKSxcbiAgICAvL1IudG9QYWlyc1xuICApKHtzZXJ2aWNlLCBvcHRpb25zfSlcbiAgY29uc3QgX29wdGlvbnMgPSBkb2NrZXJSdW5Qcm9wcy5tYXAoKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgIHJldHVybiBnZXRUcmFuc2Zvcm0oa2V5KSh2YWx1ZSwga2V5KVxuICB9KVxuICBjb25zdCBjbWQgPSBSLmlmRWxzZShSLmlzTmlsLCBSLkYsIFIuaWRlbnRpdHkpKHNlcnZpY2UuY21kKVxuICBjb25zdCBkZXRhY2hlZEFyZyA9IFIuaWZFbHNlKFIuZXF1YWxzKGZhbHNlKSwgUi5pZGVudGl0eSwgUi5hbHdheXMoJy1kJykpKGRldGFjaGVkKVxuICBjb25zdCBhcmdzID0gUi5mbGF0dGVuKFsnLWl0JywgZGV0YWNoZWRBcmcsIG9wdGlvbnMsIHNlcnZpY2UuaW1hZ2UsIGNtZF0pXG4gICAgLmZpbHRlcih2ID0+IHYpXG4gIHJldHVybiBhcmdzXG59Ki9cblxubW9kdWxlLmV4cG9ydHMgPSBtYWtlUnVuQXJnc1xuIl19