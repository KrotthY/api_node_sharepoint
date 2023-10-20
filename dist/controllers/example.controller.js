"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _auth = require("../utils/auth.js");
var _authFlujoDigital = require("../utils/authFlujoDigital.js");
var test = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, base64, fileName;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          try {
            _req$body = req.body, base64 = _req$body.base64, fileName = _req$body.fileName;
            console.log(base64);
            res.json({
              success: true,
              data: "Archivo subido correctamente"
            });
          } catch (error) {
            res.status(500).json({
              success: false,
              error: error.message
            });
          }
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function test(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.test = test;