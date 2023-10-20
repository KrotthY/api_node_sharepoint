"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createServerConnection = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _msnodesqlv = _interopRequireDefault(require("msnodesqlv8"));
var createServerConnection = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ipServer, nameServer, userServer, pwdServer) {
    var connectionServers;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          connectionServers = "Driver={SQL Server Native Client 11.0};Server={".concat(ipServer, "\\").concat(nameServer, "};Database={").concat(nameServer, "};UID={").concat(userServer, "};PWD={").concat(pwdServer, "}");
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            _msnodesqlv["default"].open(connectionServers, function (err, conn) {
              if (err) {
                console.error('Error de conexión:', connectionServers, err);
                reject(err);
                return;
              }
              resolve(conn);
            });
          }));
        case 2:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function createServerConnection(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();
exports.createServerConnection = createServerConnection;