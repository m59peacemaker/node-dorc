var _require = require('child_process');

const spawn = _require.spawn;

const prefixLines = require('prefix-stream-lines');
const format = require('chalk');
const colors = ['cyan', 'yellow', 'green', 'magenta', 'blue'];
function Next(array) {
  let index = -1;
  return function () {
    index = index >= array.length - 1 ? 0 : index + 1;
    return array[index];
  };
}
const nextColor = Next(colors);

const connect = name => {
  const color = nextColor();
  const p = spawn('docker', ['logs', '--follow', name]);
  p.stdout.pipe(prefixLines(`${ format[color](name) } | `)).pipe(process.stdout);
  p.stderr.pipe(prefixLines(`${ format[color](name) } | `)).pipe(process.stderr);
};

module.exports = connect;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvY29ubmVjdC1sb2cuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsInNwYXduIiwicHJlZml4TGluZXMiLCJmb3JtYXQiLCJjb2xvcnMiLCJOZXh0IiwiYXJyYXkiLCJpbmRleCIsImxlbmd0aCIsIm5leHRDb2xvciIsImNvbm5lY3QiLCJuYW1lIiwiY29sb3IiLCJwIiwic3Rkb3V0IiwicGlwZSIsInByb2Nlc3MiLCJzdGRlcnIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiZUFBZ0JBLFFBQVEsZUFBUixDOztNQUFUQyxLLFlBQUFBLEs7O0FBQ1AsTUFBTUMsY0FBY0YsUUFBUSxxQkFBUixDQUFwQjtBQUNBLE1BQU1HLFNBQVNILFFBQVEsT0FBUixDQUFmO0FBQ0EsTUFBTUksU0FBUyxDQUFDLE1BQUQsRUFBUyxRQUFULEVBQW1CLE9BQW5CLEVBQTRCLFNBQTVCLEVBQXVDLE1BQXZDLENBQWY7QUFDQSxTQUFTQyxJQUFULENBQWVDLEtBQWYsRUFBc0I7QUFDcEIsTUFBSUMsUUFBUSxDQUFDLENBQWI7QUFDQSxTQUFPLFlBQVk7QUFDakJBLFlBQVFBLFNBQVNELE1BQU1FLE1BQU4sR0FBYyxDQUF2QixHQUEyQixDQUEzQixHQUErQkQsUUFBUSxDQUEvQztBQUNBLFdBQU9ELE1BQU1DLEtBQU4sQ0FBUDtBQUNELEdBSEQ7QUFJRDtBQUNELE1BQU1FLFlBQVlKLEtBQUtELE1BQUwsQ0FBbEI7O0FBRUEsTUFBTU0sVUFBV0MsSUFBRCxJQUFVO0FBQ3hCLFFBQU1DLFFBQVFILFdBQWQ7QUFDQSxRQUFNSSxJQUFJWixNQUFNLFFBQU4sRUFBZ0IsQ0FBQyxNQUFELEVBQVMsVUFBVCxFQUFxQlUsSUFBckIsQ0FBaEIsQ0FBVjtBQUNBRSxJQUFFQyxNQUFGLENBQ0dDLElBREgsQ0FDUWIsWUFBYSxJQUFFQyxPQUFPUyxLQUFQLEVBQWNELElBQWQsQ0FBb0IsTUFBbkMsQ0FEUixFQUVHSSxJQUZILENBRVFDLFFBQVFGLE1BRmhCO0FBR0FELElBQUVJLE1BQUYsQ0FDR0YsSUFESCxDQUNRYixZQUFhLElBQUVDLE9BQU9TLEtBQVAsRUFBY0QsSUFBZCxDQUFvQixNQUFuQyxDQURSLEVBRUdJLElBRkgsQ0FFUUMsUUFBUUMsTUFGaEI7QUFHRCxDQVREOztBQVdBQyxPQUFPQyxPQUFQLEdBQWlCVCxPQUFqQiIsImZpbGUiOiJjb25uZWN0LWxvZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHtzcGF3bn0gPSByZXF1aXJlKCdjaGlsZF9wcm9jZXNzJylcbmNvbnN0IHByZWZpeExpbmVzID0gcmVxdWlyZSgncHJlZml4LXN0cmVhbS1saW5lcycpXG5jb25zdCBmb3JtYXQgPSByZXF1aXJlKCdjaGFsaycpXG5jb25zdCBjb2xvcnMgPSBbJ2N5YW4nLCAneWVsbG93JywgJ2dyZWVuJywgJ21hZ2VudGEnLCAnYmx1ZSddXG5mdW5jdGlvbiBOZXh0IChhcnJheSkge1xuICBsZXQgaW5kZXggPSAtMVxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGluZGV4ID0gaW5kZXggPj0gYXJyYXkubGVuZ3RoIC0xID8gMCA6IGluZGV4ICsgMVxuICAgIHJldHVybiBhcnJheVtpbmRleF1cbiAgfVxufVxuY29uc3QgbmV4dENvbG9yID0gTmV4dChjb2xvcnMpXG5cbmNvbnN0IGNvbm5lY3QgPSAobmFtZSkgPT4ge1xuICBjb25zdCBjb2xvciA9IG5leHRDb2xvcigpXG4gIGNvbnN0IHAgPSBzcGF3bignZG9ja2VyJywgWydsb2dzJywgJy0tZm9sbG93JywgbmFtZV0pXG4gIHAuc3Rkb3V0XG4gICAgLnBpcGUocHJlZml4TGluZXMoYCR7Zm9ybWF0W2NvbG9yXShuYW1lKX0gfCBgKSlcbiAgICAucGlwZShwcm9jZXNzLnN0ZG91dClcbiAgcC5zdGRlcnJcbiAgICAucGlwZShwcmVmaXhMaW5lcyhgJHtmb3JtYXRbY29sb3JdKG5hbWUpfSB8IGApKVxuICAgIC5waXBlKHByb2Nlc3Muc3RkZXJyKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbm5lY3RcbiJdfQ==