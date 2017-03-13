var _require = require('child_process');

const spawn = _require.spawn;

const getTags = require('../../lib/service/get-tags');

const rmi = service => {
  // TODO: promisify(spawn)
  return new Promise((resolve, reject) => {
    const tags = getTags(service);
    const args = ['rmi'].concat(tags);
    console.log(`docker ${ args.join(' ') }`);
    const p = spawn('docker', args, { stdio: 'inherit' });
    p.on('close', code => code !== 0 ? reject(code) : resolve());
  });
};

module.exports = rmi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVyL3JtaS9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwic3Bhd24iLCJnZXRUYWdzIiwicm1pIiwic2VydmljZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwidGFncyIsImFyZ3MiLCJjb25jYXQiLCJjb25zb2xlIiwibG9nIiwiam9pbiIsInAiLCJzdGRpbyIsIm9uIiwiY29kZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJlQUFnQkEsUUFBUSxlQUFSLEM7O01BQVRDLEssWUFBQUEsSzs7QUFDUCxNQUFNQyxVQUFVRixRQUFRLDRCQUFSLENBQWhCOztBQUVBLE1BQU1HLE1BQU1DLFdBQVc7QUFDckI7QUFDQSxTQUFPLElBQUlDLE9BQUosQ0FBWSxDQUFDQyxPQUFELEVBQVVDLE1BQVYsS0FBcUI7QUFDdEMsVUFBTUMsT0FBT04sUUFBUUUsT0FBUixDQUFiO0FBQ0EsVUFBTUssT0FBTyxDQUFDLEtBQUQsRUFBUUMsTUFBUixDQUFlRixJQUFmLENBQWI7QUFDQUcsWUFBUUMsR0FBUixDQUFhLFdBQVNILEtBQUtJLElBQUwsQ0FBVSxHQUFWLENBQWUsR0FBckM7QUFDQSxVQUFNQyxJQUFJYixNQUFNLFFBQU4sRUFBZ0JRLElBQWhCLEVBQXNCLEVBQUNNLE9BQU8sU0FBUixFQUF0QixDQUFWO0FBQ0FELE1BQUVFLEVBQUYsQ0FBSyxPQUFMLEVBQWNDLFFBQVFBLFNBQVMsQ0FBVCxHQUFhVixPQUFPVSxJQUFQLENBQWIsR0FBNEJYLFNBQWxEO0FBQ0QsR0FOTSxDQUFQO0FBT0QsQ0FURDs7QUFXQVksT0FBT0MsT0FBUCxHQUFpQmhCLEdBQWpCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qge3NwYXdufSA9IHJlcXVpcmUoJ2NoaWxkX3Byb2Nlc3MnKVxuY29uc3QgZ2V0VGFncyA9IHJlcXVpcmUoJ34vbGliL3NlcnZpY2UvZ2V0LXRhZ3MnKVxuXG5jb25zdCBybWkgPSBzZXJ2aWNlID0+IHtcbiAgLy8gVE9ETzogcHJvbWlzaWZ5KHNwYXduKVxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHRhZ3MgPSBnZXRUYWdzKHNlcnZpY2UpXG4gICAgY29uc3QgYXJncyA9IFsncm1pJ10uY29uY2F0KHRhZ3MpXG4gICAgY29uc29sZS5sb2coYGRvY2tlciAke2FyZ3Muam9pbignICcpfWApXG4gICAgY29uc3QgcCA9IHNwYXduKCdkb2NrZXInLCBhcmdzLCB7c3RkaW86ICdpbmhlcml0J30pXG4gICAgcC5vbignY2xvc2UnLCBjb2RlID0+IGNvZGUgIT09IDAgPyByZWplY3QoY29kZSkgOiByZXNvbHZlKCkpXG4gIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcm1pXG4iXX0=