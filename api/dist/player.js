"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addPlayer = addPlayer;
exports.getPlayer = getPlayer;
exports.addPoint = addPoint;
exports.players = void 0;
var players = [];
exports.players = players;

function addPlayer(id, name) {
  var points = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  console.log('new player 🔥 ', name);
  return players.push({
    id: id,
    name: name,
    points: points
  });
}

function getPlayer() {
  console.log(players);
  return players;
}

function addPoint(name) {
  console.log(name);
  players.map(function (player) {
    if (player.name == name) {
      console.log('ok');
      player.points += 1;
    }
  });
  console.log(players);
  return players;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wbGF5ZXIudHMiXSwibmFtZXMiOlsicGxheWVycyIsImFkZFBsYXllciIsImlkIiwibmFtZSIsInBvaW50cyIsImNvbnNvbGUiLCJsb2ciLCJwdXNoIiwiZ2V0UGxheWVyIiwiYWRkUG9pbnQiLCJtYXAiLCJwbGF5ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFPLElBQU1BLE9BQWtCLEdBQUcsRUFBM0I7OztBQUVBLFNBQVNDLFNBQVQsQ0FBbUJDLEVBQW5CLEVBQStCQyxJQUEvQixFQUFzRTtBQUFBLE1BQXpCQyxNQUF5Qix1RUFBUixDQUFRO0FBQ3pFQyxFQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxnQkFBWixFQUE4QkgsSUFBOUI7QUFDQSxTQUFPSCxPQUFPLENBQUNPLElBQVIsQ0FBYTtBQUNoQkwsSUFBQUEsRUFBRSxFQUFGQSxFQURnQjtBQUVoQkMsSUFBQUEsSUFBSSxFQUFKQSxJQUZnQjtBQUdoQkMsSUFBQUEsTUFBTSxFQUFOQTtBQUhnQixHQUFiLENBQVA7QUFLSDs7QUFFTSxTQUFTSSxTQUFULEdBQXFCO0FBQ3hCSCxFQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWU4sT0FBWjtBQUNBLFNBQU9BLE9BQVA7QUFDSDs7QUFFTSxTQUFTUyxRQUFULENBQWtCTixJQUFsQixFQUFnQztBQUNuQ0UsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlILElBQVo7QUFDQUgsRUFBQUEsT0FBTyxDQUFDVSxHQUFSLENBQVksVUFBQUMsTUFBTSxFQUFJO0FBQ2xCLFFBQUlBLE1BQU0sQ0FBQ1IsSUFBUCxJQUFlQSxJQUFuQixFQUF5QjtBQUNyQkUsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksSUFBWjtBQUNBSyxNQUFBQSxNQUFNLENBQUNQLE1BQVAsSUFBaUIsQ0FBakI7QUFDSDtBQUNKLEdBTEQ7QUFNQUMsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlOLE9BQVo7QUFDQSxTQUFPQSxPQUFQO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgcGxheWVyczogUGxheWVyIFtdID0gW107XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRQbGF5ZXIoaWQ6IHN0cmluZywgbmFtZTogc3RyaW5nLCBwb2ludHM6IG51bWJlciA9IDApOiBhbnkge1xuICAgIGNvbnNvbGUubG9nKCduZXcgcGxheWVyIPCflKUgJywgbmFtZSk7XG4gICAgcmV0dXJuIHBsYXllcnMucHVzaCh7XG4gICAgICAgIGlkLFxuICAgICAgICBuYW1lLFxuICAgICAgICBwb2ludHNcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBsYXllcigpIHtcbiAgICBjb25zb2xlLmxvZyhwbGF5ZXJzKTtcbiAgICByZXR1cm4gcGxheWVycztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFBvaW50KG5hbWU6IHN0cmluZykge1xuICAgIGNvbnNvbGUubG9nKG5hbWUpO1xuICAgIHBsYXllcnMubWFwKHBsYXllciA9PiB7XG4gICAgICAgIGlmIChwbGF5ZXIubmFtZSA9PSBuYW1lKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnb2snKTtcbiAgICAgICAgICAgIHBsYXllci5wb2ludHMgKz0gMTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKHBsYXllcnMpO1xuICAgIHJldHVybiBwbGF5ZXJzO1xufVxuIl19