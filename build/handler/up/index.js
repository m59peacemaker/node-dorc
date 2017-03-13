const build = require('../build');
const run = require('../run');
const follow = require('../follow');
const needsBuild = require('../../lib/service/needs-build');

const up = (service, options = {}) => {
  return (needsBuild(service) ? build(service, { dry: options.dry }) : Promise.resolve()).then(() => run(service, { cmd: [], options: {}, docker: { detach: true, name: service.container } })).then(() => {
    if (options.detach !== true) {
      return follow(service, {});
    }
  });
};

module.exports = up;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVyL3VwL2luZGV4LmpzIl0sIm5hbWVzIjpbImJ1aWxkIiwicmVxdWlyZSIsInJ1biIsImZvbGxvdyIsIm5lZWRzQnVpbGQiLCJ1cCIsInNlcnZpY2UiLCJvcHRpb25zIiwiZHJ5IiwiUHJvbWlzZSIsInJlc29sdmUiLCJ0aGVuIiwiY21kIiwiZG9ja2VyIiwiZGV0YWNoIiwibmFtZSIsImNvbnRhaW5lciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBLE1BQU1BLFFBQVFDLFFBQVEsVUFBUixDQUFkO0FBQ0EsTUFBTUMsTUFBTUQsUUFBUSxRQUFSLENBQVo7QUFDQSxNQUFNRSxTQUFTRixRQUFRLFdBQVIsQ0FBZjtBQUNBLE1BQU1HLGFBQWFILFFBQVEsK0JBQVIsQ0FBbkI7O0FBRUEsTUFBTUksS0FBSyxDQUFDQyxPQUFELEVBQVVDLFVBQVUsRUFBcEIsS0FBMkI7QUFDcEMsU0FBTyxDQUFDSCxXQUFXRSxPQUFYLElBQXNCTixNQUFNTSxPQUFOLEVBQWUsRUFBQ0UsS0FBS0QsUUFBUUMsR0FBZCxFQUFmLENBQXRCLEdBQTJEQyxRQUFRQyxPQUFSLEVBQTVELEVBQ0pDLElBREksQ0FDQyxNQUFNVCxJQUNWSSxPQURVLEVBRVYsRUFBQ00sS0FBSyxFQUFOLEVBQVVMLFNBQVMsRUFBbkIsRUFBdUJNLFFBQVEsRUFBQ0MsUUFBUSxJQUFULEVBQWVDLE1BQU1ULFFBQVFVLFNBQTdCLEVBQS9CLEVBRlUsQ0FEUCxFQUtKTCxJQUxJLENBS0MsTUFBTTtBQUNWLFFBQUlKLFFBQVFPLE1BQVIsS0FBbUIsSUFBdkIsRUFBNkI7QUFDM0IsYUFBT1gsT0FBT0csT0FBUCxFQUFnQixFQUFoQixDQUFQO0FBQ0Q7QUFDRixHQVRJLENBQVA7QUFVRCxDQVhEOztBQWFBVyxPQUFPQyxPQUFQLEdBQWlCYixFQUFqQiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGJ1aWxkID0gcmVxdWlyZSgnfi9oYW5kbGVyL2J1aWxkJylcbmNvbnN0IHJ1biA9IHJlcXVpcmUoJ34vaGFuZGxlci9ydW4nKVxuY29uc3QgZm9sbG93ID0gcmVxdWlyZSgnfi9oYW5kbGVyL2ZvbGxvdycpXG5jb25zdCBuZWVkc0J1aWxkID0gcmVxdWlyZSgnfi9saWIvc2VydmljZS9uZWVkcy1idWlsZCcpXG5cbmNvbnN0IHVwID0gKHNlcnZpY2UsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICByZXR1cm4gKG5lZWRzQnVpbGQoc2VydmljZSkgPyBidWlsZChzZXJ2aWNlLCB7ZHJ5OiBvcHRpb25zLmRyeX0pIDogUHJvbWlzZS5yZXNvbHZlKCkpXG4gICAgLnRoZW4oKCkgPT4gcnVuKFxuICAgICAgc2VydmljZSxcbiAgICAgIHtjbWQ6IFtdLCBvcHRpb25zOiB7fSwgZG9ja2VyOiB7ZGV0YWNoOiB0cnVlLCBuYW1lOiBzZXJ2aWNlLmNvbnRhaW5lcn19XG4gICAgKSlcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICBpZiAob3B0aW9ucy5kZXRhY2ggIT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIGZvbGxvdyhzZXJ2aWNlLCB7fSlcbiAgICAgIH1cbiAgICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHVwXG4iXX0=