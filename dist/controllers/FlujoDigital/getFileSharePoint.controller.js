"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFilesFlujoDigital = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _getFileAuth = require("../../utils/FlujoDigital/getFile.auth.js");
var _getCredencialsAuth = require("../../utils/Sharepoint/getCredencials.auth.js");
var _getIdItemsAuth = require("../../utils/Sharepoint/getIdItems.auth.js");
var driveId = "b!CzGfDnIio0SyF0mY2qNRneYCk1s-jilIkDxmR_5bBcEqP4tFQ-b0Q55PPh2jhtHN";
var getFilesFlujoDigital = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$query, parentFolderName, subFolderName, accessToken, parentFolderId, subFolderID, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$query = req.query, parentFolderName = _req$query.parentFolderName, subFolderName = _req$query.subFolderName;
          _context.next = 4;
          return (0, _getCredencialsAuth.getAccessToken)(process.env.API_TENANT_ID, process.env.API_CLIENT_ID, process.env.API_CLIENT_SECRET);
        case 4:
          accessToken = _context.sent;
          _context.next = 7;
          return (0, _getIdItemsAuth.getFolderId)(accessToken, driveId, parentFolderName);
        case 7:
          parentFolderId = _context.sent;
          _context.next = 10;
          return (0, _getIdItemsAuth.getSubFolderId)(accessToken, driveId, parentFolderId, subFolderName);
        case 10:
          subFolderID = _context.sent;
          _context.next = 13;
          return (0, _getFileAuth.getFilesToDrive)(accessToken, driveId, subFolderID);
        case 13:
          result = _context.sent;
          res.json({
            success: true,
            data: result
          });
          _context.next = 20;
          break;
        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            success: false,
            error: _context.t0.message
          });
        case 20:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 17]]);
  }));
  return function getFilesFlujoDigital(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getFilesFlujoDigital = getFilesFlujoDigital;