"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadFileSharePoint = exports.getFilesSharePoint = exports.deleteFileSharePoint = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _auth = require("../utils/auth.js");
var uploadFileSharePoint = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, base64, fileName, folderName, mimeType, allowedMimeTypes, accessToken, siteId;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, base64 = _req$body.base64, fileName = _req$body.fileName, folderName = _req$body.folderName, mimeType = _req$body.mimeType;
          allowedMimeTypes = ['image/jpeg', 'image/png'];
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
          return (0, _auth.getAccessToken)(process.env.API_TENANT_ID, process.env.API_CLIENT_ID, process.env.API_CLIENT_SECRET);
        case 7:
          accessToken = _context.sent;
          _context.next = 10;
          return (0, _auth.getSiteId)(accessToken, process.env.API_SITE_URL);
        case 10:
          siteId = _context.sent;
          _context.next = 13;
          return (0, _auth.folderExists)(accessToken, siteId, folderName);
        case 13:
          if (_context.sent) {
            _context.next = 16;
            break;
          }
          _context.next = 16;
          return (0, _auth.createFolder)(accessToken, siteId, folderName);
        case 16:
          _context.next = 18;
          return (0, _auth.uploadFileToSharePoint)(base64, fileName, accessToken, siteId, folderName);
        case 18:
          res.json({
            success: true,
            data: "Archivo subido correctamente"
          });
          _context.next = 24;
          break;
        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            success: false,
            error: _context.t0.message
          });
        case 24:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 21]]);
  }));
  return function uploadFileSharePoint(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.uploadFileSharePoint = uploadFileSharePoint;
var deleteFileSharePoint = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body2, fileName, folderName, accessToken, siteId;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, fileName = _req$body2.fileName, folderName = _req$body2.folderName;
          _context2.next = 4;
          return (0, _auth.getAccessToken)(process.env.API_TENANT_ID, process.env.API_CLIENT_ID, process.env.API_CLIENT_SECRET);
        case 4:
          accessToken = _context2.sent;
          _context2.next = 7;
          return (0, _auth.getSiteId)(accessToken, process.env.API_SITE_URL);
        case 7:
          siteId = _context2.sent;
          _context2.next = 10;
          return (0, _auth.deleteFile)(accessToken, siteId, folderName, fileName);
        case 10:
          res.json({
            success: true,
            data: "Archivo borrado correctamente"
          });
          _context2.next = 16;
          break;
        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            success: false,
            error: _context2.t0.message
          });
        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 13]]);
  }));
  return function deleteFileSharePoint(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.deleteFileSharePoint = deleteFileSharePoint;
var getFilesSharePoint = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var folderName, accessToken, siteId, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          folderName = req.query.folderName;
          _context3.next = 4;
          return (0, _auth.getAccessToken)(process.env.API_TENANT_ID, process.env.API_CLIENT_ID, process.env.API_CLIENT_SECRET);
        case 4:
          accessToken = _context3.sent;
          _context3.next = 7;
          return (0, _auth.getSiteId)(accessToken, process.env.API_SITE_URL);
        case 7:
          siteId = _context3.sent;
          _context3.next = 10;
          return (0, _auth.getFilesPatient)(accessToken, siteId, folderName);
        case 10:
          result = _context3.sent;
          res.json({
            success: true,
            data: result
          });
          _context3.next = 17;
          break;
        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            success: false,
            error: _context3.t0.message
          });
        case 17:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 14]]);
  }));
  return function getFilesSharePoint(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getFilesSharePoint = getFilesSharePoint;