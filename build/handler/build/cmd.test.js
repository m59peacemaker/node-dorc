var _require = require('../../test');

const test = _require.test,
      cmd = _require.cmd,
      tmpDir = _require.tmpDir,
      setup = _require.setup,
      cleanup = _require.cleanup,
      execAsync = _require.execAsync;

var _require2 = require('child_process');

const execSync = _require2.execSync;

const outputFile = require('output-file-sync');

var _require3 = require('path');

const joinPath = _require3.join;

const run = require('../run');
const build = require('./');
const docker = require('../../lib/docker-api');

test('build command builds images for given service', t => {
  t.plan(2);
  const config = `
    services:
      hello:
        image:
          file: ./Dockerfile
          tag:
            - dorc-build-test1
            - dorc-build-test2
  `;
  const Dockerfile = `
    FROM pmkr/hello:1.0
    CMD ["Dolly"]
  `;
  setup(config);
  outputFile(joinPath(tmpDir, '/Dockerfile'), Dockerfile);
  execAsync(`${ cmd } build hello --colors`, { cwd: tmpDir }).then(([stdout, stderr]) => console.log(stdout, stderr)).then(() => Promise.all([1, 2].map(idx => execAsync(`docker run --rm dorc-build-test${ idx }`).then(([stdout, stderr]) => {
    if (stdout.trim() === 'Hello, Dolly') {
      t.pass(stdout);
    } else {
      t.fail(stderr);
    }
  }).catch(t.fail).then(() => execSync(`docker rmi dorc-build-test${ idx }`))))).catch(t.fail).then(cleanup);
});

test('build command builds images for all services', t => {
  t.plan(2);
  const config = `
    services:
      dolly:
        image:
          file: ./dolly
          tag: dorc-build-test-dolly
      adele:
        image:
          file: ./adele
          tag: dorc-build-test-adele
  `;
  setup(config);
  outputFile(joinPath(tmpDir, '/dolly'), `
    FROM pmkr/hello:1.0
    CMD ["Dolly"]
  `);
  outputFile(joinPath(tmpDir, '/adele'), `
    FROM pmkr/hello:1.0
    CMD ["from the other side"]
  `);
  execAsync(`${ cmd } build --colors`, { cwd: tmpDir }).then(([stdout, stderr]) => console.log(stdout)).then(() => Promise.all([{ name: 'dolly', target: 'Dolly' }, { name: 'adele', target: 'from the other side' }].map(item => execAsync(`docker run --rm dorc-build-test-${ item.name }`).then(([stdout, stderr]) => {
    if (stdout.trim() === `Hello, ${ item.target }`) {
      t.pass(stdout);
    } else {
      t.fail(stderr);
    }
  }).catch(t.fail).then(() => execSync(`docker rmi dorc-build-test-${ item.name }`))))).catch(t.fail).then(cleanup);
});

test('build command dry run', t => {
  t.plan(1);
  const config = `
    services:
      hello:
        image:
          file: ./Dockerfile
          tag: dorc-build-test-dry
  `;
  setup(config);
  execAsync(`${ cmd } build --dry hello --colors`, { cwd: tmpDir }).then(([stdout, stderr]) => {
    console.log(stdout, stderr);
    return docker.getImage('dorc-build-test-dry').catch(err => undefined).then(image => {
      if (image) {
        t.fail('created the image on dry run');
      } else {
        if (stdout.includes('docker build --file ./Dockerfile --tag dorc-build-test-dry')) {
          t.pass('just printed and did not create the image');
        } else {
          t.fail('did not print correctly');
        }
      }
    });
  }).catch(t.fail).then(cleanup);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVyL2J1aWxkL2NtZC50ZXN0LmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJ0ZXN0IiwiY21kIiwidG1wRGlyIiwic2V0dXAiLCJjbGVhbnVwIiwiZXhlY0FzeW5jIiwiZXhlY1N5bmMiLCJvdXRwdXRGaWxlIiwiam9pblBhdGgiLCJqb2luIiwicnVuIiwiYnVpbGQiLCJkb2NrZXIiLCJ0IiwicGxhbiIsImNvbmZpZyIsIkRvY2tlcmZpbGUiLCJjd2QiLCJ0aGVuIiwic3Rkb3V0Iiwic3RkZXJyIiwiY29uc29sZSIsImxvZyIsIlByb21pc2UiLCJhbGwiLCJtYXAiLCJpZHgiLCJ0cmltIiwicGFzcyIsImZhaWwiLCJjYXRjaCIsIm5hbWUiLCJ0YXJnZXQiLCJpdGVtIiwiZ2V0SW1hZ2UiLCJlcnIiLCJ1bmRlZmluZWQiLCJpbWFnZSIsImluY2x1ZGVzIl0sIm1hcHBpbmdzIjoiZUFPSUEsUUFBUSxZQUFSLEM7O01BTkZDLEksWUFBQUEsSTtNQUNBQyxHLFlBQUFBLEc7TUFDQUMsTSxZQUFBQSxNO01BQ0FDLEssWUFBQUEsSztNQUNBQyxPLFlBQUFBLE87TUFDQUMsUyxZQUFBQSxTOztnQkFFaUJOLFFBQVEsZUFBUixDOztNQUFaTyxRLGFBQUFBLFE7O0FBQ1AsTUFBTUMsYUFBYVIsUUFBUSxrQkFBUixDQUFuQjs7Z0JBQ3lCQSxRQUFRLE1BQVIsQzs7TUFBWlMsUSxhQUFOQyxJOztBQUNQLE1BQU1DLE1BQU1YLFFBQVEsUUFBUixDQUFaO0FBQ0EsTUFBTVksUUFBUVosUUFBUSxJQUFSLENBQWQ7QUFDQSxNQUFNYSxTQUFTYixRQUFRLHNCQUFSLENBQWY7O0FBRUFDLEtBQUssK0NBQUwsRUFBc0RhLEtBQUs7QUFDekRBLElBQUVDLElBQUYsQ0FBTyxDQUFQO0FBQ0EsUUFBTUMsU0FBVTs7Ozs7Ozs7R0FBaEI7QUFTQSxRQUFNQyxhQUFjOzs7R0FBcEI7QUFJQWIsUUFBTVksTUFBTjtBQUNBUixhQUFXQyxTQUFTTixNQUFULEVB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WixFQUFvQkMsTUFBcEI7QUFDQSxXQUFPUixPQUFPc0IsUUFBUCxDQUFnQixxQkFBaEIsRUFBdUNKLEtBQXZDLENBQTZDSyxPQUFPQyxTQUFwRCxFQUNKbEIsSUFESSxDQUNDbUIsU0FBUztBQUNiLFVBQUlBLEtBQUosRUFBVztBQUNUeEIsVUFBRWdCLElBQUYsQ0FBTyw4QkFBUDtBQUNELE9BRkQsTUFFTztBQUNMLFlBQUlWLE9BQU9tQixRQUFQLENBQWdCLDREQUFoQixDQUFKLEVBQW1GO0FBQ2pGekIsWUFBRWUsSUFBRixDQUFPLDJDQUFQO0FBQ0QsU0FGRCxNQUVPO0FBQ0xmLFlBQUVnQixJQUFGLENBQU8seUJBQVA7QUFDRDtBQUNGO0FBQ0YsS0FYSSxDQUFQO0FBWUQsR0FmSCxFQWdCR0MsS0FoQkgsQ0FnQlNqQixFQUFFZ0IsSUFoQlgsRUFpQkdYLElBakJILENBaUJRZCxPQWpCUjtBQWtCRCxDQTVCRCIsImZpbGUiOiJjbWQudGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHtcbiAgdGVzdCxcbiAgY21kLFxuICB0bXBEaXIsXG4gIHNldHVwLFxuICBjbGVhbnVwLFxuICBleGVjQXN5bmNcbn0gPSByZXF1aXJlKCd+L3Rlc3QnKVxuY29uc3Qge2V4ZWNTeW5jfSA9IHJlcXVpcmUoJ2NoaWxkX3Byb2Nlc3MnKVxuY29uc3Qgb3V0cHV0RmlsZSA9IHJlcXVpcmUoJ291dHB1dC1maWxlLXN5bmMnKVxuY29uc3Qge2pvaW46IGpvaW5QYXRofSA9IHJlcXVpcmUoJ3BhdGgnKVxuY29uc3QgcnVuID0gcmVxdWlyZSgnfi9oYW5kbGVyL3J1bicpXG5jb25zdCBidWlsZCA9IHJlcXVpcmUoJy4vJylcbmNvbnN0IGRvY2tlciA9IHJlcXVpcmUoJ34vbGliL2RvY2tlci1hcGknKVxuXG50ZXN0KCdidWlsZCBjb21tYW5kIGJ1aWxkcyBpbWFnZXMgZm9yIGdpdmVuIHNlcnZpY2UnLCB0ID0+IHtcbiAgdC5wbGFuKDIpXG4gIGNvbnN0IGNvbmZpZyA9IGBcbiAgICBzZXJ2aWNlczpcbiAgICAgIGhlbGxvOlxuICAgICAgICBpbWFnZTpcbiAgICAgICAgICBmaWxlOiAuL0RvY2tlcmZpbGVcbiAgICAgICAgICB0YWc6XG4gICAgICAgICAgICAtIGRvcmMtYnVpbGQtdGVzdDFcbiAgICAgICAgICAgIC0gZG9yYy1idWlsZC10ZXN0MlxuICBgXG4gIGNvbnN0IERvY2tlcmZpbGUgPSBgXG4gICAgRlJPTSBwbWtyL2hlbGxvOjEuMFxuICAgIENNRCBbXCJEb2xseVwiXVxuICBgXG4gIHNldHVwKGNvbmZpZylcbiAgb3V0cHV0RmlsZShqb2luUGF0aCh0bXBEaXIsICcvRG9ja2VyZmlsZScpLCBEb2NrZXJmaWxlKVxuICBleGVjQXN5bmMoYCR7Y21kfSBidWlsZCBoZWxsbyAtLWNvbG9yc2AsIHtjd2Q6IHRtcERpcn0pXG4gICAgLnRoZW4oKFtzdGRvdXQsIHN0ZGVycl0pID0+IGNvbnNvbGUubG9nKHN0ZG91dCwgc3RkZXJyKSlcbiAgICAudGhlbigoKSA9PiBQcm9taXNlLmFsbChcbiAgICAgIFsxLCAyXS5tYXAoaWR4ID0+IGV4ZWNBc3luYyhgZG9ja2VyIHJ1biAtLXJtIGRvcmMtYnVpbGQtdGVzdCR7aWR4fWApXG4gICAgICAgIC50aGVuKChbc3Rkb3V0LCBzdGRlcnJdKSA9PiB7XG4gICAgICAgICAgaWYgKHN0ZG91dC50cmltKCkgPT09ICdIZWxsbywgRG9sbHknKSB7XG4gICAgICAgICAgICB0LnBhc3Moc3Rkb3V0KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0LmZhaWwoc3RkZXJyKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKHQuZmFpbClcbiAgICAgICAgLnRoZW4oKCkgPT4gZXhlY1N5bmMoYGRvY2tlciBybWkgZG9yYy1idWlsZC10ZXN0JHtpZHh9YCkpXG4gICAgICApXG4gICAgKSlcbiAgICAuY2F0Y2godC5mYWlsKVxuICAgIC50aGVuKGNsZWFudXApXG59KVxuXG50ZXN0KCdidWlsZCBjb21tYW5kIGJ1aWxkcyBpbWFnZXMgZm9yIGFsbCBzZXJ2aWNlcycsIHQgPT4ge1xuICB0LnBsYW4oMilcbiAgY29uc3QgY29uZmlnID0gYFxuICAgIHNlcnZpY2VzOlxuICAgICAgZG9sbHk6XG4gICAgICAgIGltYWdlOlxuICAgICAgICAgIGZpbGU6IC4vZG9sbHlcbiAgICAgICAgICB0YWc6IGRvcmMtYnVpbGQtdGVzdC1kb2xseVxuICAgICAgYWRlbGU6XG4gICAgICAgIGltYWdlOlxuICAgICAgICAgIGZpbGU6IC4vYWRlbGVcbiAgICAgICAgICB0YWc6IGRvcmMtYnVpbGQtdGVzdC1hZGVsZVxuICBgXG4gIHNldHVwKGNvbmZpZylcbiAgb3V0cHV0RmlsZShqb2luUGF0aCh0bXBEaXIsICcvZG9sbHknKSwgYFxuICAgIEZST00gcG1rci9oZWxsbzoxLjBcbiAgICBDTUQgW1wiRG9sbHlcIl1cbiAgYClcbiAgb3V0cHV0RmlsZShqb2luUGF0aCh0bXBEaXIsICcvYWRlbGUnKSwgYFxuICAgIEZST00gcG1rci9oZWxsbzoxLjBcbiAgICBDTUQgW1wiZnJvbSB0aGUgb3RoZXIgc2lkZVwiXVxuICBgKVxuICBleGVjQXN5bmMoYCR7Y21kfSBidWlsZCAtLWNvbG9yc2AsIHtjd2Q6IHRtcERpcn0pXG4gICAgLnRoZW4oKFtzdGRvdXQsIHN0ZGVycl0pID0+IGNvbnNvbGUubG9nKHN0ZG91dCkpXG4gICAgLnRoZW4oKCkgPT4gUHJvbWlzZS5hbGwoXG4gICAgICBbXG4gICAgICAgIHtuYW1lOiAnZG9sbHknLCB0YXJnZXQ6ICdEb2xseSd9LFxuICAgICAgICB7bmFtZTogJ2FkZWxlJywgdGFyZ2V0OiAnZnJvbSB0aGUgb3RoZXIgc2lkZSd9XG4gICAgICBdLm1hcChpdGVtID0+IGV4ZWNBc3luYyhgZG9ja2VyIHJ1biAtLXJtIGRvcmMtYnVpbGQtdGVzdC0ke2l0ZW0ubmFtZX1gKVxuICAgICAgICAudGhlbigoW3N0ZG91dCwgc3RkZXJyXSkgPT4ge1xuICAgICAgICAgIGlmIChzdGRvdXQudHJpbSgpID09PSBgSGVsbG8sICR7aXRlbS50YXJnZXR9YCkge1xuICAgICAgICAgICAgdC5wYXNzKHN0ZG91dClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdC5mYWlsKHN0ZGVycilcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCh0LmZhaWwpXG4gICAgICAgIC50aGVuKCgpID0+IGV4ZWNTeW5jKGBkb2NrZXIgcm1pIGRvcmMtYnVpbGQtdGVzdC0ke2l0ZW0ubmFtZX1gKSlcbiAgICAgIClcbiAgICApKVxuICAgIC5jYXRjaCh0LmZhaWwpXG4gICAgLnRoZW4oY2xlYW51cClcbn0pXG5cbnRlc3QoJ2J1aWxkIGNvbW1hbmQgZHJ5IHJ1bicsIHQgPT4ge1xuICB0LnBsYW4oMSlcbiAgY29uc3QgY29uZmlnID0gYFxuICAgIHNlcnZpY2VzOlxuICAgICAgaGVsbG86XG4gICAgICAgIGltYWdlOlxuICAgICAgICAgIGZpbGU6IC4vRG9ja2VyZmlsZVxuICAgICAgICAgIHRhZzogZG9yYy1idWlsZC10ZXN0LWRyeVxuICBgXG4gIHNldHVwKGNvbmZpZylcbiAgZXhlY0FzeW5jKGAke2NtZH0gYnVpbGQgLS1kcnkgaGVsbG8gLS1jb2xvcnNgLCB7Y3dkOiB0bXBEaXJ9KVxuICAgIC50aGVuKChbc3Rkb3V0LCBzdGRlcnJdKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhzdGRvdXQsIHN0ZGVycilcbiAgICAgIHJldHVybiBkb2NrZXIuZ2V0SW1hZ2UoJ2RvcmMtYnVpbGQtdGVzdC1kcnknKS5jYXRjaChlcnIgPT4gdW5kZWZpbmVkKVxuICAgICAgICAudGhlbihpbWFnZSA9PiB7XG4gICAgICAgICAgaWYgKGltYWdlKSB7XG4gICAgICAgICAgICB0LmZhaWwoJ2NyZWF0ZWQgdGhlIGltYWdlIG9uIGRyeSBydW4nKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoc3Rkb3V0LmluY2x1ZGVzKCdkb2NrZXIgYnVpbGQgLS1maWxlIC4vRG9ja2VyZmlsZSAtLXRhZyBkb3JjLWJ1aWxkLXRlc3QtZHJ5JykpIHtcbiAgICAgICAgICAgICAgdC5wYXNzKCdqdXN0IHByaW50ZWQgYW5kIGRpZCBub3QgY3JlYXRlIHRoZSBpbWFnZScpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0LmZhaWwoJ2RpZCBub3QgcHJpbnQgY29ycmVjdGx5JylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSlcbiAgICAuY2F0Y2godC5mYWlsKVxuICAgIC50aGVuKGNsZWFudXApXG59KVxuIl19