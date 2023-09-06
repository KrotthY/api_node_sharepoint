"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConnection = getConnection;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _msnodesqlv = _interopRequireDefault(require("msnodesqlv8"));
var connectionString = "Driver={SQL Server Native Client 11.0};Server={".concat(process.env.BD1_SERVER_NAME, "};Database={").concat(process.env.DB1_NAME, "};UID={").concat(process.env.DB1_USER, "};PWD={").concat(process.env.DB1_PWD, "};");
function getConnection() {
  return _getConnection.apply(this, arguments);
}
function _getConnection() {
  _getConnection = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            _msnodesqlv["default"].open(connectionString, function (err, conn) {
              if (err) {
                console.error('Error de conexión:', err);
                reject(err);
                return;
              }
              resolve(conn);
            });
          }));
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _getConnection.apply(this, arguments);
}