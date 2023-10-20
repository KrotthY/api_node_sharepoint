"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadFileToDrive = exports.subFolderExistsUser = exports.getSubFolderId = exports.getFolderId = exports.getAllContentSubFolder = exports.folderExistsUser = exports.createsubFolderUser = exports.createFolderUser = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _axios = _interopRequireDefault(require("axios"));
var uploadFileToDrive = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(accessToken, driveId, contentFile, fileName, parentFolderId, subFolderName) {
    var endpoint, response;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (fileName) {
            _context.next = 2;
            break;
          }
          throw new Error("Parametros requeridos no proporcionados");
        case 2:
          endpoint = "https://graph.microsoft.com/v1.0/drives/".concat(driveId, "/items/").concat(parentFolderId, ":/").concat(subFolderName, "/").concat(fileName, ":/content");
          _context.prev = 3;
          _context.next = 6;
          return _axios["default"].put(endpoint, Buffer.from(contentFile, 'base64'), {
            headers: {
              'Authorization': "Bearer ".concat(accessToken),
              'Content-Type': 'application/octet-stream'
            }
          });
        case 6:
          response = _context.sent;
          return _context.abrupt("return", response.data);
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](3);
          throw new Error("Error al subir el archivo 1:", _context.t0.response ? _context.t0.response.data : _context.t0.message);
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 10]]);
  }));
  return function uploadFileToDrive(_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();
exports.uploadFileToDrive = uploadFileToDrive;
var createFolderUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(accessToken, driveId, folderName) {
    var endpoint, response;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (folderName) {
            _context2.next = 2;
            break;
          }
          throw new Error("Parametros requeridos no proporcionados");
        case 2:
          endpoint = "https://graph.microsoft.com/v1.0/drives/".concat(driveId, "/root/children");
          _context2.prev = 3;
          _context2.next = 6;
          return _axios["default"].post(endpoint, {
            name: folderName,
            folder: {},
            "@microsoft.graph.conflicBehavior": "rename"
          }, {
            headers: {
              'Authorization': "Bearer ".concat(accessToken),
              'Content-Type': 'application/json'
            }
          });
        case 6:
          response = _context2.sent;
          return _context2.abrupt("return", response.data);
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](3);
          throw new Error("Error al intentar crear la carpeta del usuario: ", _context2.t0.response ? _context2.t0.response.data : _context2.t0.message);
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[3, 10]]);
  }));
  return function createFolderUser(_x7, _x8, _x9) {
    return _ref2.apply(this, arguments);
  };
}();
exports.createFolderUser = createFolderUser;
var folderExistsUser = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(accessToken, driveId, folderName) {
    var endpoint, response, folders;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (folderName) {
            _context3.next = 2;
            break;
          }
          throw new Error("Parametros requeridos no proporcionados");
        case 2:
          endpoint = "https://graph.microsoft.com/v1.0/drives/".concat(driveId, "/root/children?$filter=name eq '").concat(folderName, "'");
          _context3.prev = 3;
          _context3.next = 6;
          return _axios["default"].get(endpoint, {
            headers: {
              'Authorization': "Bearer ".concat(accessToken)
            }
          });
        case 6:
          response = _context3.sent;
          folders = response.data.value;
          if (!(folders.length > 0)) {
            _context3.next = 12;
            break;
          }
          return _context3.abrupt("return", folders[0].id);
        case 12:
          return _context3.abrupt("return", null);
        case 13:
          _context3.next = 18;
          break;
        case 15:
          _context3.prev = 15;
          _context3.t0 = _context3["catch"](3);
          throw new Error("Error la carpeta existe: ", _context3.t0.response ? _context3.t0.response.data : _context3.t0.message);
        case 18:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[3, 15]]);
  }));
  return function folderExistsUser(_x10, _x11, _x12) {
    return _ref3.apply(this, arguments);
  };
}();
exports.folderExistsUser = folderExistsUser;
var createsubFolderUser = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(accessToken, driveId, parentFolderId, subFolderName) {
    var endpoint, subFolderData, response;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (subFolderName) {
            _context4.next = 2;
            break;
          }
          throw new Error("Parametros requeridos no proporcionados");
        case 2:
          endpoint = "https://graph.microsoft.com/v1.0/drives/".concat(driveId, "/items/").concat(parentFolderId, "/children");
          subFolderData = {
            name: subFolderName,
            folder: {},
            "@microsoft.graph.conflicBehavior": "rename"
          };
          _context4.prev = 4;
          _context4.next = 7;
          return _axios["default"].post(endpoint, subFolderData, {
            headers: {
              'Authorization': "Bearer ".concat(accessToken),
              'Content-Type': 'application/json'
            }
          });
        case 7:
          response = _context4.sent;
          return _context4.abrupt("return", response.data);
        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](4);
          throw new Error("Error al intentar crear la sub carpeta del usuario: ", _context4.t0.response ? _context4.t0.response.data : _context4.t0.message);
        case 14:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[4, 11]]);
  }));
  return function createsubFolderUser(_x13, _x14, _x15, _x16) {
    return _ref4.apply(this, arguments);
  };
}();
exports.createsubFolderUser = createsubFolderUser;
var subFolderExistsUser = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(accessToken, driveId, parentFolderId, subFolderName) {
    var endpoint, response;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          if (subFolderName) {
            _context5.next = 2;
            break;
          }
          throw new Error("Parametros requeridos no proporcionados");
        case 2:
          endpoint = "https://graph.microsoft.com/v1.0/drives/".concat(driveId, "/items/").concat(parentFolderId, "/children?$filter=name eq '").concat(subFolderName, "'");
          _context5.prev = 3;
          _context5.next = 6;
          return _axios["default"].get(endpoint, {
            headers: {
              'Authorization': "Bearer ".concat(accessToken)
            }
          });
        case 6:
          response = _context5.sent;
          return _context5.abrupt("return", response.data.value.length > 0);
        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](3);
          throw new Error("Error la carpeta existe: ", _context5.t0.response ? _context5.t0.response.data : _context5.t0.message);
        case 13:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[3, 10]]);
  }));
  return function subFolderExistsUser(_x17, _x18, _x19, _x20) {
    return _ref5.apply(this, arguments);
  };
}();
exports.subFolderExistsUser = subFolderExistsUser;
var getFolderId = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(accessToken, driveId, parentFolderName) {
    var endpoint, response;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          if (parentFolderName) {
            _context6.next = 2;
            break;
          }
          throw new Error("Parametros requeridos no proporcionados getFolderId");
        case 2:
          endpoint = "https://graph.microsoft.com/v1.0/drives/".concat(driveId, "/items/root:/").concat(parentFolderName, ":/");
          _context6.prev = 3;
          _context6.next = 6;
          return _axios["default"].get(endpoint, {
            headers: {
              'Authorization': "Bearer ".concat(accessToken)
            }
          });
        case 6:
          response = _context6.sent;
          return _context6.abrupt("return", response.data.id);
        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](3);
          throw new Error("Error al obtener el id subcarpeta: ", _context6.t0.response ? _context6.t0.response.data : _context6.t0.message);
        case 13:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[3, 10]]);
  }));
  return function getFolderId(_x21, _x22, _x23) {
    return _ref6.apply(this, arguments);
  };
}();
exports.getFolderId = getFolderId;
var getSubFolderId = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(accessToken, driveId, parentFolderId, subFolderName) {
    var endpoint, response;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          if (subFolderName) {
            _context7.next = 2;
            break;
          }
          throw new Error("Parametros requeridos no proporcionados getSubFolderId");
        case 2:
          endpoint = "https://graph.microsoft.com/v1.0/drives/".concat(driveId, "/items/").concat(parentFolderId, ":/").concat(subFolderName, "/");
          _context7.prev = 3;
          _context7.next = 6;
          return _axios["default"].get(endpoint, {
            headers: {
              'Authorization': "Bearer ".concat(accessToken)
            }
          });
        case 6:
          response = _context7.sent;
          return _context7.abrupt("return", response.data.id);
        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](3);
          throw new Error("Error al obtener el id subcarpeta: ", _context7.t0.response ? _context7.t0.response.data : _context7.t0.message);
        case 13:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[3, 10]]);
  }));
  return function getSubFolderId(_x24, _x25, _x26, _x27) {
    return _ref7.apply(this, arguments);
  };
}();
exports.getSubFolderId = getSubFolderId;
var getAllContentSubFolder = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(accessToken, driveId, subFolderID) {
    var endpoint, response, AllData;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          if (!(!subFolderID || !driveId)) {
            _context8.next = 2;
            break;
          }
          throw new Error("Parametros requeridos no proporcionados getAllContentSubFolder");
        case 2:
          endpoint = "https://graph.microsoft.com/v1.0/drives/".concat(driveId, "/items/").concat(subFolderID, "/children");
          _context8.prev = 3;
          _context8.next = 6;
          return _axios["default"].get(endpoint, {
            headers: {
              'Authorization': "Bearer ".concat(accessToken)
            }
          });
        case 6:
          response = _context8.sent;
          AllData = response.data.value;
          return _context8.abrupt("return", AllData.map(function (file) {
            return {
              name: file.name,
              mimeType: file.file.mimeType,
              url: file['@microsoft.graph.downloadUrl']
            };
          }));
        case 11:
          _context8.prev = 11;
          _context8.t0 = _context8["catch"](3);
          throw new Error("Error al obtener el id subcarpeta: ", _context8.t0.response ? _context8.t0.response.data : _context8.t0.message);
        case 14:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[3, 11]]);
  }));
  return function getAllContentSubFolder(_x28, _x29, _x30) {
    return _ref8.apply(this, arguments);
  };
}();
exports.getAllContentSubFolder = getAllContentSubFolder;