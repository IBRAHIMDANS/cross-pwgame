"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.port = exports.server = void 0;

require("reflect-metadata");

var _express = _interopRequireDefault(require("express"));

var _dotenv = require("dotenv");

var bodyParser = _interopRequireWildcard(require("body-parser"));

var _routes = _interopRequireDefault(require("./routes"));

var _cors = _interopRequireDefault(require("cors"));

var _expressCacheController = _interopRequireDefault(require("express-cache-controller"));

var _http = require("http");

var _helmet = _interopRequireDefault(require("helmet"));

var _socket = _interopRequireDefault(require("socket.io"));

var _magicNumber = _interopRequireDefault(require("./games/magicNumber"));

var _player = require("./player");

(0, _dotenv.config)(); // init dotEnv

var app = (0, _express["default"])();
var server = (0, _http.createServer)(app);
exports.server = server;
var io = (0, _socket["default"])(server);
var port = process.env.PORT || 8082;
exports.port = port;
var magicNumber = (0, _magicNumber["default"])();
app.use(bodyParser.json());
app.use((0, _helmet["default"])());
app.use((0, _cors["default"])());
app.use((0, _expressCacheController["default"])({
  noCache: true
}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get('/', _routes["default"]);
app.use(['/api'], _routes["default"]);
io.on('connection', function (socket) {
  console.log('new connection');
  socket.on('event::initialize', function (payload) {
    socket.nameUser = payload.name;
    (0, _player.addPlayer)(socket.id, socket.nameUser, 0);

    if (_player.players.length == 1) {
      io.to(socket.id).emit('event::gameStart', {
        start: false,
        waiting: true,
        full: false
      });
      return;
    }

    if (_player.players.length === 2) {
      io.emit('event::gameStart', {
        start: true,
        waiting: false,
        full: false
      });
    }

    if (_player.players.length > 2) {
      io.to(socket.id).emit('event::gameStart', {
        start: false,
        waiting: false,
        full: true
      });
    }
  });
  socket.on('event::checkNumber', function (payload) {
    var number = payload.number;
    console.log('joueur', socket.nameUser, number);

    switch (true) {
      case magicNumber > number:
        io.to(socket.id).emit('event::sendResponse', {
          status: false,
          response: 'Trop Petit'
        });
        break;

      case magicNumber < number:
        io.to(socket.id).emit('event::sendResponse', {
          status: false,
          response: 'Trop grand'
        });
        break;

      case magicNumber == number:
        io.to(socket.id).emit('event::sendResponse', {
          status: true,
          response: 'Félicitations tu as gagné'
        });
        (0, _player.addPoint)(socket.nameUser);
        break;

      default:
        io.to(socket.id).emit('event::sendResponse', {
          status: true,
          response: 'ohohoh failed'
        });
        break;
    }
  });
  socket.on('disconnect', function () {
    console.log('user disconnected ');
    socket.broadcast.emit('event::disconnect', 'user disconnected');
  });
});
server.listen(port, function () {
  console.log("server started at  ".concat(process.env.HOST + ':' + port || "http://localhost:".concat(port), "/api"));
  console.log('magic Number', magicNumber);
});
var _default = app;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbImFwcCIsInNlcnZlciIsImlvIiwicG9ydCIsInByb2Nlc3MiLCJlbnYiLCJQT1JUIiwibWFnaWNOdW1iZXIiLCJ1c2UiLCJib2R5UGFyc2VyIiwianNvbiIsIm5vQ2FjaGUiLCJ1cmxlbmNvZGVkIiwiZXh0ZW5kZWQiLCJnZXQiLCJyb3V0ZSIsIm9uIiwic29ja2V0IiwiY29uc29sZSIsImxvZyIsInBheWxvYWQiLCJuYW1lVXNlciIsIm5hbWUiLCJpZCIsInBsYXllcnMiLCJsZW5ndGgiLCJ0byIsImVtaXQiLCJzdGFydCIsIndhaXRpbmciLCJmdWxsIiwibnVtYmVyIiwic3RhdHVzIiwicmVzcG9uc2UiLCJicm9hZGNhc3QiLCJsaXN0ZW4iLCJIT1NUIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBLHNCLENBQVU7O0FBRVYsSUFBTUEsR0FBb0IsR0FBRywwQkFBN0I7QUFDTyxJQUFJQyxNQUFjLEdBQUcsd0JBQWFELEdBQWIsQ0FBckI7O0FBQ1AsSUFBTUUsRUFBRSxHQUFHLHdCQUFTRCxNQUFULENBQVg7QUFDTyxJQUFNRSxJQUFJLEdBQUdDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxJQUFaLElBQW9CLElBQWpDOztBQUNQLElBQU1DLFdBQW1CLEdBQUcsOEJBQTVCO0FBR0FQLEdBQUcsQ0FBQ1EsR0FBSixDQUFRQyxVQUFVLENBQUNDLElBQVgsRUFBUjtBQUNBVixHQUFHLENBQUNRLEdBQUosQ0FBUSx5QkFBUjtBQUNBUixHQUFHLENBQUNRLEdBQUosQ0FBUSx1QkFBUjtBQUNBUixHQUFHLENBQUNRLEdBQUosQ0FBUSx3Q0FBYTtBQUFFRyxFQUFBQSxPQUFPLEVBQUU7QUFBWCxDQUFiLENBQVI7QUFDQVgsR0FBRyxDQUFDUSxHQUFKLENBQVFDLFVBQVUsQ0FBQ0csVUFB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QSw4QkFBVWhCLE1BQU0sQ0FBQ0ksUUFBakI7QUFDQTs7QUFDSjtBQUNJbkIsUUFBQUEsRUFBRSxDQUFDd0IsRUFBSCxDQUFNVCxNQUFNLENBQUNNLEVBQWIsRUFBaUJJLElBQWpCLENBQXNCLHFCQUF0QixFQUE2QztBQUFFSyxVQUFBQSxNQUFNLEVBQUUsSUFBVjtBQUFnQkMsVUFBQUEsUUFBUSxFQUFFO0FBQTFCLFNBQTdDO0FBQ0E7QUFiUjtBQWVILEdBbEJEO0FBbUJBaEIsRUFBQUEsTUFBTSxDQUFDRCxFQUFQLENBQVUsWUFBVixFQUF3QixZQUFNO0FBQzFCRSxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxvQkFBWjtBQUNBRixJQUFBQSxNQUFNLENBQUNpQixTQUFQLENBQWlCUCxJQUFqQixDQUFzQixtQkFBdEIsRUFBMkMsbUJBQTNDO0FBQ0gsR0FIRDtBQUtILENBekNEO0FBMkNBMUIsTUFBTSxDQUFDa0MsTUFBUCxDQUFjaEMsSUFBZCxFQUFvQixZQUFNO0FBQ3RCZSxFQUFBQSxPQUFPLENBQUNDLEdBQVIsOEJBQzBCZixPQUFPLENBQUNDLEdBQVIsQ0FBWStCLElBQVosR0FBbUIsR0FBbkIsR0FBeUJqQyxJQUF6QiwrQkFDRkEsSUFERSxDQUQxQjtBQUlBZSxFQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxjQUFaLEVBQTRCWixXQUE1QjtBQUNILENBTkQ7ZUFPZVAsRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAncmVmbGVjdC1tZXRhZGF0YSc7XG5pbXBvcnQgRXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJ2RvdGVudic7XG5pbXBvcnQgKiBhcyBib2R5UGFyc2VyIGZyb20gJ2JvZHktcGFyc2VyJztcbmltcG9ydCByb3V0ZSBmcm9tICcuL3JvdXRlcyc7XG5pbXBvcnQgY29ycyBmcm9tICdjb3JzJztcbmltcG9ydCBjYWNoZUNvbnRyb2wgZnJvbSAnZXhwcmVzcy1jYWNoZS1jb250cm9sbGVyJztcbmltcG9ydCB7IGNyZWF0ZVNlcnZlciwgU2VydmVyIH0gZnJvbSAnaHR0cCc7XG5pbXBvcnQgaGVsbWV0IGZyb20gJ2hlbG1ldCc7XG5pbXBvcnQgc29ja2V0SU8gZnJvbSAnc29ja2V0LmlvJztcbmltcG9ydCBnZXROdW1iZXIgZnJvbSAnLi9nYW1lcy9tYWdpY051bWJlcic7XG5pbXBvcnQgeyBhZGRQbGF5ZXIsIGFkZFBvaW50LCBwbGF5ZXJzIH0gZnJvbSAnLi9wbGF5ZXInO1xuXG5jb25maWcoKTsgLy8gaW5pdCBkb3RFbnZcblxuY29uc3QgYXBwOiBFeHByZXNzLkV4cHJlc3MgPSBFeHByZXNzKCk7XG5leHBvcnQgbGV0IHNlcnZlcjogU2VydmVyID0gY3JlYXRlU2VydmVyKGFwcCk7XG5jb25zdCBpbyA9IHNvY2tldElPKHNlcnZlcik7XG5leHBvcnQgY29uc3QgcG9ydCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgODA4MjtcbmNvbnN0IG1hZ2ljTnVtYmVyOiBudW1iZXIgPSBnZXROdW1iZXIoKTtcblxuXG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcbmFwcC51c2UoaGVsbWV0KCkpO1xuYXBwLnVzZShjb3JzKCkpO1xuYXBwLnVzZShjYWNoZUNvbnRyb2woeyBub0NhY2hlOiB0cnVlIH0pKTtcbmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IHRydWUgfSkpO1xuXG5hcHAuZ2V0KCcvJywgcm91dGUpO1xuYXBwLnVzZShbJy9hcGknXSwgcm91dGUpO1xuXG5pby5vbignY29ubmVjdGlvbicsIChzb2NrZXQpID0+IHtcbiAgICBjb25zb2xlLmxvZygnbmV3IGNvbm5lY3Rpb24nKTtcbiAgICBzb2NrZXQub24oJ2V2ZW50Ojppbml0aWFsaXplJywgcGF5bG9hZCA9PiB7XG4gICAgICAgIHNvY2tldC5uYW1lVXNlciA9IHBheWxvYWQubmFtZTtcbiAgICAgICAgYWRkUGxheWVyKHNvY2tldC5pZCwgc29ja2V0Lm5hbWVVc2VyLCAwKTtcbiAgICAgICAgaWYgKHBsYXllcnMubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgIGlvLnRvKHNvY2tldC5pZCkuZW1pdCgnZXZlbnQ6OmdhbWVTdGFydCcseyBzdGFydDogZmFsc2UsIHdhaXRpbmc6IHRydWUsIGZ1bGw6IGZhbHNlIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwbGF5ZXJzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgaW8uZW1pdCgnZXZlbnQ6OmdhbWVTdGFydCcsIHsgc3RhcnQ6IHRydWUsIHdhaXRpbmc6IGZhbHNlLCBmdWxsOiBmYWxzZSB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGxheWVycy5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICBpby50byhzb2NrZXQuaWQpLmVtaXQoJ2V2ZW50OjpnYW1lU3RhcnQnLHsgc3RhcnQ6IGZhbHNlLCB3YWl0aW5nOiBmYWxzZSwgZnVsbDogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgc29ja2V0Lm9uKCdldmVudDo6Y2hlY2tOdW1iZXInLCBwYXlsb2FkID0+IHtcbiAgICAgICAgY29uc3QgbnVtYmVyOiBudW1iZXIgPSBwYXlsb2FkLm51bWJlciBhcyBudW1iZXI7XG4gICAgICAgIGNvbnNvbGUubG9nKCdqb3VldXInLCBzb2NrZXQubmFtZVVzZXIsIG51bWJlcik7XG4gICAgICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICAgICAgY2FzZSAobWFnaWNOdW1iZXIgPiBudW1iZXIpIDpcbiAgICAgICAgICAgICAgICBpby50byhzb2NrZXQuaWQpLmVtaXQoJ2V2ZW50OjpzZW5kUmVzcG9uc2UnLCB7IHN0YXR1czogZmFsc2UsIHJlc3BvbnNlOiAnVHJvcCBQZXRpdCcgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIG1hZ2ljTnVtYmVyIDwgbnVtYmVyOlxuICAgICAgICAgICAgICAgIGlvLnRvKHNvY2tldC5pZCkuZW1pdCgnZXZlbnQ6OnNlbmRSZXNwb25zZScsIHsgc3RhdHVzOiBmYWxzZSwgcmVzcG9uc2U6ICdUcm9wIGdyYW5kJyB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgbWFnaWNOdW1iZXIgPT0gbnVtYmVyOlxuICAgICAgICAgICAgICAgIGlvLnRvKHNvY2tldC5pZCkuZW1pdCgnZXZlbnQ6OnNlbmRSZXNwb25zZScsIHsgc3RhdHVzOiB0cnVlLCByZXNwb25zZTogJ0bDqWxpY2l0YXRpb25zIHR1IGFzIGdhZ27DqScgfSk7XG4gICAgICAgICAgICAgICAgYWRkUG9pbnQoKHNvY2tldC5uYW1lVXNlciBhcyBzdHJpbmcpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgaW8udG8oc29ja2V0LmlkKS5lbWl0KCdldmVudDo6c2VuZFJlc3BvbnNlJywgeyBzdGF0dXM6IHRydWUsIHJlc3BvbnNlOiAnb2hvaG9oIGZhaWxlZCcgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBzb2NrZXQub24oJ2Rpc2Nvbm5lY3QnLCAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd1c2VyIGRpc2Nvbm5lY3RlZCAnKTtcbiAgICAgICAgc29ja2V0LmJyb2FkY2FzdC5lbWl0KCdldmVudDo6ZGlzY29ubmVjdCcsICd1c2VyIGRpc2Nvbm5lY3RlZCcpO1xuICAgIH0pO1xuXG59KTtcblxuc2VydmVyLmxpc3Rlbihwb3J0LCAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coXG4gICAgICAgIGBzZXJ2ZXIgc3RhcnRlZCBhdCAgJHtwcm9jZXNzLmVudi5IT1NUICsgJzonICsgcG9ydCB8fFxuICAgICAgICBgaHR0cDovL2xvY2FsaG9zdDoke3BvcnR9YH0vYXBpYCxcbiAgICApO1xuICAgIGNvbnNvbGUubG9nKCdtYWdpYyBOdW1iZXInLCBtYWdpY051bWJlcik7XG59KTtcbmV4cG9ydCBkZWZhdWx0IGFwcDtcbiJdfQ==