"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPatientDates = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
var _authPatientDates = require("../utils/authPatientDates");
var _util = _interopRequireDefault(require("util"));
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var getPatientDates = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var errors, allDatePatientRx, _req$query, rut, clinicId, fechaTomaInicio, fechaTomaTermino, clinicConfigRx, _iterator, _step, _loop;
    return _regenerator["default"].wrap(function _callee2$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          errors = [];
          allDatePatientRx = [];
          _context3.prev = 2;
          _req$query = req.query, rut = _req$query.rut, clinicId = _req$query.clinicId, fechaTomaInicio = _req$query.fechaTomaInicio, fechaTomaTermino = _req$query.fechaTomaTermino;
          if ((0, _authPatientDates.isValidRut)(rut)) {
            _context3.next = 6;
            break;
          }
          throw new Error("Por favor, ingrese un RUT válido.");
        case 6:
          clinicConfigRx = _authPatientDates.getServerConnectionDatesRx.find(function (config) {
            return config.id === parseInt(clinicId);
          });
          if (clinicConfigRx) {
            _context3.next = 9;
            break;
          }
          throw new Error("No se encontró la configuración de la clínica proporcionada.");
        case 9:
          _iterator = _createForOfIteratorHelper(clinicConfigRx.connection);
          _context3.prev = 10;
          _loop = /*#__PURE__*/_regenerator["default"].mark(function _loop() {
            var connConfigRx, conn, queryString, queryPromise, results, datePatientRx;
            return _regenerator["default"].wrap(function _loop$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  connConfigRx = _step.value;
                  _context2.next = 3;
                  return (0, _database.createServerConnection)(connConfigRx.ip, connConfigRx.serverName, connConfigRx.user, connConfigRx.password);
                case 3:
                  conn = _context2.sent;
                  queryString = connConfigRx.queryUse;
                  queryPromise = _util["default"].promisify(conn.query).bind(conn);
                  _context2.next = 8;
                  return queryPromise(queryString, [rut, fechaTomaInicio, fechaTomaTermino]);
                case 8:
                  results = _context2.sent;
                  _context2.next = 11;
                  return Promise.all(results.map( /*#__PURE__*/function () {
                    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(item) {
                      return _regenerator["default"].wrap(function _callee$(_context) {
                        while (1) switch (_context.prev = _context.next) {
                          case 0:
                            _context.prev = 0;
                            return _context.abrupt("return", {
                              Servidor: connConfigRx.serverRx || 'Error Servidor',
                              Clinica: connConfigRx.clinicName || 'Error Nombre Clinica',
                              FechaToma: item.FechaToma || 'Error Fecha Toma',
                              NumeroDeRegistros: item.NumeroDeRegistros || "0"
                            });
                          case 4:
                            _context.prev = 4;
                            _context.t0 = _context["catch"](0);
                            errors.push("Error al obtener los registros de las Im\xE1genes ".concat(item.FechaToma, " : ").concat(_context.t0.message));
                            return _context.abrupt("return", null);
                          case 8:
                          case "end":
                            return _context.stop();
                        }
                      }, _callee, null, [[0, 4]]);
                    }));
                    return function (_x3) {
                      return _ref2.apply(this, arguments);
                    };
                  }()));
                case 11:
                  datePatientRx = _context2.sent;
                  allDatePatientRx.push.apply(allDatePatientRx, (0, _toConsumableArray2["default"])(datePatientRx.filter(Boolean)));
                case 13:
                case "end":
                  return _context2.stop();
              }
            }, _loop);
          });
          _iterator.s();
        case 13:
          if ((_step = _iterator.n()).done) {
            _context3.next = 17;
            break;
          }
          return _context3.delegateYield(_loop(), "t0", 15);
        case 15:
          _context3.next = 13;
          break;
        case 17:
          _context3.next = 22;
          break;
        case 19:
          _context3.prev = 19;
          _context3.t1 = _context3["catch"](10);
          _iterator.e(_context3.t1);
        case 22:
          _context3.prev = 22;
          _iterator.f();
          return _context3.finish(22);
        case 25:
          if (!(allDatePatientRx.length === 0)) {
            _context3.next = 27;
            break;
          }
          throw new Error("El paciente no posee imágenes.");
        case 27:
          res.json({
            success: true,
            datePatientRx: allDatePatientRx,
            errors: errors
          });
          _context3.next = 33;
          break;
        case 30:
          _context3.prev = 30;
          _context3.t2 = _context3["catch"](2);
          res.status(500).json({
            success: false,
            error: _context3.t2.message
          });
        case 33:
        case "end":
          return _context3.stop();
      }
    }, _callee2, null, [[2, 30], [10, 19, 22, 25]]);
  }));
  return function getPatientDates(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getPatientDates = getPatientDates;