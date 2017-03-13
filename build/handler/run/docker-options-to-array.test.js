const test = require('tape');
const toArray = require('./docker-options-to-array');

test('dockerOptionsToArray', t => {
  t.deepEqual(toArray({
    env: ['FOO=foo', 'FOO=bar bar'],
    detach: true,
    'no-healthcheck': true,
    net: 'host'
  }), ['--env', 'FOO=foo', '--env', 'FOO=bar bar', '--detach', '--no-healthcheck', '--net', 'host']);
  t.end();
});

test('dockerOptionsToArray | false values are ignored', t => {
  t.deepEqual(toArray({
    env: ['FOO=foo', 'FOO=bar bar'],
    detach: false,
    'no-healthcheck': true,
    net: 'host'
  }), ['--env', 'FOO=foo', '--env', 'FOO=bar bar', '--no-healthcheck', '--net', 'host']);
  t.end();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVyL3J1bi9kb2NrZXItb3B0aW9ucy10by1hcnJheS50ZXN0LmpzIl0sIm5hbWVzIjpbInRlc3QiLCJyZXF1aXJlIiwidG9BcnJheSIsInQiLCJkZWVwRXF1YWwiLCJlbnYiLCJkZXRhY2giLCJuZXQiLCJlbmQiXSwibWFwcGluZ3MiOiJBQUFBLE1BQU1BLE9BQU9DLFFBQVEsTUFBUixDQUFiO0FBQ0EsTUFBTUMsVUFBVUQsUUFBUSwyQkFBUixDQUFoQjs7QUFFQUQsS0FBSyxzQkFBTCxFQUE2QkcsS0FBSztBQUNoQ0EsSUFBRUMsU0FBRixDQUNFRixRQUFRO0FBQ05HLFNBQUssQ0FBQyxTQUFELEVBQVksYUFBWixDQURDO0FBRU5DLFlBQVEsSUFGRjtBQUdOLHNCQUFrQixJQUhaO0FBSU5DLFNBQUs7QUFKQyxHQUFSLENBREYsRUFPRSxDQUFDLE9BQUQsRUFBVSxTQUFWLEVBQXFCLE9BQXJCLEVBQThCLGFBQTlCLEVBQTZDLFVBQTdDLEVBQXlELGtCQUF6RCxFQUE2RSxPQUE3RSxFQUFzRixNQUF0RixDQVBGO0FBU0FKLElBQUVLLEdBQUY7QUFDRCxDQVhEOztBQWFBUixLQUFLLGlEQUFMLEVBQXdERyxLQUFLO0FBQzNEQSxJQUFFQyxTQUFGLENBQ0VGLFFBQVE7QUFDTkcsU0FBSyxDQUFDLFNBQUQsRUFBWSxhQUFaLENBREM7QUFFTkMsWUFBUSxLQUZGO0FBR04sc0JBQWtCLElBSFo7QUFJTkMsU0FBSztBQUpDLEdBQVIsQ0FERixFQU9FLENBQUMsT0FBRCxFQUFVLFNBQVYsRUFBcUIsT0FBckIsRUFBOEIsYUFBOUIsRUFBNkMsa0JBQTdDLEVBQWlFLE9BQWpFLEVBQTBFLE1BQTFFLENBUEY7QUFTQUosSUFBRUssR0FBRjtBQUNELENBWEQiLCJmaWxlIjoiZG9ja2VyLW9wdGlvbnMtdG8tYXJyYXkudGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHRlc3QgPSByZXF1aXJlKCd0YXBlJylcbmNvbnN0IHRvQXJyYXkgPSByZXF1aXJlKCcuL2RvY2tlci1vcHRpb25zLXRvLWFycmF5JylcblxudGVzdCgnZG9ja2VyT3B0aW9uc1RvQXJyYXknLCB0ID0+IHtcbiAgdC5kZWVwRXF1YWwoXG4gICAgdG9BcnJheSh7XG4gICAgICBlbnY6IFsnRk9PPWZvbycsICdGT089YmFyIGJhciddLFxuICAgICAgZGV0YWNoOiB0cnVlLFxuICAgICAgJ25vLWhlYWx0aGNoZWNrJzogdHJ1ZSxcbiAgICAgIG5ldDogJ2hvc3QnXG4gICAgfSksXG4gICAgWyctLWVudicsICdGT089Zm9vJywgJy0tZW52JywgJ0ZPTz1iYXIgYmFyJywgJy0tZGV0YWNoJywgJy0tbm8taGVhbHRoY2hlY2snLCAnLS1uZXQnLCAnaG9zdCddXG4gIClcbiAgdC5lbmQoKVxufSlcblxudGVzdCgnZG9ja2VyT3B0aW9uc1RvQXJyYXkgfCBmYWxzZSB2YWx1ZXMgYXJlIGlnbm9yZWQnLCB0ID0+IHtcbiAgdC5kZWVwRXF1YWwoXG4gICAgdG9BcnJheSh7XG4gICAgICBlbnY6IFsnRk9PPWZvbycsICdGT089YmFyIGJhciddLFxuICAgICAgZGV0YWNoOiBmYWxzZSxcbiAgICAgICduby1oZWFsdGhjaGVjayc6IHRydWUsXG4gICAgICBuZXQ6ICdob3N0J1xuICAgIH0pLFxuICAgIFsnLS1lbnYnLCAnRk9PPWZvbycsICctLWVudicsICdGT089YmFyIGJhcicsICctLW5vLWhlYWx0aGNoZWNrJywgJy0tbmV0JywgJ2hvc3QnXVxuICApXG4gIHQuZW5kKClcbn0pXG4iXX0=