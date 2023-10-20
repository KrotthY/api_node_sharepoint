"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _sharePointController = require("../controllers/sharePoint.controller.js");
var _imagesLocalController = require("../controllers/imagesLocal.controller.js");
var _invoicesGdExpressController = require("../controllers/invoicesGdExpress.controller.js");
var _getPatientDatesRxController = require("../controllers/getPatientDatesRx.controller.js");
var _flujoDigitalSharepointController = require("../controllers/flujoDigitalSharepoint.controller.js");
var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));
var router = _express["default"].Router();
var limiter = (0, _expressRateLimit["default"])({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Has excedido el límite de solicitudes. Inténtalo de nuevo más tarde.'
});

//Rayos
router.post('/uploadFile', _sharePointController.uploadFileSharePoint);
router["delete"]('/deleteFile', _sharePointController.deleteFileSharePoint);
router.get('/getFiles', _sharePointController.getFilesSharePoint);
router.get('/getImageServer', _imagesLocalController.getImagesLocal);
router.get('/v1/getPatientDates', _getPatientDatesRxController.getPatientDates);

//GD Express 
router.get('/v1/filesGdExpress', _invoicesGdExpressController.getFilesInvoices);

//Flujo Digital
router.post('/v1/uploadFlujo', _flujoDigitalSharepointController.uploadFileDriveSP);
router.get('/v1/getFlujo', _flujoDigitalSharepointController.getFilesFlujoDigital);
var _default = router;
exports["default"] = _default;