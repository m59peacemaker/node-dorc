const format = require('chalk');
const split = require('split');
const prefixLines = require('prefix-stream-lines');
const through = require('throo');

const chalkStream = c => {
  return through((push, chunk, enc, cb) => {
    push(format[c](chunk) + '\n');
    cb();
  });
};

const Stream = (name, color, to) => {
  const s = through();
  s.pipe(split()).pipe(chalkStream(color)).pipe(prefixLines(`${ name } | `)).pipe(to);
  return s;
};

const Display = name => {
  const distinctStream = Stream(name, 'cyan', process.stdout);
  const infoStream = Stream(name, 'yellow', process.stdout);
  const errStream = Stream(name, 'red', process.stderr);
  const distinct = d => distinctStream.write(format.cyan.dim.bold(d) + '\n');
  const info = d => infoStream.write(d + '\n');
  const err = d => errStream.write(d + '\n');
  return {
    distinct,
    info,
    err
  };
};

Display.Stream = Stream;

module.exports = Display;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZGlzcGxheS5qcyJdLCJuYW1lcyI6WyJmb3JtYXQiLCJyZXF1aXJlIiwic3BsaXQiLCJwcmVmaXhMaW5lcyIsInRocm91Z2giLCJjaGFsa1N0cmVhbSIsImMiLCJwdXNoIiwiY2h1bmsiLCJlbmMiLCJjYiIsIlN0cmVhbSIsIm5hbWUiLCJjb2xvciIsInRvIiwicyIsInBpcGUiLCJEaXNwbGF5IiwiZGlzdGluY3RTdHJlYW0iLCJwcm9jZXNzIiwic3Rkb3V0IiwiaW5mb1N0cmVhbSIsImVyclN0cmVhbSIsInN0ZGVyciIsImRpc3RpbmN0IiwiZCIsIndyaXRlIiwiY3lhbiIsImRpbSIsImJvbGQiLCJpbmZvIiwiZXJyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTUEsU0FBU0MsUUFBUSxPQUFSLENBQWY7QUFDQSxNQUFNQyxRQUFRRCxRQUFRLE9BQVIsQ0FBZDtBQUNBLE1BQU1FLGNBQWNGLFFBQVEscUJBQVIsQ0FBcEI7QUFDQSxNQUFNRyxVQUFVSCxRQUFRLE9BQVIsQ0FBaEI7O0FBRUEsTUFBTUksY0FBZUMsQ0FBRCxJQUFPO0FBQ3pCLFNBQU9GLFFBQVEsQ0FBQ0csSUFBRCxFQUFPQyxLQUFQLEVBQWNDLEdBQWQsRUFBbUJDLEVBQW5CLEtBQTBCO0FBQ3ZDSCxTQUFLUCxPQUFPTSxDQUFQLEVBQVVFLEtBQVYsSUFBbUIsSUFBeEI7QUFDQUU7QUFDRCxHQUhNLENBQVA7QUFJRCxDQUxEOztBQU9BLE1BQU1DLFNBQVMsQ0FBQ0MsSUFBRCxFQUFPQyxLQUFQLEVBQWNDLEVBQWQsS0FBcUI7QUFDbEMsUUFBTUMsSUFBSVgsU0FBVjtBQUNBVyxJQUNHQyxJQURILENBQ1FkLE9BRFIsRUFFR2MsSUFGSCxDQUVRWCxZQUFZUSxLQUFaLENBRlIsRUFHR0csSUFISCxDQUdRYixZQUFhLElBQUVTLElBQUssTUFBcEIsQ0FIUixFQUlHSSxJQUpILENBSVFGLEVBSlI7QUFLQSxTQUFPQyxDQUFQO0FBQ0QsQ0FSRDs7QUFVQSxNQUFNRSxVQUFVTCxRQUFRO0FBQ3RCLFFBQU1NLGlCQUFpQlAsT0FBT0MsSUFBUCxFQUFhLE1BQWIsRUFBcUJPLFFBQVFDLE1BQTdCLENBQXZCO0FBQ0EsUUFBTUMsYUFBYVYsT0FBT0MsSUFBUCxFQUFhLFFBQWIsRUFBdUJPLFFBQVFDLE1BQS9CLENBQW5CO0FBQ0EsUUFBTUUsWUFBWVgsT0FBT0MsSUFBUCxFQUFhLEtBQWIsRUFBb0JPLFFBQVFJLE1BQTVCLENBQWxCO0FBQ0EsUUFBTUMsV0FBV0MsS0FBS1AsZUFBZVEsS0FBZixDQUFxQjFCLE9BQU8yQixJQUFQLENBQVlDLEdBQVosQ0FBZ0JDLElBQWhCLENBQXFCSixDQUFyQixJQUEwQixJQUEvQyxDQUF0QjtBQUNBLFFBQU1LLE9BQU9MLEtBQUtKLFdBQVdLLEtBQVgsQ0FBaUJELElBQUksSUFBckIsQ0FBbEI7QUFDQSxRQUFNTSxNQUFNTixLQUFLSCxVQUFVSSxLQUFWLENBQWdCRCxJQUFJLElBQXBCLENBQWpCO0FBQ0EsU0FBTztBQUNMRCxZQURLO0FBRUxNLFFBRks7QUFHTEM7QUFISyxHQUFQO0FBS0QsQ0FaRDs7QUFjQWQsUUFBUU4sTUFBUixHQUFpQkEsTUFBakI7O0FBRUFxQixPQUFPQyxPQUFQLEdBQWlCaEIsT0FBakIiLCJmaWxlIjoiZGlzcGxheS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGZvcm1hdCA9IHJlcXVpcmUoJ2NoYWxrJylcbmNvbnN0IHNwbGl0ID0gcmVxdWlyZSgnc3BsaXQnKVxuY29uc3QgcHJlZml4TGluZXMgPSByZXF1aXJlKCdwcmVmaXgtc3RyZWFtLWxpbmVzJylcbmNvbnN0IHRocm91Z2ggPSByZXF1aXJlKCd0aHJvbycpXG5cbmNvbnN0IGNoYWxrU3RyZWFtID0gKGMpID0+IHtcbiAgcmV0dXJuIHRocm91Z2goKHB1c2gsIGNodW5rLCBlbmMsIGNiKSA9PiB7XG4gICAgcHVzaChmb3JtYXRbY10oY2h1bmspICsgJ1xcbicpXG4gICAgY2IoKVxuICB9KVxufVxuXG5jb25zdCBTdHJlYW0gPSAobmFtZSwgY29sb3IsIHRvKSA9PiB7XG4gIGNvbnN0IHMgPSB0aHJvdWdoKClcbiAgc1xuICAgIC5waXBlKHNwbGl0KCkpXG4gICAgLnBpcGUoY2hhbGtTdHJlYW0oY29sb3IpKVxuICAgIC5waXBlKHByZWZpeExpbmVzKGAke25hbWV9IHwgYCkpXG4gICAgLnBpcGUodG8pXG4gIHJldHVybiBzXG59XG5cbmNvbnN0IERpc3BsYXkgPSBuYW1lID0+IHtcbiAgY29uc3QgZGlzdGluY3RTdHJlYW0gPSBTdHJlYW0obmFtZSwgJ2N5YW4nLCBwcm9jZXNzLnN0ZG91dClcbiAgY29uc3QgaW5mb1N0cmVhbSA9IFN0cmVhbShuYW1lLCAneWVsbG93JywgcHJvY2Vzcy5zdGRvdXQpXG4gIGNvbnN0IGVyclN0cmVhbSA9IFN0cmVhbShuYW1lLCAncmVkJywgcHJvY2Vzcy5zdGRlcnIpXG4gIGNvbnN0IGRpc3RpbmN0ID0gZCA9PiBkaXN0aW5jdFN0cmVhbS53cml0ZShmb3JtYXQuY3lhbi5kaW0uYm9sZChkKSArICdcXG4nKVxuICBjb25zdCBpbmZvID0gZCA9PiBpbmZvU3RyZWFtLndyaXRlKGQgKyAnXFxuJylcbiAgY29uc3QgZXJyID0gZCA9PiBlcnJTdHJlYW0ud3JpdGUoZCArICdcXG4nKVxuICByZXR1cm4ge1xuICAgIGRpc3RpbmN0LFxuICAgIGluZm8sXG4gICAgZXJyXG4gIH1cbn1cblxuRGlzcGxheS5TdHJlYW0gPSBTdHJlYW1cblxubW9kdWxlLmV4cG9ydHMgPSBEaXNwbGF5XG4iXX0=