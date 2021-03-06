#!/usr/bin/env node


const fs = require('fs');
const path = require('path');
const getRunOptions = require('../lib/get-docker-run-options');

fs.writeFileSync(path.join(__dirname, '../../src/handler/run/docker-run-options.json'), JSON.stringify(getRunOptions(), null, 2));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL3NhdmUtcnVuLW9wdGlvbnMuanMiXSwibmFtZXMiOlsiZnMiLCJyZXF1aXJlIiwicGF0aCIsImdldFJ1bk9wdGlvbnMiLCJ3cml0ZUZpbGVTeW5jIiwiam9pbiIsIl9fZGlybmFtZSIsIkpTT04iLCJzdHJpbmdpZnkiXSwibWFwcGluZ3MiOiI7O0FBRUEsTUFBTUEsS0FBS0MsUUFBUSxJQUFSLENBQVg7QUFDQSxNQUFNQyxPQUFPRCxRQUFRLE1BQVIsQ0FBYjtBQUNBLE1BQU1FLGdCQUFnQkYsUUFBUSwrQkFBUixDQUF0Qjs7QUFFQUQsR0FBR0ksYUFBSCxDQUNFRixLQUFLRyxJQUFMLENBQVVDLFNBQVYsRUFBcUIsK0NBQXJCLENBREYsRUFFRUMsS0FBS0MsU0FBTCxDQUFlTCxlQUFmLEVBQWdDLElBQWhDLEVBQXNDLENBQXRDLENBRkYiLCJmaWxlIjoic2F2ZS1ydW4tb3B0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJylcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbmNvbnN0IGdldFJ1bk9wdGlvbnMgPSByZXF1aXJlKCd+L2xpYi9nZXQtZG9ja2VyLXJ1bi1vcHRpb25zJylcblxuZnMud3JpdGVGaWxlU3luYyhcbiAgcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uLy4uL3NyYy9oYW5kbGVyL3J1bi9kb2NrZXItcnVuLW9wdGlvbnMuanNvbicpLFxuICBKU09OLnN0cmluZ2lmeShnZXRSdW5PcHRpb25zKCksIG51bGwsIDIpXG4pXG4iXX0=