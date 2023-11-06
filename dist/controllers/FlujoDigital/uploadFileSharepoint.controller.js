"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadFilesFlujoDigital = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _uploadFileAuth = require("../../utils/FlujoDigital/uploadFile.auth.js");
var _createItemsAuth = require("../../utils/Sharepoint/createItems.auth.js");
var _getCredencialsAuth = require("../../utils/Sharepoint/getCredencials.auth.js");
var _validateItem = require("../../utils/Sharepoint/validateItem.js");
var driveId = "b!CzGfDnIio0SyF0mY2qNRneYCk1s-jilIkDxmR_5bBcEqP4tFQ-b0Q55PPh2jhtHN";
var uploadFilesFlujoDigital = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, folderUser, subFolderName, fileName, contentFile, accessToken, parentFolderId, folderUserExists, parentFolder;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, folderUser = _req$body.folderUser, subFolderName = _req$body.subFolderName, fileName = _req$body.fileName, contentFile = _req$body.contentFile;
          _context.next = 4;
          return (0, _getCredencialsAuth.getAccessToken)(process.env.API_TENANT_ID, process.env.API_CLIENT_ID, process.env.API_CLIENT_SECRET);
        case 4:
          accessToken = _context.sent;
          _context.next = 7;
          return (0, _validateItem.folderExistsUser)(accessToken, driveId, folderUser);
        case 7:
          folderUserExists = _context.sent;
          if (folderUserExists) {
            _context.next = 15;
            break;
          }
          _context.next = 11;
          return (0, _createItemsAuth.createFolderUser)(accessToken, driveId, folderUser);
        case 11:
          parentFolder = _context.sent;
          parentFolderId = parentFolder.id;
          _context.next = 16;
          break;
        case 15:
          parentFolderId = folderUserExists;
        case 16:
          _context.next = 18;
          return (0, _validateItem.subFolderExistsUser)(accessToken, driveId, parentFolderId, subFolderName);
        case 18:
          if (_context.sent) {
            _context.next = 21;
            break;
          }
          _context.next = 21;
          return (0, _createItemsAuth.createsubFolderUser)(accessToken, driveId, parentFolderId, subFolderName);
        case 21:
          _context.next = 23;
          return (0, _uploadFileAuth.uploadFileToDrive)(accessToken, driveId, contentFile, fileName, parentFolderId, subFolderName);
        case 23:
          res.json({
            success: true,
            data: "Archivo subido correctamente"
          });
          _context.next = 29;
          break;
        case 26:
          _context.prev = 26;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            success: false,
            error: _context.t0.message
          });
        case 29:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 26]]);
  }));
  return function uploadFilesFlujoDigital(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.uploadFilesFlujoDigital = uploadFilesFlujoDigital;