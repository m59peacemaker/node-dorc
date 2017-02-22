var _require = require('child_process');

const exec = _require.exec,
      execSync = _require.execSync;

var _require2 = require('../../test');

const test = _require2.test,
      cmd = _require2.cmd,
      tmpDir = _require2.tmpDir,
      _setup = _require2.setup,
      cleanup = _require2.cleanup;

const outputFile = require('output-file-sync');

var _require3 = require('path');

const joinPath = _require3.join;

const run = require('../run');
const build = require('./');

const setup = (config, Dockerfile) => {
  _setup(config);
  outputFile(joinPath(tmpDir, '/Dockerfile'), Dockerfile);
};

test('', t => {
  t.plan(1);
  return t.fail();
  const config = `
    services:
      hello:
        image:
          file: ./Dockerfile
          tags: dorc-build-test
  `;
  const Dockerfile = `
    FROM pmkr/hello:1.0
    CMD ["Dolly"]
  `;
  /*setup(config, Dockerfile)
  exec(`${cmd} build hello`, {cwd: tmpDir}, (err, stdout, stderr) => {
    if (err) {
      return t.fail(err)
    }
    console.log(stdout, stderr)
    return t.fail()
    if (err) {
      t.fail(err)
    } else if (stderr === '' && stdout.split('\n').includes('Hello, World!')) {
      t.pass()
    } else {
      console.log('stdout:', stdout)
      console.error('stderr:', stderr)
      t.fail('Wrong output')
    }
    cleanup()
  })*/
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbWRzL2J1aWxkL2J1aWxkLnRlc3QuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImV4ZWMiLCJleGVjU3luYyIsInRlc3QiLCJjbWQiLCJ0bXBEaXIiLCJfc2V0dXAiLCJzZXR1cCIsImNsZWFudXAiLCJvdXRwdXRGaWxlIiwiam9pblBhdGgiLCJqb2luIiwicnVuIiwiYnVpbGQiLCJjb25maWciLCJEb2NrZXJmaWxlIiwidCIsInBsYW4iLCJmYWlsIl0sIm1hcHBpbmdzIjoiZUFBeUJBLFFBQVEsZUFBUixDOztNQUFsQkMsSSxZQUFBQSxJO01BQU1DLFEsWUFBQUEsUTs7Z0JBT1RGLFFBQVEsWUFBUixDOztNQUxGRyxJLGFBQUFBLEk7TUFDQUMsRyxhQUFBQSxHO01BQ0FDLE0sYUFBQUEsTTtNQUNPQyxNLGFBQVBDLEs7TUFDQUMsTyxhQUFBQSxPOztBQUVGLE1BQU1DLGFBQWFULFFBQVEsa0JBQVIsQ0FBbkI7O2dCQUN5QkEsUUFBUSxNQUFSLEM7O01BQVpVLFEsYUFBTkMsSTs7QUFDUCxNQUFNQyxNQUFNWixRQUFRLFFBQVIsQ0FBWjtBQUNBLE1BQU1hLFFBQVFiLFFBQVEsSUFBUixDQUFkOztBQUVBLE1BQU1PLFFBQVEsQ0FBQ08sTUFBRCxFQUFTQyxVQUFULEtBQXdCO0FBQ3BDVCxTQUFPUSxNQUFQO0FBQ0FMLGFBQVdDLFNBQVNMLE1BQVQsRUFBaUIsYUFBakIsQ0FBWCxFQUE0Q1UsVUFBNUM7QUFDRCxDQUhEOztBQUtBWixLQUFLLEVBQUwsRUFBU2EsS0FBSztBQUNaQSxJQUFFQyxJQUFGLENBQU8sQ0FBUDtBQUNBLFNBQU9ELEVBQUVFLElBQUYsRUFBUDtBQUNBLFFBQU1KLFNBQVU7Ozs7OztHQUFoQjtBQU9BLFFBQU1DLGFBQWM7OztHQUFwQjtBQUlBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkQsQ0FoQ0QiLCJmaWxlIjoiYnVpbGQudGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHtleGVjLCBleGVjU3luY30gPSByZXF1aXJlKCdjaGlsZF9wcm9jZXNzJylcbmNvbnN0IHtcbiAgdGVzdCxcbiAgY21kLFxuICB0bXBEaXIsXG4gIHNldHVwOiBfc2V0dXAsXG4gIGNsZWFudXBcbn0gPSByZXF1aXJlKCd+L3Rlc3QnKVxuY29uc3Qgb3V0cHV0RmlsZSA9IHJlcXVpcmUoJ291dHB1dC1maWxlLXN5bmMnKVxuY29uc3Qge2pvaW46IGpvaW5QYXRofSA9IHJlcXVpcmUoJ3BhdGgnKVxuY29uc3QgcnVuID0gcmVxdWlyZSgnfi9jbWRzL3J1bicpXG5jb25zdCBidWlsZCA9IHJlcXVpcmUoJy4vJylcblxuY29uc3Qgc2V0dXAgPSAoY29uZmlnLCBEb2NrZXJmaWxlKSA9PiB7XG4gIF9zZXR1cChjb25maWcpXG4gIG91dHB1dEZpbGUoam9pblBhdGgodG1wRGlyLCAnL0RvY2tlcmZpbGUnKSwgRG9ja2VyZmlsZSlcbn1cblxudGVzdCgnJywgdCA9PiB7XG4gIHQucGxhbigxKVxuICByZXR1cm4gdC5mYWlsKClcbiAgY29uc3QgY29uZmlnID0gYFxuICAgIHNlcnZpY2VzOlxuICAgICAgaGVsbG86XG4gICAgICAgIGltYWdlOlxuICAgICAgICAgIGZpbGU6IC4vRG9ja2VyZmlsZVxuICAgICAgICAgIHRhZ3M6IGRvcmMtYnVpbGQtdGVzdFxuICBgXG4gIGNvbnN0IERvY2tlcmZpbGUgPSBgXG4gICAgRlJPTSBwbWtyL2hlbGxvOjEuMFxuICAgIENNRCBbXCJEb2xseVwiXVxuICBgXG4gIC8qc2V0dXAoY29uZmlnLCBEb2NrZXJmaWxlKVxuICBleGVjKGAke2NtZH0gYnVpbGQgaGVsbG9gLCB7Y3dkOiB0bXBEaXJ9LCAoZXJyLCBzdGRvdXQsIHN0ZGVycikgPT4ge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIHJldHVybiB0LmZhaWwoZXJyKVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhzdGRvdXQsIHN0ZGVycilcbiAgICByZXR1cm4gdC5mYWlsKClcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0LmZhaWwoZXJyKVxuICAgIH0gZWxzZSBpZiAoc3RkZXJyID09PSAnJyAmJiBzdGRvdXQuc3BsaXQoJ1xcbicpLmluY2x1ZGVzKCdIZWxsbywgV29ybGQhJykpIHtcbiAgICAgIHQucGFzcygpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKCdzdGRvdXQ6Jywgc3Rkb3V0KVxuICAgICAgY29uc29sZS5lcnJvcignc3RkZXJyOicsIHN0ZGVycilcbiAgICAgIHQuZmFpbCgnV3Jvbmcgb3V0cHV0JylcbiAgICB9XG4gICAgY2xlYW51cCgpXG4gIH0pKi9cbn0pXG4iXX0=