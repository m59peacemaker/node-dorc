const R = require('ramda');

const prepare = R.pipe(R.toPairs, // [serviceName, service]
// get rid of everything but the image value
R.map(R.over(R.lensIndex(1), R.view(R.lensProp('image')))),
// filter to only services that have images to build (non-empty array)
R.filter(R.pipe(R.view(R.lensIndex(1)), R.both(Array.isArray, R.complement(R.isEmpty)))), R.fromPairs);

module.exports = prepare;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbWRzL2J1aWxkL3ByZXBhcmUtc2VydmljZXMuanMiXSwibmFtZXMiOlsiUiIsInJlcXVpcmUiLCJwcmVwYXJlIiwicGlwZSIsInRvUGFpcnMiLCJtYXAiLCJvdmVyIiwibGVuc0luZGV4IiwidmlldyIsImxlbnNQcm9wIiwiZmlsdGVyIiwiYm90aCIsIkFycmF5IiwiaXNBcnJheSIsImNvbXBsZW1lbnQiLCJpc0VtcHR5IiwiZnJvbVBhaXJzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTUEsSUFBSUMsUUFBUSxPQUFSLENBQVY7O0FBRUEsTUFBTUMsVUFBVUYsRUFBRUcsSUFBRixDQUNkSCxFQUFFSSxPQURZLEVBQ0g7QUFDWDtBQUNBSixFQUFFSyxHQUFGLENBQ0VMLEVBQUVNLElBQUYsQ0FDRU4sRUFBRU8sU0FBRixDQUFZLENBQVosQ0FERixFQUVFUCxFQUFFUSxJQUFGLENBQU9SLEVBQUVTLFFBQUYsQ0FBVyxPQUFYLENBQVAsQ0FGRixDQURGLENBSGM7QUFTZDtBQUNBVCxFQUFFVSxNQUFGLENBQ0VWLEVBQUVHLElBQUYsQ0FDRUgsRUFBRVEsSUFBRixDQUFPUixFQUFFTyxTQUFGLENBQVksQ0FBWixDQUFQLENBREYsRUFFRVAsRUFBRVcsSUFBRixDQUFPQyxNQUFNQyxPQUFiLEVBQXNCYixFQUFFYyxVQUFGLENBQWFkLEVBQUVlLE9BQWYsQ0FBdEIsQ0FGRixDQURGLENBVmMsRUFnQmRmLEVBQUVnQixTQWhCWSxDQUFoQjs7QUFtQkFDLE9BQU9DLE9BQVAsR0FBaUJoQixPQUFqQiIsImZpbGUiOiJwcmVwYXJlLXNlcnZpY2VzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgUiA9IHJlcXVpcmUoJ3JhbWRhJylcblxuY29uc3QgcHJlcGFyZSA9IFIucGlwZShcbiAgUi50b1BhaXJzLCAvLyBbc2VydmljZU5hbWUsIHNlcnZpY2VdXG4gIC8vIGdldCByaWQgb2YgZXZlcnl0aGluZyBidXQgdGhlIGltYWdlIHZhbHVlXG4gIFIubWFwKFxuICAgIFIub3ZlcihcbiAgICAgIFIubGVuc0luZGV4KDEpLFxuICAgICAgUi52aWV3KFIubGVuc1Byb3AoJ2ltYWdlJykpXG4gICAgKVxuICApLFxuICAvLyBmaWx0ZXIgdG8gb25seSBzZXJ2aWNlcyB0aGF0IGhhdmUgaW1hZ2VzIHRvIGJ1aWxkIChub24tZW1wdHkgYXJyYXkpXG4gIFIuZmlsdGVyKFxuICAgIFIucGlwZShcbiAgICAgIFIudmlldyhSLmxlbnNJbmRleCgxKSksXG4gICAgICBSLmJvdGgoQXJyYXkuaXNBcnJheSwgUi5jb21wbGVtZW50KFIuaXNFbXB0eSkpXG4gICAgKVxuICApLFxuICBSLmZyb21QYWlyc1xuKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHByZXBhcmVcbiJdfQ==