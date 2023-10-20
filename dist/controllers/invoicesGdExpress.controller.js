"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFilesInvoices = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _authGdExpres = require("../utils/authGdExpres.js");
var _xml2js = _interopRequireDefault(require("xml2js"));
var getFilesInvoices = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$query, typeDoc, issueDateStart, issueDateEnd, invoice;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$query = req.query, typeDoc = _req$query.typeDoc, issueDateStart = _req$query.issueDateStart, issueDateEnd = _req$query.issueDateEnd;
          _context.next = 4;
          return (0, _authGdExpres.getDataFiles)(typeDoc, issueDateStart, issueDateEnd);
        case 4:
          invoice = _context.sent;
          _xml2js["default"].parseString(invoice, {
            explicitArray: false
          }, function (err, result) {
            if (err) {
              return res.status(500).json({
                success: false,
                error: 'Error al procesar la respuesta XML.'
              });
            }
            res.json({
              Success: true,
              data: result.SearchResult.Data || {}
            });
          });
          _context.next = 11;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            Error: true,
            error: _context.t0.message
          });
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function getFilesInvoices(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getFilesInvoices = getFilesInvoices;