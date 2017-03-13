var zipObjRest = function (keys, values) {
  return values.reduce(function (result, v, idx) {
    var key = keys[idx];
    if (idx === keys.length - 1) {
      result[key] = [v];
    } else if (key) {
      result[key] = v;
    } else {
      key = keys[keys.length - 1];
      if (key) {
        result[key].push(v);
      }
    }
    return result;
  }, {});
};

module.exports = zipObjRest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvemlwLW9iai1yZXN0LmpzIl0sIm5hbWVzIjpbInppcE9ialJlc3QiLCJrZXlzIiwidmFsdWVzIiwicmVkdWNlIiwicmVzdWx0IiwidiIsImlkeCIsImtleSIsImxlbmd0aCIsInB1c2giLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFJQSxhQUFhLFVBQVVDLElBQVYsRUFBZ0JDLE1BQWhCLEVBQXdCO0FBQ3ZDLFNBQU9BLE9BQU9DLE1BQVAsQ0FBYyxVQUFVQyxNQUFWLEVBQWtCQyxDQUFsQixFQUFxQkMsR0FBckIsRUFBMEI7QUFDN0MsUUFBSUMsTUFBTU4sS0FBS0ssR0FBTCxDQUFWO0FBQ0EsUUFBSUEsUUFBUUwsS0FBS08sTUFBTCxHQUFjLENBQTFCLEVBQTZCO0FBQzNCSixhQUFPRyxHQUFQLElBQWMsQ0FBQ0YsQ0FBRCxDQUFkO0FBQ0QsS0FGRCxNQUVPLElBQUlFLEdBQUosRUFBUztBQUNkSCxhQUFPRyxHQUFQLElBQWNGLENBQWQ7QUFDRCxLQUZNLE1BRUE7QUFDTEUsWUFBTU4sS0FBS0EsS0FBS08sTUFBTCxHQUFjLENBQW5CLENBQU47QUFDQSxVQUFJRCxHQUFKLEVBQVM7QUFDUEgsZUFBT0csR0FBUCxFQUFZRSxJQUFaLENBQWlCSixDQUFqQjtBQUNEO0FBQ0Y7QUFDRCxXQUFPRCxNQUFQO0FBQ0QsR0FiTSxFQWFKLEVBYkksQ0FBUDtBQWNELENBZkQ7O0FBaUJBTSxPQUFPQyxPQUFQLEdBQWlCWCxVQUFqQiIsImZpbGUiOiJ6aXAtb2JqLXJlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgemlwT2JqUmVzdCA9IGZ1bmN0aW9uIChrZXlzLCB2YWx1ZXMpIHtcbiAgcmV0dXJuIHZhbHVlcy5yZWR1Y2UoZnVuY3Rpb24gKHJlc3VsdCwgdiwgaWR4KSB7XG4gICAgdmFyIGtleSA9IGtleXNbaWR4XVxuICAgIGlmIChpZHggPT09IGtleXMubGVuZ3RoIC0gMSkge1xuICAgICAgcmVzdWx0W2tleV0gPSBbdl1cbiAgICB9IGVsc2UgaWYgKGtleSkge1xuICAgICAgcmVzdWx0W2tleV0gPSB2XG4gICAgfSBlbHNlIHtcbiAgICAgIGtleSA9IGtleXNba2V5cy5sZW5ndGggLSAxXVxuICAgICAgaWYgKGtleSkge1xuICAgICAgICByZXN1bHRba2V5XS5wdXNoKHYpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRcbiAgfSwge30pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gemlwT2JqUmVzdFxuIl19