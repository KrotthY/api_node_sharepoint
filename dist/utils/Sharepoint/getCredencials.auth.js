"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSiteId = exports.getAccessToken = void 0;
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
var getSiteId = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(accessToken, siteUrl) {
    var siteEndpoint, response;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          siteEndpoint = "https://graph.microsoft.com/v1.0/sites/root?search=".concat(siteUrl);
          _context2.prev = 1;
          _context2.next = 4;
          return _axios["default"].get(siteEndpoint, {
            headers: {
              Authorization: "Bearer ".concat(accessToken)
            }
          });
        case 4:
          response = _context2.sent;
          return _context2.abrupt("return", response.data.id);
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](1);
          throw new Error("Error al obtener el id del sitio: ", _context2.t0.response ? _context2.t0.response.data : _context2.t0.message);
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 8]]);
  }));
  return function getSiteId(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getSiteId = getSiteId;