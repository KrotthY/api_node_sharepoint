"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subFolderExistsUser = exports.folderExistsUser = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _axios = _interopRequireDefault(require("axios"));
var folderExistsUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(accessToken, driveId, folderName) {
    var endpoint, response, folders;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (folderName) {
            _context.next = 2;
            break;
          }
          throw new Error("Parametros requeridos no proporcionados");
        case 2:
          endpoint = "https://graph.microsoft.com/v1.0/drives/".concat(driveId, "/root/children?$filter=name eq '").concat(folderName, "'");
          _context.prev = 3;
          _context.next = 6;
          return _axios["default"].get(endpoint, {
            headers: {
              'Authorization': "Bearer ".concat(accessToken)
            }
          });
        case 6:
          response = _context.sent;
          folders = response.data.value;
          if (!(folders.length > 0)) {
            _context.next = 12;
            break;
          }
          return _context.abrupt("return", folders[0].id);
        case 12:
          return _context.abrupt("return", null);
        case 13:
          _context.next = 18;
          break;
        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](3);
          throw new Error("Error la carpeta existe: ", _context.t0.response ? _context.t0.response.data : _context.t0.message);
        case 18:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 15]]);
  }));
  return function folderExistsUser(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
exports.folderExistsUser = folderExistsUser;
var subFolderExistsUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(accessToken, driveId, parentFolderId, subFolderName) {
    var endpoint, response;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (subFolderName) {
            _context2.next = 2;
            break;
          }
          throw new Error("Parametros requeridos no proporcionados");
        case 2:
          endpoint = "https://graph.microsoft.com/v1.0/drives/".concat(driveId, "/items/").concat(parentFolderId, "/children?$filter=name eq '").concat(subFolderName, "'");
          _context2.prev = 3;
          _context2.next = 6;
          return _axios["default"].get(endpoint, {
            headers: {
              'Authorization': "Bearer ".concat(accessToken)
            }
          });
        case 6:
          response = _context2.sent;
          return _context2.abrupt("return", response.data.value.length > 0);
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](3);
          throw new Error("Error la carpeta existe: ", _context2.t0.response ? _context2.t0.response.data : _context2.t0.message);
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[3, 10]]);
  }));
  return function subFolderExistsUser(_x4, _x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();
exports.subFolderExistsUser = subFolderExistsUser;