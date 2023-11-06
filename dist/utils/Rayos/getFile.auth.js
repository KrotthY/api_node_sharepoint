"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFilesToDriveRx = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _axios = _interopRequireDefault(require("axios"));
var getFilesToDriveRx = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(accessToken, drivesIdRayos, folderName) {
    var endpoint, response, AllData;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (folderName) {
            _context.next = 2;
            break;
          }
          throw new Error("Parametros requeridos no proporcionados.");
        case 2:
          endpoint = "https://graph.microsoft.com/v1.0/drives/".concat(drivesIdRayos, "/root:/").concat(folderName, ":/children");
          _context.prev = 3;
          _context.next = 6;
          return _axios["default"].get(endpoint, {
            headers: {
              'Authorization': "Bearer ".concat(accessToken)
            }
          });
        case 6:
          response = _context.sent;
          AllData = response.data.value;
          return _context.abrupt("return", AllData.map(function (file) {
            return {
              name: file.name,
              url: file['@microsoft.graph.downloadUrl']
            };
          }));
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](3);
          throw new Error("Error al obtener las imagenes solicitadas: ", _context.t0.response ? _context.t0.response.data : _context.t0.message);
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 11]]);
  }));
  return function getFilesToDriveRx(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
exports.getFilesToDriveRx = getFilesToDriveRx;