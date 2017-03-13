const R = require('ramda');

const fromImageObject = R.pipe(R.prop('tag'), R.when(R.is(String), R.of));

const fromImage = R.cond([[R.is(String), R.always([])], // image: 'foo' -> []
[Array.isArray, R.pipe(R.map(fromImageObject), R.flatten)], [R.is(Object), fromImageObject] // image: {tag: 'foo'} -> ['foo']
]);

const getTags = R.pipe(R.path(['config', 'image']), fromImage);

getTags.fromImage = fromImage;

module.exports = getTags;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvc2VydmljZS9nZXQtdGFncy5qcyJdLCJuYW1lcyI6WyJSIiwicmVxdWlyZSIsImZyb21JbWFnZU9iamVjdCIsInBpcGUiLCJwcm9wIiwid2hlbiIsImlzIiwiU3RyaW5nIiwib2YiLCJmcm9tSW1hZ2UiLCJjb25kIiwiYWx3YXlzIiwiQXJyYXkiLCJpc0FycmF5IiwibWFwIiwiZmxhdHRlbiIsIk9iamVjdCIsImdldFRhZ3MiLCJwYXRoIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTUEsSUFBSUMsUUFBUSxPQUFSLENBQVY7O0FBRUEsTUFBTUMsa0JBQWtCRixFQUFFRyxJQUFGLENBQ3RCSCxFQUFFSSxJQUFGLENBQU8sS0FBUCxDQURzQixFQUV0QkosRUFBRUssSUFBRixDQUFPTCxFQUFFTSxFQUFGLENBQUtDLE1BQUwsQ0FBUCxFQUFxQlAsRUFBRVEsRUFBdkIsQ0FGc0IsQ0FBeEI7O0FBS0EsTUFBTUMsWUFBWVQsRUFBRVUsSUFBRixDQUFPLENBQ3ZCLENBQUNWLEVBQUVNLEVBQUYsQ0FBS0MsTUFBTCxDQUFELEVBQWVQLEVBQUVXLE1BQUYsQ0FBUyxFQUFULENBQWYsQ0FEdUIsRUFDTztBQUM5QixDQUFDQyxNQUFNQyxPQUFQLEVBQWdCYixFQUFFRyxJQUFGLENBQU9ILEVBQUVjLEdBQUYsQ0FBTVosZUFBTixDQUFQLEVBQStCRixFQUFFZSxPQUFqQyxDQUFoQixDQUZ1QixFQUd2QixDQUFDZixFQUFFTSxFQUFGLENBQUtVLE1BQUwsQ0FBRCxFQUFlZCxlQUFmLENBSHVCLENBR1M7QUFIVCxDQUFQLENBQWxCOztBQU1BLE1BQU1lLFVBQVVqQixFQUFFRyxJQUFGLENBQ2RILEVBQUVrQixJQUFGLENBQU8sQ0FBQyxRQUFELEVBQVcsT0FBWCxDQUFQLENBRGMsRUFFZFQsU0FGYyxDQUFoQjs7QUFLQVEsUUFBUVIsU0FBUixHQUFvQkEsU0FBcEI7O0FBRUFVLE9BQU9DLE9BQVAsR0FBaUJILE9BQWpCIiwiZmlsZSI6ImdldC10YWdzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgUiA9IHJlcXVpcmUoJ3JhbWRhJylcblxuY29uc3QgZnJvbUltYWdlT2JqZWN0ID0gUi5waXBlKFxuICBSLnByb3AoJ3RhZycpLFxuICBSLndoZW4oUi5pcyhTdHJpbmcpLCBSLm9mKVxuKVxuXG5jb25zdCBmcm9tSW1hZ2UgPSBSLmNvbmQoW1xuICBbUi5pcyhTdHJpbmcpLCBSLmFsd2F5cyhbXSldLCAvLyBpbWFnZTogJ2ZvbycgLT4gW11cbiAgW0FycmF5LmlzQXJyYXksIFIucGlwZShSLm1hcChmcm9tSW1hZ2VPYmplY3QpLCBSLmZsYXR0ZW4pXSxcbiAgW1IuaXMoT2JqZWN0KSwgZnJvbUltYWdlT2JqZWN0XSAvLyBpbWFnZToge3RhZzogJ2Zvbyd9IC0+IFsnZm9vJ11cbl0pXG5cbmNvbnN0IGdldFRhZ3MgPSBSLnBpcGUoXG4gIFIucGF0aChbJ2NvbmZpZycsICdpbWFnZSddKSxcbiAgZnJvbUltYWdlXG4pXG5cbmdldFRhZ3MuZnJvbUltYWdlID0gZnJvbUltYWdlXG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0VGFnc1xuIl19