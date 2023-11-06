"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteFileRx = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _axios = _interopRequireDefault(require("axios"));
var deleteFileRx = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(accessToken, drivesIdRayos, folderName, fileName) {
    var endpoint;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(!folderName || !fileName)) {
            _context.next = 2;
            break;
          }
          throw new Error("Parametros requeridos no proporcionados");
        case 2:
          endpoint = "https://graph.microsoft.com/v1.0/drives/".concat(drivesIdRayos, "/items/root:/").concat(folderName, "/").concat(fileName);
          _context.prev = 3;
          _context.next = 6;
          return _axios["default"]["delete"](endpoint, {
            headers: {
              'Authorization': "Bearer ".concat(accessToken)
            }
          });
        case 6:
          _context.next = 11;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](3);
          throw new Error("Error al eliminar el archivo: ", _context.t0.response ? _context.t0.response.data : _context.t0.message);
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 8]]);
  }));
  return function deleteFileRx(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();
exports.deleteFileRx = deleteFileRx;