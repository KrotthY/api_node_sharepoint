"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteFilesRayos = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _deleteFileAuth = require("../../utils/Rayos/deleteFile.auth.js");
var _getCredencialsAuth = require("../../utils/Sharepoint/getCredencials.auth.js");
var drivesIdRayos = "b!CzGfDnIio0SyF0mY2qNRneYCk1s-jilIkDxmR_5bBcFMwrj_TRaMRJuU_BqjtdcJ";
var deleteFilesRayos = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, fileName, folderName, accessToken;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, fileName = _req$body.fileName, folderName = _req$body.folderName;
          _context.next = 4;
          return (0, _getCredencialsAuth.getAccessToken)(process.env.API_TENANT_ID, process.env.API_CLIENT_ID, process.env.API_CLIENT_SECRET);
        case 4:
          accessToken = _context.sent;
          _context.next = 7;
          return (0, _deleteFileAuth.deleteFileRx)(accessToken, drivesIdRayos, folderName, fileName);
        case 7:
          res.json({
            success: true,
            data: "Archivo borrado correctamente"
          });
          _context.next = 13;
          break;
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            success: false,
            error: _context.t0.message
          });
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 10]]);
  }));
  return function deleteFilesRayos(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.deleteFilesRayos = deleteFilesRayos;