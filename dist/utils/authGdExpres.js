"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDataFiles = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _axios = _interopRequireDefault(require("axios"));
var getDataFiles = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(typeDoc, issueDateStart, issueDateEnd) {
    var cantidadArchivos, queryTypeDocument, queryGdExpress64, endpoint, response, errorMessage;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          cantidadArchivos = 500;
          if (!(!typeDoc || !issueDateStart || !issueDateEnd)) {
            _context.next = 3;
            break;
          }
          throw new Error("Parametros requeridos no proporcionados");
        case 3:
          _context.prev = 3;
          _context.t0 = typeDoc;
          _context.next = _context.t0 === '1' ? 7 : _context.t0 === '2' ? 9 : _context.t0 === '3' ? 11 : 13;
          break;
        case 7:
          queryTypeDocument = ' TipoDTE:33 ';
          return _context.abrupt("break", 14);
        case 9:
          queryTypeDocument = ' TipoDTE:34 ';
          return _context.abrupt("break", 14);
        case 11:
          queryTypeDocument = '(TipoDTE:33 OR TipoDTE:34) ';
          return _context.abrupt("break", 14);
        case 13:
          throw new Error("Tipo de documento no válido.");
        case 14:
          if (issueDateStart && issueDateEnd) {
            queryTypeDocument += " AND FchEmis:[".concat(issueDateStart, " TO ").concat(issueDateEnd, "]");
          }
          queryGdExpress64 = Buffer.from(queryTypeDocument).toString('base64');
          endpoint = "http://192.168.0.199/api/Core.svc/core/PaginatedSearch/P/R/".concat(queryGdExpress64, "/1/").concat(cantidadArchivos);
          _context.next = 19;
          return _axios["default"].get(endpoint, {
            headers: {
              'AuthKey': '2b440c34-979a-4c5c-b58e-5540dcb55922',
              'Content-Type': 'application/xml',
              'Accept': 'application/xml'
            }
          });
        case 19:
          response = _context.sent;
          return _context.abrupt("return", response.data);
        case 23:
          _context.prev = 23;
          _context.t1 = _context["catch"](3);
          errorMessage = _context.t1.response ? _context.t1.response.data : _context.t1.message;
          throw new Error("Error al establecer la conexi\xF3n con GD Express.- ".concat(errorMessage));
        case 27:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 23]]);
  }));
  return function getDataFiles(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
exports.getDataFiles = getDataFiles;