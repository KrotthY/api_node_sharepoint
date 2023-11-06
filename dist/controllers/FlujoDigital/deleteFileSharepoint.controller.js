"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteFilesFlujoDigital = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _deleteFileAuth = require("../../utils/FlujoDigital/deleteFile.auth.js");
var _getCredencialsAuth = require("../../utils/Sharepoint/getCredencials.auth.js");
var _getIdItemsAuth = require("../../utils/Sharepoint/getIdItems.auth.js");
var driveIdFlujo = "b!CzGfDnIio0SyF0mY2qNRneYCk1s-jilIkDxmR_5bBcEqP4tFQ-b0Q55PPh2jhtHN";
var deleteFilesFlujoDigital = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, parentFolderName, subFolderName, fileName, accessToken, parentFolderId;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, parentFolderName = _req$body.parentFolderName, subFolderName = _req$body.subFolderName, fileName = _req$body.fileName;
          _context.next = 4;
          return (0, _getCredencialsAuth.getAccessToken)(process.env.API_TENANT_ID, process.env.API_CLIENT_ID, process.env.API_CLIENT_SECRET);
        case 4:
          accessToken = _context.sent;
          _context.next = 7;
          return (0, _getIdItemsAuth.getFolderId)(accessToken, driveIdFlujo, parentFolderName);
        case 7:
          parentFolderId = _context.sent;
          _context.next = 10;
          return (0, _deleteFileAuth.deleteFileToDrive)(accessToken, driveIdFlujo, parentFolderId, subFolderName, fileName);
        case 10:
          res.json({
            success: true,
            data: "Archivo eliminado correctamente"
          });
          _context.next = 16;
          break;
        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            success: false,
            error: _context.t0.message
          });
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 13]]);
  }));
  return function deleteFilesFlujoDigital(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.deleteFilesFlujoDigital = deleteFilesFlujoDigital;