var converge = require('ramda/src/converge');
var over = require('ramda/src/over');
var __ = require('ramda/src/__');
var merge = require('ramda/src/merge');
var pipe = require('ramda/src/pipe');
var view = require('ramda/src/view');
var pick = require('ramda/src/pick');
var omit = require('ramda/src/omit');

var moveProps = function (toMove, fromLens, toLens) {
  return converge(function (propsToAdd, inputAfterOmit) {
    return over(toLens, merge(__, propsToAdd), inputAfterOmit);
  }, [pipe(view(fromLens), pick(toMove)), over(fromLens, omit(toMove))]);
};

module.exports = moveProps;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvbW92ZS1wcm9wcy5qcyJdLCJuYW1lcyI6WyJjb252ZXJnZSIsInJlcXVpcmUiLCJvdmVyIiwiX18iLCJtZXJnZSIsInBpcGUiLCJ2aWV3IiwicGljayIsIm9taXQiLCJtb3ZlUHJvcHMiLCJ0b01vdmUiLCJmcm9tTGVucyIsInRvTGVucyIsInByb3BzVG9BZGQiLCJpbnB1dEFmdGVyT21pdCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBLElBQUlBLFdBQVdDLFFBQVEsb0JBQVIsQ0FBZjtBQUNBLElBQUlDLE9BQU9ELFFBQVEsZ0JBQVIsQ0FBWDtBQUNBLElBQUlFLEtBQUtGLFFBQVEsY0FBUixDQUFUO0FBQ0EsSUFBSUcsUUFBUUgsUUFBUSxpQkFBUixDQUFaO0FBQ0EsSUFBSUksT0FBT0osUUFBUSxnQkFBUixDQUFYO0FBQ0EsSUFBSUssT0FBT0wsUUFBUSxnQkFBUixDQUFYO0FBQ0EsSUFBSU0sT0FBT04sUUFBUSxnQkFBUixDQUFYO0FBQ0EsSUFBSU8sT0FBT1AsUUFBUSxnQkFBUixDQUFYOztBQUVBLElBQUlRLFlBQVksVUFBVUMsTUFBVixFQUFrQkMsUUFBbEIsRUFBNEJDLE1BQTVCLEVBQW9DO0FBQ2xELFNBQU9aLFNBQ0wsVUFBVWEsVUFBVixFQUFzQkMsY0FBdEIsRUFBc0M7QUFDcEMsV0FBT1osS0FBS1UsTUFBTCxFQUFhUixNQUFNRCxFQUFOLEVBQVVVLFVBQVYsQ0FBYixFQUFvQ0MsY0FBcEMsQ0FBUDtBQUNELEdBSEksRUFJTCxDQUNFVCxLQUFLQyxLQUFLSyxRQUFMLENBQUwsRUFBcUJKLEtBQUtHLE1BQUwsQ0FBckIsQ0FERixFQUVFUixLQUFLUyxRQUFMLEVBQWVILEtBQUtFLE1BQUwsQ0FBZixDQUZGLENBSkssQ0FBUDtBQVNELENBVkQ7O0FBWUFLLE9BQU9DLE9BQVAsR0FBaUJQLFNBQWpCIiwiZmlsZSI6Im1vdmUtcHJvcHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgY29udmVyZ2UgPSByZXF1aXJlKCdyYW1kYS9zcmMvY29udmVyZ2UnKVxudmFyIG92ZXIgPSByZXF1aXJlKCdyYW1kYS9zcmMvb3ZlcicpXG52YXIgX18gPSByZXF1aXJlKCdyYW1kYS9zcmMvX18nKVxudmFyIG1lcmdlID0gcmVxdWlyZSgncmFtZGEvc3JjL21lcmdlJylcbnZhciBwaXBlID0gcmVxdWlyZSgncmFtZGEvc3JjL3BpcGUnKVxudmFyIHZpZXcgPSByZXF1aXJlKCdyYW1kYS9zcmMvdmlldycpXG52YXIgcGljayA9IHJlcXVpcmUoJ3JhbWRhL3NyYy9waWNrJylcbnZhciBvbWl0ID0gcmVxdWlyZSgncmFtZGEvc3JjL29taXQnKVxuXG52YXIgbW92ZVByb3BzID0gZnVuY3Rpb24gKHRvTW92ZSwgZnJvbUxlbnMsIHRvTGVucykge1xuICByZXR1cm4gY29udmVyZ2UoXG4gICAgZnVuY3Rpb24gKHByb3BzVG9BZGQsIGlucHV0QWZ0ZXJPbWl0KSB7XG4gICAgICByZXR1cm4gb3Zlcih0b0xlbnMsIG1lcmdlKF9fLCBwcm9wc1RvQWRkKSwgaW5wdXRBZnRlck9taXQpXG4gICAgfSxcbiAgICBbXG4gICAgICBwaXBlKHZpZXcoZnJvbUxlbnMpLCBwaWNrKHRvTW92ZSkpLFxuICAgICAgb3Zlcihmcm9tTGVucywgb21pdCh0b01vdmUpKVxuICAgIF1cbiAgKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1vdmVQcm9wc1xuIl19