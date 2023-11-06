"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPatientDates = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _util = _interopRequireDefault(require("util"));
var _getConfigServerPatientDatesAuth = require("../../utils/Rayos/getConfigServerPatientDates.auth.js");
var _database = require("../../database");
var _validateRutAuth = require("../../utils/validateRut.auth.js");
var getPatientDates = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$query, rut, clinicId, fechaTomaInicio, fechaTomaTermino, errors, clinicConfigRx, connectionPromises, results, allDatePatientRx;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$query = req.query, rut = _req$query.rut, clinicId = _req$query.clinicId, fechaTomaInicio = _req$query.fechaTomaInicio, fechaTomaTermino = _req$query.fechaTomaTermino;
          errors = [];
          if ((0, _validateRutAuth.isValidRut)(rut)) {
            _context2.next = 5;
            break;
          }
          throw new Error("Por favor, ingrese un RUT válido.");
        case 5:
          clinicConfigRx = _getConfigServerPatientDatesAuth.getServerConnectionDatesRx.find(function (config) {
            return config.id === parseInt(clinicId);
          });
          if (clinicConfigRx) {
            _context2.next = 8;
            break;
          }
          throw new Error("No se encontró la configuración de la clínica proporcionada.");
        case 8:
          connectionPromises = clinicConfigRx.connection.map( /*#__PURE__*/function () {
            var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(connConfigRx) {
              var conn, queryString, queryPromise, _results;
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return (0, _database.createServerConnection)(connConfigRx.ip, connConfigRx.serverName, connConfigRx.user, connConfigRx.password);
                  case 3:
                    conn = _context.sent;
                    queryString = connConfigRx.queryUse;
                    queryPromise = _util["default"].promisify(conn.query).bind(conn);
                    _context.next = 8;
                    return queryPromise(queryString, [rut, fechaTomaInicio, fechaTomaTermino]);
                  case 8:
                    _results = _context.sent;
                    return _context.abrupt("return", _results.map(function (item) {
                      return {
                        Servidor: connConfigRx.serverRx || 'Error Servidor',
                        Clinica: connConfigRx.clinicName || 'Error Nombre Clinica',
                        FechaToma: item.FechaToma || 'Error Fecha Toma',
                        NumeroDeRegistros: item.NumeroDeRegistros || "0"
                      };
                    }));
                  case 12:
                    _context.prev = 12;
                    _context.t0 = _context["catch"](0);
                    errors.push("Error al obtener los registros de las Im\xE1genes ".concat(connConfigRx.serverRx, " : ").concat(_context.t0.message));
                    return _context.abrupt("return", []);
                  case 16:
                  case "end":
                    return _context.stop();
                }
              }, _callee, null, [[0, 12]]);
            }));
            return function (_x3) {
              return _ref2.apply(this, arguments);
            };
          }());
          _context2.next = 11;
          return Promise.all(connectionPromises);
        case 11:
          results = _context2.sent;
          allDatePatientRx = results.flat();
          if (!(allDatePatientRx.length === 0)) {
            _context2.next = 15;
            break;
          }
          throw new Error("El paciente no posee imágenes.");
        case 15:
          res.json({
            success: true,
            datePatientRx: allDatePatientRx,
            errors: errors
          });
          _context2.next = 21;
          break;
        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            success: false,
            error: _context2.t0.message
          });
        case 21:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 18]]);
  }));
  return function getPatientDates(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getPatientDates = getPatientDates;