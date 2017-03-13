var _require = require('ramda');

const pipe = _require.pipe,
      path = _require.path,
      either = _require.either,
      is = _require.is;


const needsBuild = pipe(path(['config', 'image']), either(is(Object), Array.isArray));

module.exports = needsBuild;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvc2VydmljZS9uZWVkcy1idWlsZC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwicGlwZSIsInBhdGgiLCJlaXRoZXIiLCJpcyIsIm5lZWRzQnVpbGQiLCJPYmplY3QiLCJBcnJheSIsImlzQXJyYXkiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiZUFBaUNBLFFBQVEsT0FBUixDOztNQUExQkMsSSxZQUFBQSxJO01BQU1DLEksWUFBQUEsSTtNQUFNQyxNLFlBQUFBLE07TUFBUUMsRSxZQUFBQSxFOzs7QUFFM0IsTUFBTUMsYUFBYUosS0FBS0MsS0FBSyxDQUFDLFFBQUQsRUFBVyxPQUFYLENBQUwsQ0FBTCxFQUFnQ0MsT0FBT0MsR0FBR0UsTUFBSCxDQUFQLEVBQW1CQyxNQUFNQyxPQUF6QixDQUFoQyxDQUFuQjs7QUFFQUMsT0FBT0MsT0FBUCxHQUFpQkwsVUFBakIiLCJmaWxlIjoibmVlZHMtYnVpbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7cGlwZSwgcGF0aCwgZWl0aGVyLCBpc30gPSByZXF1aXJlKCdyYW1kYScpXG5cbmNvbnN0IG5lZWRzQnVpbGQgPSBwaXBlKHBhdGgoWydjb25maWcnLCAnaW1hZ2UnXSksIGVpdGhlcihpcyhPYmplY3QpLCBBcnJheS5pc0FycmF5KSlcblxubW9kdWxlLmV4cG9ydHMgPSBuZWVkc0J1aWxkXG4iXX0=