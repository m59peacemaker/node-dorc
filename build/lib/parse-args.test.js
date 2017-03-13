const test = require('tape');
const parseArgs = require('./parse-args');
const run = require('../handler/run');
const options = require('../options');
const commands = require('../commands');

test('parse args', t => {
  t.plan(1);
  t.deepEqual(parseArgs(options, commands, ['-m', 'dev', 'run', '--dry', '-e', 'FOO=foo', '--detach', '-d', '-e', 'FOO=bar bar', '--no-healthcheck', 'foo', 'doit', 'toit']), {
    command: 'run',
    global: { help: false, mode: 'dev' },
    sub: {
      options: {
        dry: true
      },
      docker: {
        env: ['FOO=foo', 'FOO=bar bar'],
        detach: true,
        'no-healthcheck': true
      },
      service: 'foo',
      cmd: ['doit', 'toit']
    }
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvcGFyc2UtYXJncy50ZXN0LmpzIl0sIm5hbWVzIjpbInRlc3QiLCJyZXF1aXJlIiwicGFyc2VBcmdzIiwicnVuIiwib3B0aW9ucyIsImNvbW1hbmRzIiwidCIsInBsYW4iLCJkZWVwRXF1YWwiLCJjb21tYW5kIiwiZ2xvYmFsIiwiaGVscCIsIm1vZGUiLCJzdWIiLCJkcnkiLCJkb2NrZXIiLCJlbnYiLCJkZXRhY2giLCJzZXJ2aWNlIiwiY21kIl0sIm1hcHBpbmdzIjoiQUFBQSxNQUFNQSxPQUFPQyxRQUFRLE1BQVIsQ0FBYjtBQUNBLE1BQU1DLFlBQVlELFFBQVEsY0FBUixDQUFsQjtBQUNBLE1BQU1FLE1BQU1GLFFBQVEsZ0JBQVIsQ0FBWjtBQUNBLE1BQU1HLFVBQVVILFFBQVEsWUFBUixDQUFoQjtBQUNBLE1BQU1JLFdBQVdKLFFBQVEsYUFBUixDQUFqQjs7QUFFQUQsS0FBSyxZQUFMLEVBQW9CTSxLQUFLO0FBQ3ZCQSxJQUFFQyxJQUFGLENBQU8sQ0FBUDtBQUNBRCxJQUFFRSxTQUFGLENBQ0VOLFVBQ0VFLE9BREYsRUFFRUMsUUFGRixFQUdFLENBQ0UsSUFERixFQUNRLEtBRFIsRUFDZSxLQURmLEVBRUUsT0FGRixFQUVXLElBRlgsRUFFaUIsU0FGakIsRUFFNEIsVUFGNUIsRUFFd0MsSUFGeEMsRUFFOEMsSUFGOUMsRUFFb0QsYUFGcEQsRUFFbUUsa0JBRm5FLEVBRXVGLEtBRnZGLEVBRThGLE1BRjlGLEVBRXNHLE1BRnRHLENBSEYsQ0FERixFQVNFO0FBQ0VJLGFBQVMsS0FEWDtBQUVFQyxZQUFRLEVBQUNDLE1BQU0sS0FBUCxFQUFjQyxNQUFNLEtBQXBCLEVBRlY7QUFHRUMsU0FBSztBQUNIVCxlQUFTO0FBQ1BVLGFBQUs7QUFERSxPQUROO0FBSUhDLGNBQVE7QUFDTkMsYUFBSyxDQUFDLFNBQUQsRUFBWSxhQUFaLENBREM7QUFFTkMsZ0JBQVEsSUFGRjtBQUdOLDBCQUFrQjtBQUhaLE9BSkw7QUFTSEMsZUFBUyxLQVROO0FBVUhDLFdBQUssQ0FBQyxNQUFELEVBQVMsTUFBVDtBQVZGO0FBSFAsR0FURjtBQTBCRCxDQTVCRCIsImZpbGUiOiJwYXJzZS1hcmdzLnRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB0ZXN0ID0gcmVxdWlyZSgndGFwZScpXG5jb25zdCBwYXJzZUFyZ3MgPSByZXF1aXJlKCcuL3BhcnNlLWFyZ3MnKVxuY29uc3QgcnVuID0gcmVxdWlyZSgnfi9oYW5kbGVyL3J1bicpXG5jb25zdCBvcHRpb25zID0gcmVxdWlyZSgnfi9vcHRpb25zJylcbmNvbnN0IGNvbW1hbmRzID0gcmVxdWlyZSgnfi9jb21tYW5kcycpXG5cbnRlc3QoJ3BhcnNlIGFyZ3MnICwgdCA9PiB7XG4gIHQucGxhbigxKVxuICB0LmRlZXBFcXVhbChcbiAgICBwYXJzZUFyZ3MoXG4gICAgICBvcHRpb25zLFxuICAgICAgY29tbWFuZHMsXG4gICAgICBbXG4gICAgICAgICctbScsICdkZXYnLCAncnVuJyxcbiAgICAgICAgJy0tZHJ5JywgJy1lJywgJ0ZPTz1mb28nLCAnLS1kZXRhY2gnLCAnLWQnLCAnLWUnLCAnRk9PPWJhciBiYXInLCAnLS1uby1oZWFsdGhjaGVjaycsICdmb28nLCAnZG9pdCcsICd0b2l0J1xuICAgICAgXVxuICAgICksXG4gICAge1xuICAgICAgY29tbWFuZDogJ3J1bicsXG4gICAgICBnbG9iYWw6IHtoZWxwOiBmYWxzZSwgbW9kZTogJ2Rldid9LFxuICAgICAgc3ViOiB7XG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBkcnk6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIGRvY2tlcjoge1xuICAgICAgICAgIGVudjogWydGT089Zm9vJywgJ0ZPTz1iYXIgYmFyJ10sXG4gICAgICAgICAgZGV0YWNoOiB0cnVlLFxuICAgICAgICAgICduby1oZWFsdGhjaGVjayc6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgc2VydmljZTogJ2ZvbycsXG4gICAgICAgIGNtZDogWydkb2l0JywgJ3RvaXQnXVxuICAgICAgfVxuICAgIH1cbiAgKVxufSlcbiJdfQ==