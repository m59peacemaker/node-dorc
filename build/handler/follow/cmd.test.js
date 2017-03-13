var _require = require('../../test');

const test = _require.test,
      cmd = _require.cmd,
      tmpDir = _require.tmpDir,
      setup = _require.setup,
      cleanup = _require.cleanup,
      execAsync = _require.execAsync;

// assuming "dorc up" tests are passing

test.skip('follow', t => {
  t.plan(1);
  const config = `
    services:
      foo:
        image: alpine
  `;
  setup(config);
  const lines = Array(20).fill(true).map((_, i) => i + 1).join('\n');
  const shCmd = `${ cmd }  up foo`;
  execAsync(shCmd, { cwd: tmpDir }).then(() => {
    const p = execAsync(`${ cmd } follow `);
    return p;
  }).then(([stdout, stderr]) => {}).catch(t.fail).then(cleanup);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVyL2ZvbGxvdy9jbWQudGVzdC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwidGVzdCIsImNtZCIsInRtcERpciIsInNldHVwIiwiY2xlYW51cCIsImV4ZWNBc3luYyIsInNraXAiLCJ0IiwicGxhbiIsImNvbmZpZyIsImxpbmVzIiwiQXJyYXkiLCJmaWxsIiwibWFwIiwiXyIsImkiLCJqb2luIiwic2hDbWQiLCJjd2QiLCJ0aGVuIiwicCIsInN0ZG91dCIsInN0ZGVyciIsImNhdGNoIiwiZmFpbCJdLCJtYXBwaW5ncyI6ImVBT0lBLFFBQVEsWUFBUixDOztNQU5GQyxJLFlBQUFBLEk7TUFDQUMsRyxZQUFBQSxHO01BQ0FDLE0sWUFBQUEsTTtNQUNBQyxLLFlBQUFBLEs7TUFDQUMsTyxZQUFBQSxPO01BQ0FDLFMsWUFBQUEsUzs7QUFHRjs7QUFDQUwsS0FBS00sSUFBTCxDQUFVLFFBQVYsRUFBb0JDLEtBQUs7QUFDdkJBLElBQUVDLElBQUYsQ0FBTyxDQUFQO0FBQ0EsUUFBTUMsU0FBVTs7OztHQUFoQjtBQUtBTixRQUFNTSxNQUFOO0FBQ0EsUUFBTUMsUUFBUUMsTUFBTSxFQUFOLEVBQVVDLElBQVYsQ0FBZSxJQUFmLEVBQXFCQyxHQUFyQixDQUF5QixDQUFDQyxDQUFELEVBQUlDLENBQUosS0FBVUEsSUFBSSxDQUF2QyxFQUEwQ0MsSUFBMUMsQ0FBK0MsSUFBL0MsQ0FBZDtBQUNBLFFBQU1DLFFBQVMsSUFBRWhCLEdBQUksV0FBckI7QUFDQUksWUFBVVksS0FBVixFQUFpQixFQUFDQyxLQUFLaEIsTUFBTixFQUFqQixFQUNHaUIsSUFESCxDQUNRLE1BQU07QUFDVixVQUFNQyxJQUFJZixVQUFXLElBQUVKLEdBQUksV0FBakIsQ0FBVjtBQUNBLFdBQU9tQixDQUFQO0FBQ0QsR0FKSCxFQUtHRCxJQUxILENBS1EsQ0FBQyxDQUFDRSxNQUFELEVBQVNDLE1BQVQsQ0FBRCxLQUFzQixDQUUzQixDQVBILEVBUUdDLEtBUkgsQ0FRU2hCLEVBQUVpQixJQVJYLEVBU0dMLElBVEgsQ0FTUWYsT0FUUjtBQVVELENBcEJEIiwiZmlsZSI6ImNtZC50ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qge1xuICB0ZXN0LFxuICBjbWQsXG4gIHRtcERpcixcbiAgc2V0dXAsXG4gIGNsZWFudXAsXG4gIGV4ZWNBc3luY1xufSA9IHJlcXVpcmUoJ34vdGVzdCcpXG5cbi8vIGFzc3VtaW5nIFwiZG9yYyB1cFwiIHRlc3RzIGFyZSBwYXNzaW5nXG50ZXN0LnNraXAoJ2ZvbGxvdycsIHQgPT4ge1xuICB0LnBsYW4oMSlcbiAgY29uc3QgY29uZmlnID0gYFxuICAgIHNlcnZpY2VzOlxuICAgICAgZm9vOlxuICAgICAgICBpbWFnZTogYWxwaW5lXG4gIGBcbiAgc2V0dXAoY29uZmlnKVxuICBjb25zdCBsaW5lcyA9IEFycmF5KDIwKS5maWxsKHRydWUpLm1hcCgoXywgaSkgPT4gaSArIDEpLmpvaW4oJ1xcbicpXG4gIGNvbnN0IHNoQ21kID0gYCR7Y21kfSAgdXAgZm9vYFxuICBleGVjQXN5bmMoc2hDbWQsIHtjd2Q6IHRtcERpcn0pXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgY29uc3QgcCA9IGV4ZWNBc3luYyhgJHtjbWR9IGZvbGxvdyBgKVxuICAgICAgcmV0dXJuIHBcbiAgICB9KVxuICAgIC50aGVuKChbc3Rkb3V0LCBzdGRlcnJdKSA9PiB7XG4gICAgICBcbiAgICB9KVxuICAgIC5jYXRjaCh0LmZhaWwpXG4gICAgLnRoZW4oY2xlYW51cClcbn0pXG4iXX0=