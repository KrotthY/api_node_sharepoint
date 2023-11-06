"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadFilesRayos = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _uploadFileAuth = require("../../utils/Rayos/uploadFile.auth.js");
var _createItemsAuth = require("../../utils/Sharepoint/createItems.auth.js");
var _getCredencialsAuth = require("../../utils/Sharepoint/getCredencials.auth.js");
var _validateItem = require("../../utils/Sharepoint/validateItem.js");
var drivesIdRayos = "b!CzGfDnIio0SyF0mY2qNRneYCk1s-jilIkDxmR_5bBcFMwrj_TRaMRJuU_BqjtdcJ";
var uploadFilesRayos = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, base64, fileName, folderName, mimeType, allowedMimeTypes, accessToken, folderExists;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, base64 = _req$body.base64, fileName = _req$body.fileName, folderName = _req$body.folderName, mimeType = _req$body.mimeType;
          allowedMimeTypes = ['image/jpeg', 'image/png', 'video/mp4'];
          if (allowedMimeTypes.includes(mimeType)) {
            _context.next = 5;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            success: false,
            error: 'Tipo de archivo no permitido'
          }));
        case 5:
          _context.next = 7;
          return (0, _getCredencialsAuth.getAccessToken)(process.env.API_TENANT_ID, process.env.API_CLIENT_ID, process.env.API_CLIENT_SECRET);
        case 7:
          accessToken = _context.sent;
          _context.next = 10;
          return (0, _validateItem.folderExistsUser)(accessToken, drivesIdRayos, folderName);
        case 10:
          folderExists = _context.sent;
          if (folderExists) {
            _context.next = 14;
            break;
          }
          _context.next = 14;
          return (0, _createItemsAuth.createFolderUser)(accessToken, drivesIdRayos, folderName);
        case 14:
          _context.next = 16;
          return (0, _uploadFileAuth.uploadFileToDriveRx)(base64, fileName, accessToken, drivesIdRayos, folderName);
        case 16:
          res.json({
            success: true,
            data: "Archivo subido correctamente"
          });
          _context.next = 22;
          break;
        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            success: false,
            error: _context.t0.message
          });
        case 22:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 19]]);
  }));
  return function uploadFilesRayos(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.uploadFilesRayos = uploadFilesRayos;