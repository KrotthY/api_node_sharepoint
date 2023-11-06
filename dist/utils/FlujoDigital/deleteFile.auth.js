"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteFileToDrive = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _axios = _interopRequireDefault(require("axios"));
var deleteFileToDrive = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(accessToken, driveIdFlujo, parentFolderId, subFolderName, fileName) {
    var endpoint;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (fileName) {
            _context.next = 2;
            break;
          }
          throw new Error("Parametros requeridos no proporcionados 2");
        case 2:
          endpoint = "https://graph.microsoft.com/v1.0/drives/".concat(driveIdFlujo, "/items/").concat(parentFolderId, ":/").concat(subFolderName, "/").concat(fileName);
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
  return function deleteFileToDrive(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();
exports.deleteFileToDrive = deleteFileToDrive;