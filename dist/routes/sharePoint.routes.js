"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));
var _uploadFileSharepointController = require("../controllers/Rayos/uploadFileSharepoint.controller.js");
var _deleteFileSharepointController = require("../controllers/Rayos/deleteFileSharepoint.controller.js");
var _getFileSharepointController = require("../controllers/Rayos/getFileSharepoint.controller.js");
var _getImagesLocalServersController = require("../controllers/Rayos/getImagesLocalServers.controller.js");
var _getPatientCareDatesLocalController = require("../controllers/Rayos/getPatientCareDatesLocal.controller.js");
var _getFilesInvoicesController = require("../controllers/GdExpress/getFilesInvoices.controller.js");
var _uploadFileSharepointController2 = require("../controllers/FlujoDigital/uploadFileSharepoint.controller.js");
var _getFileSharePointController = require("../controllers/FlujoDigital/getFileSharePoint.controller.js");
var _deleteFileSharepointController2 = require("../controllers/FlujoDigital/deleteFileSharepoint.controller.js");
//Rayos

//GD Express 

//Flujo Digital 

var router = _express["default"].Router();
var limiter = (0, _expressRateLimit["default"])({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Has excedido el límite de solicitudes. Inténtalo de nuevo más tarde.'
});

//Rayos
router.post('/v2/uploadFile', _uploadFileSharepointController.uploadFilesRayos);
router["delete"]('/v2/deleteFile', _deleteFileSharepointController.deleteFilesRayos);
router.get('/v2/getFiles', _getFileSharepointController.getFilesRayos);
router.get('/v2/getImageServer', _getImagesLocalServersController.getImagesLocalServers);
router.get('/v2/getPatientDates', _getPatientCareDatesLocalController.getPatientDates);

//GD Express 
router.get('/v2/filesGdExpress', _getFilesInvoicesController.getFilesInvoicesGd);

//Flujo Digital
router.post('/v2/uploadFlujo', _uploadFileSharepointController2.uploadFilesFlujoDigital);
router.get('/v2/getFlujo', _getFileSharePointController.getFilesFlujoDigital);
router["delete"]('/v2/deleteFlujo', _deleteFileSharepointController2.deleteFilesFlujoDigital);
var _default = router;
exports["default"] = _default;