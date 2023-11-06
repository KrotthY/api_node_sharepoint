"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSubFolderId = exports.getFolderId = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _axios = _interopRequireDefault(require("axios"));
var getFolderId = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(accessToken, driveId, parentFolderName) {
    var endpoint, response;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (parentFolderName) {
            _context.next = 2;
            break;
          }
          throw new Error("Parametros requeridos no proporcionados 1 ".concat(parentFolderName));
        case 2:
          endpoint = "https://graph.microsoft.com/v1.0/drives/".concat(driveId, "/items/root:/").concat(parentFolderName, ":/");
          _context.prev = 3;
          _context.next = 6;
          return _axios["default"].get(endpoint, {
            headers: {
              'Authorization': "Bearer ".concat(accessToken)
            }
          });
        case 6:
          response = _context.sent;
          return _context.abrupt("return", response.data.id);
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](3);
          throw new Error("Error al obtener el id subcarpeta: ", _context.t0.response ? _context.t0.response.data : _context.t0.message);
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 10]]);
  }));
  return function getFolderId(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
exports.getFolderId = getFolderId;
var getSubFolderId = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(accessToken, driveId, parentFolderId, subFolderName) {
    var endpoint, response;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (subFolderName) {
            _context2.next = 2;
            break;
          }
          throw new Error("Parametros requeridos no proporcionados getSubFolderId");
        case 2:
          endpoint = "https://graph.microsoft.com/v1.0/drives/".concat(driveId, "/items/").concat(parentFolderId, ":/").concat(subFolderName, "/");
          _context2.prev = 3;
          _context2.next = 6;
          return _axios["default"].get(endpoint, {
            headers: {
              'Authorization': "Bearer ".concat(accessToken)
            }
          });
        case 6:
          response = _context2.sent;
          return _context2.abrupt("return", response.data.id);
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](3);
          throw new Error("Error al obtener el id subcarpeta: ", _context2.t0.response ? _context2.t0.response.data : _context2.t0.message);
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[3, 10]]);
  }));
  return function getSubFolderId(_x4, _x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getSubFolderId = getSubFolderId;