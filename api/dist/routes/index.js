"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var api = (0, _express.Router)();
api.get('/', function (req, res) {
  res.json({
    status: 'ok'
  });
});
var _default = api;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvaW5kZXgudHMiXSwibmFtZXMiOlsiYXBpIiwiZ2V0IiwicmVxIiwicmVzIiwianNvbiIsInN0YXR1cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBLElBQU1BLEdBQUcsR0FBRyxzQkFBWjtBQUVBQSxHQUFHLENBQUNDLEdBQUosQ0FBUSxHQUFSLEVBQWEsVUFBQ0MsR0FBRCxFQUF1QkMsR0FBdkIsRUFBaUQ7QUFDMURBLEVBQUFBLEdBQUcsQ0FBQ0MsSUFBSixDQUFTO0FBQUVDLElBQUFBLE1BQU0sRUFBRTtBQUFWLEdBQVQ7QUFDSCxDQUZEO2VBR2VMLEciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXhwcmVzcywgeyBSb3V0ZXIgfSBmcm9tICdleHByZXNzJztcbmNvbnN0IGFwaSA9IFJvdXRlcigpO1xuXG5hcGkuZ2V0KCcvJywgKHJlcTogRXhwcmVzcy5SZXF1ZXN0LCByZXM6IEV4cHJlc3MuUmVzcG9uc2UpID0+IHtcbiAgICByZXMuanNvbih7IHN0YXR1czogJ29rJyB9KTtcbn0pO1xuZXhwb3J0IGRlZmF1bHQgYXBpO1xuIl19