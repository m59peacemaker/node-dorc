const R = require('ramda');

var _require = require('child_process');

const spawn = _require.spawn;

var _require2 = require('tty');

const isatty = _require2.isatty;

const makeRunArgs = require('./make-run-args');

const stringToArray = R.when(R.is(String), R.of);
const concatRight = R.flip(R.concat);
const addArgs = R.mergeWithKey(R.pipe(
// this is called when the destination object already has a key
R.unapply(R.slice(1, 3)), // (k, l, r) => [l, r]
R.ifElse(R.pipe(R.nth(0), R.is(Boolean)), R.nth(0), // return "l" if it is a boolean
// turn "l" and "r" strings into arrays and then add "l" to the end of "r"
R.pipe(R.map(stringToArray), R.apply(concatRight)))));

const defaultArgs = { cmd: [], options: {}, docker: {} };

const run = (service, args = defaultArgs) => {
  args.docker = R.pipe(R.when(_ => isatty(1), addArgs({ interactive: true, tty: true })), R.unless(R.compose(R.equals(true), R.prop('detach')), R.assoc('rm', true)))(args.docker);
  const runArgs = ['run', ...makeRunArgs(service, args)];
  // TODO: runArgs need formatting for string usage (double quote values with spaces)
  console.log(`docker ${ runArgs.join(' ') }`);
  return new Promise((resolve, reject) => {
    const p = spawn('docker', runArgs, { stdio: 'inherit' });
    // TODO: make/use a module for promisfying a process, this does not handle all cases
    // TODO: nicer error handling, see `dorc run foo /bin/sh`, run a failing command, then exit
    p.on('close', code => code !== 0 ? reject(code) : resolve());
  });
};

module.exports = run;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVyL3J1bi9pbmRleC5qcyJdLCJuYW1lcyI6WyJSIiwicmVxdWlyZSIsInNwYXduIiwiaXNhdHR5IiwibWFrZVJ1bkFyZ3MiLCJzdHJpbmdUb0FycmF5Iiwid2hlbiIsImlzIiwiU3RyaW5nIiwib2YiLCJjb25jYXRSaWdodCIsImZsaXAiLCJjb25jYXQiLCJhZGRBcmdzIiwibWVyZ2VXaXRoS2V5IiwicGlwZSIsInVuYXBwbHkiLCJzbGljZSIsImlmRWxzZSIsIm50aCIsIkJvb2xlYW4iLCJtYXAiLCJhcHBseSIsImRlZmF1bHRBcmdzIiwiY21kIiwib3B0aW9ucyIsImRvY2tlciIsInJ1biIsInNlcnZpY2UiLCJhcmdzIiwiXyIsImludGVyYWN0aXZlIiwidHR5IiwidW5sZXNzIiwiY29tcG9zZSIsImVxdWFscyIsInByb3AiLCJhc3NvYyIsInJ1bkFyZ3MiLCJjb25zb2xlIiwibG9nIiwiam9pbiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicCIsInN0ZGlvIiwib24iLCJjb2RlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTUEsSUFBSUMsUUFBUSxPQUFSLENBQVY7O2VBQ2dCQSxRQUFRLGVBQVIsQzs7TUFBVEMsSyxZQUFBQSxLOztnQkFDVUQsUUFBUSxLQUFSLEM7O01BQVZFLE0sYUFBQUEsTTs7QUFDUCxNQUFNQyxjQUFjSCxRQUFRLGlCQUFSLENBQXBCOztBQUVBLE1BQU1JLGdCQUFnQkwsRUFBRU0sSUFBRixDQUFPTixFQUFFTyxFQUFGLENBQUtDLE1BQUwsQ0FBUCxFQUFxQlIsRUFBRVMsRUFBdkIsQ0FBdEI7QUFDQSxNQUFNQyxjQUFjVixFQUFFVyxJQUFGLENBQU9YLEVBQUVZLE1BQVQsQ0FBcEI7QUFDQSxNQUFNQyxVQUFVYixFQUFFYyxZQUFGLENBQWVkLEVBQUVlLElBQUY7QUFDN0I7QUFDQWYsRUFBRWdCLE9BQUYsQ0FBVWhCLEVBQUVpQixLQUFGLENBQVEsQ0FBUixFQUFXLENBQVgsQ0FBVixDQUY2QixFQUVIO0FBQzFCakIsRUFBRWtCLE1BQUYsQ0FDRWxCLEVBQUVlLElBQUYsQ0FBT2YsRUFBRW1CLEdBQUYsQ0FBTSxDQUFOLENBQVAsRUFBaUJuQixFQUFFTyxFQUFGLENBQUthLE9BQUwsQ0FBakIsQ0FERixFQUVFcEIsRUFBRW1CLEdBQUYsQ0FBTSxDQUFOLENBRkYsRUFFWTtBQUNWO0FBQ0FuQixFQUFFZSxJQUFGLENBQU9mLEVBQUVxQixHQUFGLENBQU1oQixhQUFOLENBQVAsRUFBNkJMLEVBQUVzQixLQUFGLENBQVFaLFdBQVIsQ0FBN0IsQ0FKRixDQUg2QixDQUFmLENBQWhCOztBQVdBLE1BQU1hLGNBQWMsRUFBQ0MsS0FBSyxFQUFOLEVBQVVDLFNBQVMsRUFBbkIsRUFBdUJDLFFBQVEsRUFBL0IsRUFBcEI7O0FBRUEsTUFBTUMsTUFBTSxDQUFDQyxPQUFELEVBQVVDLE9BQU9OLFdBQWpCLEtBQWlDO0FBQzNDTSxPQUFLSCxNQUFMLEdBQWMxQixFQUFFZSxJQUFGLENBQ1pmLEVBQUVNLElBQUYsQ0FBT3dCLEtBQUszQixPQUFPLENBQVAsQ0FBWixFQUF1QlUsUUFBUSxFQUFDa0IsYUFBYSxJQUFkLEVBQW9CQyxLQUFLLElBQXpCLEVBQVIsQ0FBdkIsQ0FEWSxFQUVaaEMsRUFBRWlDLE1BQUYsQ0FBU2pDLEVBQUVrQyxPQUFGLENBQVVsQyxFQUFFbUMsTUFBRixDQUFTLElBQVQsQ0FBVixFQUEwQm5DLEVBQUVvQyxJQUFGLENBQU8sUUFBUCxDQUExQixDQUFULEVBQXNEcEMsRUFBRXFDLEtBQUYsQ0FBUSxJQUFSLEVBQWMsSUFBZCxDQUF0RCxDQUZZLEVBR1pSLEtBQUtILE1BSE8sQ0FBZDtBQUlBLFFBQU1ZLFVBQVUsQ0FBQyxLQUFELEVBQVEsR0FBR2xDLFlBQVl3QixPQUFaLEVBQXFCQyxJQUFyQixDQUFYLENBQWhCO0FBQ0E7QUFDQVUsVUFBUUMsR0FBUixDQUFhLFdBQVNGLFFBQVFHLElBQVIsQ0FBYSxHQUFiLENBQWtCLEdBQXhDO0FBQ0EsU0FBTyxJQUFJQyxPQUFKLENBQVksQ0FBQ0MsT0FBRCxFQUFVQyxNQUFWLEtBQXFCO0FBQ3RDLFVBQU1DLElBQUkzQyxNQUFNLFFBQU4sRUFBZ0JvQyxPQUFoQixFQUF5QixFQUFDUSxPQUFPLFNBQVIsRUFBekIsQ0FBVjtBQUNBO0FBQ0E7QUFDQUQsTUFBRUUsRUFBRixDQUFLLE9BQUwsRUFBY0MsUUFBUUEsU0FBUyxDQUFULEdBQWFKLE9BQU9JLElBQVAsQ0FBYixHQUE0QkwsU0FBbEQ7QUFDRCxHQUxNLENBQVA7QUFNRCxDQWREOztBQWdCQU0sT0FBT0MsT0FBUCxHQUFpQnZCLEdBQWpCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgUiA9IHJlcXVpcmUoJ3JhbWRhJylcbmNvbnN0IHtzcGF3bn0gPSByZXF1aXJlKCdjaGlsZF9wcm9jZXNzJylcbmNvbnN0IHtpc2F0dHl9ID0gcmVxdWlyZSgndHR5JylcbmNvbnN0IG1ha2VSdW5BcmdzID0gcmVxdWlyZSgnLi9tYWtlLXJ1bi1hcmdzJylcblxuY29uc3Qgc3RyaW5nVG9BcnJheSA9IFIud2hlbihSLmlzKFN0cmluZyksIFIub2YpXG5jb25zdCBjb25jYXRSaWdodCA9IFIuZmxpcChSLmNvbmNhdClcbmNvbnN0IGFkZEFyZ3MgPSBSLm1lcmdlV2l0aEtleShSLnBpcGUoXG4gIC8vIHRoaXMgaXMgY2FsbGVkIHdoZW4gdGhlIGRlc3RpbmF0aW9uIG9iamVjdCBhbHJlYWR5IGhhcyBhIGtleVxuICBSLnVuYXBwbHkoUi5zbGljZSgxLCAzKSksIC8vIChrLCBsLCByKSA9PiBbbCwgcl1cbiAgUi5pZkVsc2UoXG4gICAgUi5waXBlKFIubnRoKDApLCBSLmlzKEJvb2xlYW4pKSxcbiAgICBSLm50aCgwKSwgLy8gcmV0dXJuIFwibFwiIGlmIGl0IGlzIGEgYm9vbGVhblxuICAgIC8vIHR1cm4gXCJsXCIgYW5kIFwiclwiIHN0cmluZ3MgaW50byBhcnJheXMgYW5kIHRoZW4gYWRkIFwibFwiIHRvIHRoZSBlbmQgb2YgXCJyXCJcbiAgICBSLnBpcGUoUi5tYXAoc3RyaW5nVG9BcnJheSksIFIuYXBwbHkoY29uY2F0UmlnaHQpKVxuICApXG4pKVxuXG5jb25zdCBkZWZhdWx0QXJncyA9IHtjbWQ6IFtdLCBvcHRpb25zOiB7fSwgZG9ja2VyOiB7fX1cblxuY29uc3QgcnVuID0gKHNlcnZpY2UsIGFyZ3MgPSBkZWZhdWx0QXJncykgPT4ge1xuICBhcmdzLmRvY2tlciA9IFIucGlwZShcbiAgICBSLndoZW4oXyA9PiBpc2F0dHkoMSksIGFkZEFyZ3Moe2ludGVyYWN0aXZlOiB0cnVlLCB0dHk6IHRydWV9KSksXG4gICAgUi51bmxlc3MoUi5jb21wb3NlKFIuZXF1YWxzKHRydWUpLCBSLnByb3AoJ2RldGFjaCcpKSwgUi5hc3NvYygncm0nLCB0cnVlKSlcbiAgKShhcmdzLmRvY2tlcilcbiAgY29uc3QgcnVuQXJncyA9IFsncnVuJywgLi4ubWFrZVJ1bkFyZ3Moc2VydmljZSwgYXJncyldXG4gIC8vIFRPRE86IHJ1bkFyZ3MgbmVlZCBmb3JtYXR0aW5nIGZvciBzdHJpbmcgdXNhZ2UgKGRvdWJsZSBxdW90ZSB2YWx1ZXMgd2l0aCBzcGFjZXMpXG4gIGNvbnNvbGUubG9nKGBkb2NrZXIgJHtydW5BcmdzLmpvaW4oJyAnKX1gKVxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHAgPSBzcGF3bignZG9ja2VyJywgcnVuQXJncywge3N0ZGlvOiAnaW5oZXJpdCd9KVxuICAgIC8vIFRPRE86IG1ha2UvdXNlIGEgbW9kdWxlIGZvciBwcm9taXNmeWluZyBhIHByb2Nlc3MsIHRoaXMgZG9lcyBub3QgaGFuZGxlIGFsbCBjYXNlc1xuICAgIC8vIFRPRE86IG5pY2VyIGVycm9yIGhhbmRsaW5nLCBzZWUgYGRvcmMgcnVuIGZvbyAvYmluL3NoYCwgcnVuIGEgZmFpbGluZyBjb21tYW5kLCB0aGVuIGV4aXRcbiAgICBwLm9uKCdjbG9zZScsIGNvZGUgPT4gY29kZSAhPT0gMCA/IHJlamVjdChjb2RlKSA6IHJlc29sdmUoKSlcbiAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBydW5cbiJdfQ==