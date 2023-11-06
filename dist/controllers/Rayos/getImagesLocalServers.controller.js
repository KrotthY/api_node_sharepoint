"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getImagesLocalServers = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _util = _interopRequireDefault(require("util"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _sharp = _interopRequireDefault(require("sharp"));
var _validateRutAuth = require("../../utils/validateRut.auth.js");
var _database = require("../../database");
var _getConfigServerDataAuth = require("../../utils/Rayos/getConfigServerData.auth.js");
var readFileAsync = _util["default"].promisify(_fs["default"].readFile);
var getImagesLocalServers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$query, rut, clinicId, fechaToma, errors, clinicConfig, connectionPromises, results, allImages;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$query = req.query, rut = _req$query.rut, clinicId = _req$query.clinicId, fechaToma = _req$query.fechaToma;
          errors = [];
          if ((0, _validateRutAuth.isValidRut)(rut)) {
            _context3.next = 5;
            break;
          }
          throw new Error("Por favor, ingrese un RUT válido.");
        case 5:
          clinicConfig = _getConfigServerDataAuth.getServerConnection.find(function (config) {
            return config.id === parseInt(clinicId);
          });
          if (clinicConfig) {
            _context3.next = 8;
            break;
          }
          throw new Error("No se encontró la configuración de la clínica proporcionada.");
        case 8:
          connectionPromises = clinicConfig.connection.map( /*#__PURE__*/function () {
            var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(connConfig) {
              var conn, queryString, queryPromise, _results, imagePromises;
              return _regenerator["default"].wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.prev = 0;
                    _context2.next = 3;
                    return (0, _database.createServerConnection)(connConfig.ip, connConfig.serverName, connConfig.user, connConfig.password);
                  case 3:
                    conn = _context2.sent;
                    queryString = connConfig.queryUse;
                    queryPromise = _util["default"].promisify(conn.query).bind(conn);
                    _context2.next = 8;
                    return queryPromise(queryString, [rut, fechaToma]);
                  case 8:
                    _results = _context2.sent;
                    imagePromises = _results.map( /*#__PURE__*/function () {
                      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(item) {
                        var imagePath, imageFile, webpBuffer, base64Image;
                        return _regenerator["default"].wrap(function _callee$(_context) {
                          while (1) switch (_context.prev = _context.next) {
                            case 0:
                              imagePath = _path["default"].join(connConfig.basePath, item.RutaImg, '\\', item.NombreImagen);
                              _context.prev = 1;
                              _context.next = 4;
                              return readFileAsync(imagePath);
                            case 4:
                              imageFile = _context.sent;
                              _context.next = 7;
                              return (0, _sharp["default"])(imageFile).webp().toBuffer();
                            case 7:
                              webpBuffer = _context.sent;
                              base64Image = Buffer.from(webpBuffer).toString('base64');
                              return _context.abrupt("return", {
                                Servidor: connConfig.serverRx || 'Error Servidor',
                                Clinica: connConfig.clinicName || 'Error Nombre Clinica',
                                RUT: item.RUT || 'Error RUT',
                                NombrePaciente: item.NombrePaciente || 'Error Nombre Paciente',
                                image: base64Image,
                                NombreImagen: item.NombreImagen || 'Error Nombre Imagen',
                                IdImagen: item.ID || 'Error ID Imagen',
                                FechaToma: item.FechaToma || 'Error Fecha Toma'
                              });
                            case 12:
                              _context.prev = 12;
                              _context.t0 = _context["catch"](1);
                              errors.push("Error al leer o cifrar la imagen ".concat(item.NombreImagen, " : ").concat(_context.t0.message));
                              return _context.abrupt("return", null);
                            case 16:
                            case "end":
                              return _context.stop();
                          }
                        }, _callee, null, [[1, 12]]);
                      }));
                      return function (_x4) {
                        return _ref3.apply(this, arguments);
                      };
                    }());
                    _context2.next = 12;
                    return Promise.all(imagePromises);
                  case 12:
                    return _context2.abrupt("return", _context2.sent);
                  case 15:
                    _context2.prev = 15;
                    _context2.t0 = _context2["catch"](0);
                    errors.push("Error en la conexi\xF3n con el servidor ".concat(connConfig.serverRx, " : ").concat(_context2.t0.message));
                    return _context2.abrupt("return", []);
                  case 19:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2, null, [[0, 15]]);
            }));
            return function (_x3) {
              return _ref2.apply(this, arguments);
            };
          }());
          _context3.next = 11;
          return Promise.all(connectionPromises);
        case 11:
          results = _context3.sent;
          allImages = results.flat();
          if (!(allImages.length === 0)) {
            _context3.next = 15;
            break;
          }
          throw new Error("El paciente no posee imágenes.");
        case 15:
          res.json({
            success: true,
            images: allImages,
            errors: errors
          });
          _context3.next = 21;
          break;
        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            success: false,
            error: _context3.t0.message
          });
        case 21:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 18]]);
  }));
  return function getImagesLocalServers(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getImagesLocalServers = getImagesLocalServers;