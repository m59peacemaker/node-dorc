var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/*{
  global: {},
  sub: {}
  command: ''
}*/

const R = require('ramda');
const minimist = require('minimist');
const argParse = (args, expected, options) => {
  const result = minimist(args, _extends({}, prepOptionsForMinimist(expected), { stopEarly: true }));
  return R.pick(R.keys(expected).concat('_'))(result);
};
const prepOptionsForMinimist = require('./prep-options-for-minimist');

const parse = (options, args) => parseArgs_(options, args, { stopEarly: true });

const parseArgs = (options, commands, args) => {
  var _argParse = argParse(args, options, { stopEarly: true });

  const remA = _argParse._,
        global = _objectWithoutProperties(_argParse, ['_']);

  var _remA = _toArray(remA);

  const commandName = _remA[0],
        remB = _remA.slice(1);

  if (!commands[commandName]) {
    return {
      global
    };
  }
  const command = R.assoc('name', commandName, commands[commandName]);
  const sub = command.parse ? command.parse(remB, command.options) : {};
  return {
    commandName,
    command,
    global,
    sub
  };
};

// TODO: ensure all given args are known

module.exports = parseArgs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvcGFyc2UtYXJncy5qcyJdLCJuYW1lcyI6WyJSIiwicmVxdWlyZSIsIm1pbmltaXN0IiwiYXJnUGFyc2UiLCJhcmdzIiwiZXhwZWN0ZWQiLCJvcHRpb25zIiwicmVzdWx0IiwicHJlcE9wdGlvbnNGb3JNaW5pbWlzdCIsInN0b3BFYXJseSIsInBpY2siLCJrZXlzIiwiY29uY2F0IiwicGFyc2UiLCJwYXJzZUFyZ3NfIiwicGFyc2VBcmdzIiwiY29tbWFuZHMiLCJyZW1BIiwiXyIsImdsb2JhbCIsImNvbW1hbmROYW1lIiwicmVtQiIsImNvbW1hbmQiLCJhc3NvYyIsInN1YiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7QUFNQSxNQUFNQSxJQUFJQyxRQUFRLE9BQVIsQ0FBVjtBQUNBLE1BQU1DLFdBQVdELFFBQVEsVUFBUixDQUFqQjtBQUNBLE1BQU1FLFdBQVcsQ0FBQ0MsSUFBRCxFQUFPQyxRQUFQLEVBQWlCQyxPQUFqQixLQUE2QjtBQUM1QyxRQUFNQyxTQUFTTCxTQUFTRSxJQUFULGVBQW1CSSx1QkFBdUJILFFBQXZCLENBQW5CLElBQXFESSxXQUFXLElBQWhFLElBQWY7QUFDQSxTQUFPVCxFQUFFVSxJQUFGLENBQU9WLEVBQUVXLElBQUYsQ0FBT04sUUFBUCxFQUFpQk8sTUFBakIsQ0FBd0IsR0FBeEIsQ0FBUCxFQUFxQ0wsTUFBckMsQ0FBUDtBQUNELENBSEQ7QUFJQSxNQUFNQyx5QkFBeUJQLFFBQVEsNkJBQVIsQ0FBL0I7O0FBRUEsTUFBTVksUUFBUSxDQUFDUCxPQUFELEVBQVVGLElBQVYsS0FBbUJVLFdBQVdSLE9BQVgsRUFBb0JGLElBQXBCLEVBQTBCLEVBQUNLLFdBQVcsSUFBWixFQUExQixDQUFqQzs7QUFFQSxNQUFNTSxZQUFZLENBQUNULE9BQUQsRUFBVVUsUUFBVixFQUFvQlosSUFBcEIsS0FBNkI7QUFBQSxrQkFDaEJELFNBQVNDLElBQVQsRUFBZUUsT0FBZixFQUF3QixFQUFDRyxXQUFXLElBQVosRUFBeEIsQ0FEZ0I7O0FBQUEsUUFDbkNRLElBRG1DLGFBQ3RDQyxDQURzQztBQUFBLFFBQzFCQyxNQUQwQjs7QUFBQSx1QkFFZEYsSUFGYzs7QUFBQSxRQUV0Q0csV0FGc0M7QUFBQSxRQUV0QkMsSUFGc0I7O0FBRzdDLE1BQUksQ0FBQ0wsU0FBU0ksV0FBVCxDQUFMLEVBQTRCO0FBQzFCLFdBQU87QUFDTEQ7QUFESyxLQUFQO0FBR0Q7QUFDRCxRQUFNRyxVQUFVdEIsRUFBRXVCLEtBQUYsQ0FBUSxNQUFSLEVBQWdCSCxXQUFoQixFQUE2QkosU0FBU0ksV0FBVCxDQUE3QixDQUFoQjtBQUNBLFFBQU1JLE1BQU1GLFFBQVFULEtBQVIsR0FBZ0JTLFFBQVFULEtBQVIsQ0FBY1EsSUFBZCxFQUFvQkMsUUFBUWhCLE9BQTVCLENBQWhCLEdBQXVELEVBQW5FO0FBQ0EsU0FBTztBQUNMYyxlQURLO0FBRUxFLFdBRks7QUFHTEgsVUFISztBQUlMSztBQUpLLEdBQVA7QUFNRCxDQWhCRDs7QUFrQkE7O0FBRUFDLE9BQU9DLE9BQVAsR0FBaUJYLFNBQWpCIiwiZmlsZSI6InBhcnNlLWFyZ3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKntcbiAgZ2xvYmFsOiB7fSxcbiAgc3ViOiB7fVxuICBjb21tYW5kOiAnJ1xufSovXG5cbmNvbnN0IFIgPSByZXF1aXJlKCdyYW1kYScpXG5jb25zdCBtaW5pbWlzdCA9IHJlcXVpcmUoJ21pbmltaXN0JylcbmNvbnN0IGFyZ1BhcnNlID0gKGFyZ3MsIGV4cGVjdGVkLCBvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IG1pbmltaXN0KGFyZ3MsIHsuLi5wcmVwT3B0aW9uc0Zvck1pbmltaXN0KGV4cGVjdGVkKSwgc3RvcEVhcmx5OiB0cnVlfSlcbiAgcmV0dXJuIFIucGljayhSLmtleXMoZXhwZWN0ZWQpLmNvbmNhdCgnXycpKShyZXN1bHQpXG59XG5jb25zdCBwcmVwT3B0aW9uc0Zvck1pbmltaXN0ID0gcmVxdWlyZSgnLi9wcmVwLW9wdGlvbnMtZm9yLW1pbmltaXN0JylcblxuY29uc3QgcGFyc2UgPSAob3B0aW9ucywgYXJncykgPT4gcGFyc2VBcmdzXyhvcHRpb25zLCBhcmdzLCB7c3RvcEVhcmx5OiB0cnVlfSlcblxuY29uc3QgcGFyc2VBcmdzID0gKG9wdGlvbnMsIGNvbW1hbmRzLCBhcmdzKSA9PiB7XG4gIGNvbnN0IHtfOiByZW1BLCAuLi5nbG9iYWx9ID0gYXJnUGFyc2UoYXJncywgb3B0aW9ucywge3N0b3BFYXJseTogdHJ1ZX0pXG4gIGNvbnN0IFtjb21tYW5kTmFtZSwgLi4ucmVtQl0gPSByZW1BXG4gIGlmICghY29tbWFuZHNbY29tbWFuZE5hbWVdKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdsb2JhbFxuICAgIH1cbiAgfVxuICBjb25zdCBjb21tYW5kID0gUi5hc3NvYygnbmFtZScsIGNvbW1hbmROYW1lLCBjb21tYW5kc1tjb21tYW5kTmFtZV0pXG4gIGNvbnN0IHN1YiA9IGNvbW1hbmQucGFyc2UgPyBjb21tYW5kLnBhcnNlKHJlbUIsIGNvbW1hbmQub3B0aW9ucykgOiB7fVxuICByZXR1cm4ge1xuICAgIGNvbW1hbmROYW1lLFxuICAgIGNvbW1hbmQsXG4gICAgZ2xvYmFsLFxuICAgIHN1YlxuICB9XG59XG5cbi8vIFRPRE86IGVuc3VyZSBhbGwgZ2l2ZW4gYXJncyBhcmUga25vd25cblxubW9kdWxlLmV4cG9ydHMgPSBwYXJzZUFyZ3NcbiJdfQ==