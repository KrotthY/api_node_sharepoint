"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadFileDriveSP = exports.getFilesFlujoDigital = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _auth = require("../utils/auth.js");
var _authFlujoDigital = require("../utils/authFlujoDigital.js");
var driveId = 'b!CzGfDnIio0SyF0mY2qNRneYCk1s-jilIkDxmR_5bBcEqP4tFQ-b0Q55PPh2jhtHN';
var uploadFileDriveSP = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, folderUser, subFolderName, fileName, contentFile, accessToken, parentFolderId, folderUserExists, parentFolder;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, folderUser = _req$body.folderUser, subFolderName = _req$body.subFolderName, fileName = _req$body.fileName, contentFile = _req$body.contentFile;
          _context.next = 4;
          return (0, _auth.getAccessToken)(process.env.API_TENANT_ID, process.env.API_CLIENT_ID, process.env.API_CLIENT_SECRET);
        case 4:
          accessToken = _context.sent;
          _context.next = 7;
          return (0, _authFlujoDigital.folderExistsUser)(accessToken, driveId, folderUser);
        case 7:
          folderUserExists = _context.sent;
          if (folderUserExists) {
            _context.next = 15;
            break;
          }
          _context.next = 11;
          return (0, _authFlujoDigital.createFolderUser)(accessToken, driveId, folderUser);
        case 11:
          parentFolder = _context.sent;
          parentFolderId = parentFolder.id;
          _context.next = 16;
          break;
        case 15:
          parentFolderId = folderUserExists;
        case 16:
          _context.next = 18;
          return (0, _authFlujoDigital.subFolderExistsUser)(accessToken, driveId, parentFolderId, subFolderName);
        case 18:
          if (_context.sent) {
            _context.next = 21;
            break;
          }
          _context.next = 21;
          return (0, _authFlujoDigital.createsubFolderUser)(accessToken, driveId, parentFolderId, subFolderName);
        case 21:
          _context.next = 23;
          return (0, _authFlujoDigital.uploadFileToDrive)(accessToken, driveId, contentFile, fileName, parentFolderId, subFolderName);
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
  return function uploadFileDriveSP(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.uploadFileDriveSP = uploadFileDriveSP;
var getFilesFlujoDigital = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$query, parentFolderName, subFolderName, accessToken, parentFolderId, subFolderID, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$query = req.query, parentFolderName = _req$query.parentFolderName, subFolderName = _req$query.subFolderName;
          _context2.next = 4;
          return (0, _auth.getAccessToken)(process.env.API_TENANT_ID, process.env.API_CLIENT_ID, process.env.API_CLIENT_SECRET);
        case 4:
          accessToken = _context2.sent;
          _context2.next = 7;
          return (0, _authFlujoDigital.getFolderId)(accessToken, driveId, parentFolderName);
        case 7:
          parentFolderId = _context2.sent;
          _context2.next = 10;
          return (0, _authFlujoDigital.getSubFolderId)(accessToken, driveId, parentFolderId, subFolderName);
        case 10:
          subFolderID = _context2.sent;
          _context2.next = 13;
          return (0, _authFlujoDigital.getAllContentSubFolder)(accessToken, driveId, subFolderID);
        case 13:
          result = _context2.sent;
          console.log("parentFolderId " + parentFolderId + " parentFolderId  " + (0, _typeof2["default"])(parentFolderId));
          console.log("result" + result);
          res.json({
            success: true,
            data: result
          });
          _context2.next = 22;
          break;
        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            success: false,
            error: _context2.t0.message
          });
        case 22:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 19]]);
  }));
  return function getFilesFlujoDigital(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getFilesFlujoDigital = getFilesFlujoDigital;