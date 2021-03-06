var _require = require('child_process');

const spawn = _require.spawn;


const follow = (service, options) => {
  // TODO: promisify(spawn)
  return new Promise((resolve, reject) => {
    const p = spawn('docker', ['logs', '--follow', '--tail', options.tail || 10, service.container], { stdio: 'inherit' });
    p.on('close', code => code !== 0 ? reject(code) : resolve());
  });
};

module.exports = follow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVyL2ZvbGxvdy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwic3Bhd24iLCJmb2xsb3ciLCJzZXJ2aWNlIiwib3B0aW9ucyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicCIsInRhaWwiLCJjb250YWluZXIiLCJzdGRpbyIsIm9uIiwiY29kZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJlQUFnQkEsUUFBUSxlQUFSLEM7O01BQVRDLEssWUFBQUEsSzs7O0FBRVAsTUFBTUMsU0FBUyxDQUFDQyxPQUFELEVBQVVDLE9BQVYsS0FBc0I7QUFDbkM7QUFDQSxTQUFPLElBQUlDLE9BQUosQ0FBWSxDQUFDQyxPQUFELEVBQVVDLE1BQVYsS0FBcUI7QUFDdEMsVUFBTUMsSUFBSVAsTUFDUixRQURRLEVBRVIsQ0FBQyxNQUFELEVBQVMsVUFBVCxFQUFxQixRQUFyQixFQUErQkcsUUFBUUssSUFBUixJQUFnQixFQUEvQyxFQUFtRE4sUUFBUU8sU0FBM0QsQ0FGUSxFQUdSLEVBQUNDLE9BQU8sU0FBUixFQUhRLENBQVY7QUFLQUgsTUFBRUksRUFBRixDQUFLLE9BQUwsRUFBY0MsUUFBUUEsU0FBUyxDQUFULEdBQWFOLE9BQU9NLElBQVAsQ0FBYixHQUE0QlAsU0FBbEQ7QUFDRCxHQVBNLENBQVA7QUFRRCxDQVZEOztBQVlBUSxPQUFPQyxPQUFQLEdBQWlCYixNQUFqQiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHtzcGF3bn0gPSByZXF1aXJlKCdjaGlsZF9wcm9jZXNzJylcblxuY29uc3QgZm9sbG93ID0gKHNlcnZpY2UsIG9wdGlvbnMpID0+IHtcbiAgLy8gVE9ETzogcHJvbWlzaWZ5KHNwYXduKVxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHAgPSBzcGF3bihcbiAgICAgICdkb2NrZXInLFxuICAgICAgWydsb2dzJywgJy0tZm9sbG93JywgJy0tdGFpbCcsIG9wdGlvbnMudGFpbCB8fCAxMCwgc2VydmljZS5jb250YWluZXJdLFxuICAgICAge3N0ZGlvOiAnaW5oZXJpdCd9XG4gICAgKVxuICAgIHAub24oJ2Nsb3NlJywgY29kZSA9PiBjb2RlICE9PSAwID8gcmVqZWN0KGNvZGUpIDogcmVzb2x2ZSgpKVxuICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZvbGxvd1xuIl19