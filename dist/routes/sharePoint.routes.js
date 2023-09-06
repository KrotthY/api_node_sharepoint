"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _sharePointController = require("../controllers/sharePoint.controller.js");
var _imagesLocalController = require("../controllers/imagesLocal.controller.js");
var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));
var router = _express["default"].Router();
var limiter = (0, _expressRateLimit["default"])({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Has excedido el límite de solicitudes. Inténtalo de nuevo más tarde.'
});
router.post('/uploadFile', limiter, _sharePointController.uploadFileSharePoint);
router["delete"]('/deleteFile', limiter, _sharePointController.deleteFileSharePoint);
router.get('/getFiles', limiter, _sharePointController.getFilesSharePoint);
router.get('/getImageServer', limiter, _imagesLocalController.getImagesLocal);
var _default = router;
exports["default"] = _default;