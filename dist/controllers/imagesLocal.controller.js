"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getImagesLocal = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
var _util = _interopRequireDefault(require("util"));
var _fs = _interopRequireWildcard(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _crypto = _interopRequireDefault(require("crypto"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function encrypt(buffer) {
  var algorithm = 'aes-256-ctr';
  var password = _crypto["default"].randomBytes(32);
  var iv = _crypto["default"].randomBytes(16);
  var cipher = _crypto["default"].createCipheriv(algorithm, password, iv);
  var encrypted = Buffer.concat([cipher.update(buffer), cipher["final"]()]);
  return {
    encryptedData: encrypted,
    iv: iv,
    key: password
  };
}
var getImagesLocal = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var rut, conn, queryString, queryPromise, results, images;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          rut = req.query.rut;
          _context.next = 4;
          return (0, _database.getConnection)();
        case 4:
          conn = _context.sent;
          console.log("Conexión establecida"); // Para depuración
          queryString = _database.queries.getAllImages;
          queryPromise = _util["default"].promisify(conn.query).bind(conn);
          _context.next = 10;
          return queryPromise(queryString, [rut]);
        case 10:
          results = _context.sent;
          images = results.map(function (item) {
            var imagePath = _path["default"].join('\\\\192.168.0.6\\cvdata\\DB\\Files\\', item.RutaImg, '\\', item.NombreImagen);
            console.log("Intentando leer el archivo desde: ".concat(imagePath)); // Para depuración

            try {
              var imageFile = _fs["default"].readFileSync(imagePath);
              var encryptedImage = encrypt(imageFile);
              return {
                Servidor: item.Servidor,
                Clinica: item.Clinica,
                RUT: item.RUT,
                NombrePaciente: item.NombrePaciente,
                image: encryptedImage,
                NombreImagen: item.NombreImagen,
                IdImagen: item.ID
              };
            } catch (error) {
              console.log("Error al leer el archivo: ".concat(error.message)); // Para depuración
              return item;
            }
          });
          res.json(images);
          _context.next = 19;
          break;
        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          console.error("Error general: ".concat(_context.t0.message)); // Para depuración
          res.status(500).send("Ocurrió un error interno"); // Mensaje de error genérico
        case 19:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 15]]);
  }));
  return function getImagesLocal(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getImagesLocal = getImagesLocal;