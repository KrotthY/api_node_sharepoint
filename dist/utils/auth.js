"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadFileToSharePoint = exports.getSiteId = exports.getFilesPatient = exports.getAccessToken = exports.folderExists = exports.deleteFile = exports.createFolder = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _axios = _interopRequireDefault(require("axios"));
var getAccessToken = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(tenantId, clientId, clientSecret) {
    var tokenUrl, tokenParams, response;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(!tenantId || !clientId || !clientSecret)) {
            _context.next = 2;
            break;
          }
          throw new Error("Parametros requeridos no proporcionados => ClientId: ".concat(clientId, " o clientSecret: ").concat(clientSecret, " o tenantId: ").concat(tenantId, " o"));
        case 2:
          tokenUrl = "https://login.microsoftonline.com/".concat(tenantId, "/oauth2/v2.0/token");
          tokenParams = {
            client_id: clientId,
            scope: 'https://graph.microsoft.com/.default',
            client_secret: clientSecret,
            grant_type: 'client_credentials'
          };
          _context.prev = 4;
          _context.next = 7;
          return _axios["default"].post(tokenUrl, new URLSearchParams(tokenParams), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          });
        case 7:
          response = _context.sent;
          return _context.abrupt("return", response.data.access_token);
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](4);
          throw new Error("Error al obtener el tocken de acceso: ", _context.t0.response ? _context.t0.response.data : _context.t0.message);
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[4, 11]]);
  }));
  return function getAccessToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
exports.getAccessToken = getAccessToken;
var uploadFileToSharePoint = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(base64, fileName, accessToken, siteId, folderName) {
    var endpoint, response;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!(!folderName || !fileName)) {
            _context2.next = 2;
            break;
          }
          throw new Error("Parametros requeridos no proporcionados");
        case 2:
          endpoint = "https://graph.microsoft.com/v1.0/sites/".concat(siteId, "/drive/items/root:/").concat(folderName, "/").concat(fileName, ":/content");
          _context2.prev = 3;
          _context2.next = 6;
          return _axios["default"].put(endpoint, Buffer.from(base64, 'base64'), {
            headers: {
              'Authorization': "Bearer ".concat(accessToken),
              'Content-Type': 'application/octet-stream'
            }
          });
        case 6:
          response = _context2.sent;
          return _context2.abrupt("return", response.data);
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](3);
          throw new Error("Error al subir el archivo:", _context2.t0.response ? _context2.t0.response.data : _context2.t0.message);
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[3, 10]]);
  }));
  return function uploadFileToSharePoint(_x4, _x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();
exports.uploadFileToSharePoint = uploadFileToSharePoint;
var getSiteId = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(accessToken, siteUrl) {
    var siteEndpoint, response;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          siteEndpoint = "https://graph.microsoft.com/v1.0/sites/root?search=".concat(siteUrl);
          _context3.prev = 1;
          _context3.next = 4;
          return _axios["default"].get(siteEndpoint, {
            headers: {
              Authorization: "Bearer ".concat(accessToken)
            }
          });
        case 4:
          response = _context3.sent;
          return _context3.abrupt("return", response.data.id);
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          throw new Error("Error al obtener el id del sitio: ", _context3.t0.response ? _context3.t0.response.data : _context3.t0.message);
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 8]]);
  }));
  return function getSiteId(_x9, _x10) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getSiteId = getSiteId;
var deleteFile = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(accessToken, siteId, folderName, fileName) {
    var endpoint;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (!(!folderName || !fileName)) {
            _context4.next = 2;
            break;
          }
          throw new Error("Parametros requeridos no proporcionados");
        case 2:
          endpoint = "https://graph.microsoft.com/v1.0/sites/".concat(siteId, "/drive/items/root:/").concat(folderName, "/").concat(fileName);
          _context4.prev = 3;
          _context4.next = 6;
          return _axios["default"]["delete"](endpoint, {
            headers: {
              'Authorization': "Bearer ".concat(accessToken)
            }
          });
        case 6:
          _context4.next = 11;
          break;
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](3);
          throw new Error("Error al eliminar el archivo: ", _context4.t0.response ? _context4.t0.response.data : _context4.t0.message);
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[3, 8]]);
  }));
  return function deleteFile(_x11, _x12, _x13, _x14) {
    return _ref4.apply(this, arguments);
  };
}();
exports.deleteFile = deleteFile;
var folderExists = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(accessToken, siteId, folderName) {
    var endpoint, response;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          if (folderName) {
            _context5.next = 2;
            break;
          }
          throw new Error("Parametros requeridos no proporcionados");
        case 2:
          endpoint = "https://graph.microsoft.com/v1.0/sites/".concat(siteId, "/drive/root/children?$filter=name eq '").concat(folderName, "'");
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
          throw new Error("Error la carpeta no existe: ", _context5.t0.response ? _context5.t0.response.data : _context5.t0.message);
        case 13:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[3, 10]]);
  }));
  return function folderExists(_x15, _x16, _x17) {
    return _ref5.apply(this, arguments);
  };
}();
exports.folderExists = folderExists;
var createFolder = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(accessToken, siteId, folderName) {
    var endpoint, response;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          if (folderName) {
            _context6.next = 2;
            break;
          }
          throw new Error("Parametros requeridos no proporcionados");
        case 2:
          endpoint = "https://graph.microsoft.com/v1.0/sites/".concat(siteId, "/drive/root/children");
          _context6.prev = 3;
          _context6.next = 6;
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
          response = _context6.sent;
          return _context6.abrupt("return", response.data);
        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](3);
          throw new Error("Error al intentar crear la carpeta: ", _context6.t0.response ? _context6.t0.response.data : _context6.t0.message);
        case 13:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[3, 10]]);
  }));
  return function createFolder(_x18, _x19, _x20) {
    return _ref6.apply(this, arguments);
  };
}();
exports.createFolder = createFolder;
var getFilesPatient = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(accessToken, siteId, folderName) {
    var endpoint, response, filesImg;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          if (folderName) {
            _context7.next = 2;
            break;
          }
          throw new Error("Parametros requeridos no proporcionados");
        case 2:
          endpoint = "https://graph.microsoft.com/v1.0/sites/".concat(siteId, "/drive/root:/").concat(folderName, ":/children");
          _context7.prev = 3;
          _context7.next = 6;
          return _axios["default"].get(endpoint, {
            headers: {
              'Authorization': "Bearer ".concat(accessToken)
            }
          });
        case 6:
          response = _context7.sent;
          filesImg = response.data.value;
          return _context7.abrupt("return", filesImg.map(function (file) {
            return {
              name: file.name,
              url: file['@microsoft.graph.downloadUrl']
            };
          }));
        case 11:
          _context7.prev = 11;
          _context7.t0 = _context7["catch"](3);
          throw new Error("Error no se pudo consultar: ", _context7.t0.response ? _context7.t0.response.data : _context7.t0.message);
        case 14:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[3, 11]]);
  }));
  return function getFilesPatient(_x21, _x22, _x23) {
    return _ref7.apply(this, arguments);
  };
}();
exports.getFilesPatient = getFilesPatient;