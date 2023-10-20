"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getImagesLocal = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
var _authLocalServers = require("../utils/authLocalServers");
var _util = _interopRequireDefault(require("util"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var readFileAsync = _util["default"].promisify(_fs["default"].readFile);
var getImagesLocal = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var errors, allImages, _req$query, rut, clinicId, fechaToma, clinicConfig, _iterator, _step, _loop;
    return _regenerator["default"].wrap(function _callee2$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          errors = [];
          allImages = [];
          _context3.prev = 2;
          _req$query = req.query, rut = _req$query.rut, clinicId = _req$query.clinicId, fechaToma = _req$query.fechaToma;
          if ((0, _authLocalServers.isValidRut)(rut)) {
            _context3.next = 6;
            break;
          }
          throw new Error("Por favor, ingrese un RUT válido.");
        case 6:
          clinicConfig = _authLocalServers.getServerConnection.find(function (config) {
            return config.id === parseInt(clinicId);
          });
          if (clinicConfig) {
            _context3.next = 9;
            break;
          }
          throw new Error("No se encontró la configuración de la clínica proporcionada.");
        case 9:
          _iterator = _createForOfIteratorHelper(clinicConfig.connection);
          _context3.prev = 10;
          _loop = /*#__PURE__*/_regenerator["default"].mark(function _loop() {
            var connConfig, conn, queryString, queryPromise, results, images;
            return _regenerator["default"].wrap(function _loop$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  connConfig = _step.value;
                  _context2.next = 3;
                  return (0, _database.createServerConnection)(connConfig.ip, connConfig.serverName, connConfig.user, connConfig.password);
                case 3:
                  conn = _context2.sent;
                  queryString = connConfig.queryUse;
                  queryPromise = _util["default"].promisify(conn.query).bind(conn);
                  _context2.next = 8;
                  return queryPromise(queryString, [rut, fechaToma]);
                case 8:
                  results = _context2.sent;
                  _context2.next = 11;
                  return Promise.all(results.map( /*#__PURE__*/function () {
                    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(item) {
                      var imagePath, imageFile, base64Image;
                      return _regenerator["default"].wrap(function _callee$(_context) {
                        while (1) switch (_context.prev = _context.next) {
                          case 0:
                            imagePath = _path["default"].join(connConfig.basePath, item.RutaImg, '\\', item.NombreImagen);
                            _context.prev = 1;
                            _context.next = 4;
                            return readFileAsync(imagePath);
                          case 4:
                            imageFile = _context.sent;
                            base64Image = Buffer.from(imageFile).toString('base64');
                            return _context.abrupt("return", {
                              Servidor: connConfig.serverRx || 'Error Servidor',
                              Clinica: connConfig.clinicName || 'Error Nombre Clinica',
                              RUT: item.RUT || 'Error RUT',
                              NombrePaciente: item.NombrePaciente || 'Error Nombre Paciente',
                              image: base64Image || 'Error Imagen',
                              NombreImagen: item.NombreImagen || 'Error Nombre Imagen',
                              IdImagen: item.ID || 'Error ID Imagen',
                              FechaToma: item.FechaToma || 'Error Fecha Toma'
                            });
                          case 9:
                            _context.prev = 9;
                            _context.t0 = _context["catch"](1);
                            errors.push("Error al leer o cifrar la imagen ".concat(item.NombreImagen, " : ").concat(_context.t0.message));
                            return _context.abrupt("return", null);
                          case 13:
                          case "end":
                            return _context.stop();
                        }
                      }, _callee, null, [[1, 9]]);
                    }));
                    return function (_x3) {
                      return _ref2.apply(this, arguments);
                    };
                  }()));
                case 11:
                  images = _context2.sent;
                  allImages.push.apply(allImages, (0, _toConsumableArray2["default"])(images.filter(Boolean)));
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
          if (!(allImages.length === 0)) {
            _context3.next = 27;
            break;
          }
          throw new Error("El paciente no posee imágenes.");
        case 27:
          res.json({
            success: true,
            images: allImages,
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
  return function getImagesLocal(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getImagesLocal = getImagesLocal;