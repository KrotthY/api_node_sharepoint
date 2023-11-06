import express  from 'express';
import rateLimit from 'express-rate-limit';
//Rayos
import { uploadFilesRayos } from '../controllers/Rayos/uploadFileSharepoint.controller.js';
import { deleteFilesRayos } from '../controllers/Rayos/deleteFileSharepoint.controller.js';
import { getFilesRayos } from '../controllers/Rayos/getFileSharepoint.controller.js';
import { getImagesLocalServers } from '../controllers/Rayos/getImagesLocalServers.controller.js';
import { getPatientDates } from '../controllers/Rayos/getPatientCareDatesLocal.controller.js';
//GD Express 
import { getFilesInvoicesGd } from '../controllers/GdExpress/getFilesInvoices.controller.js';
//Flujo Digital 
import {  uploadFilesFlujoDigital } from '../controllers/FlujoDigital/uploadFileSharepoint.controller.js';
import { getFilesFlujoDigital } from '../controllers/FlujoDigital/getFileSharePoint.controller.js';
import { deleteFilesFlujoDigital } from '../controllers/FlujoDigital/deleteFileSharepoint.controller.js';


const router = express.Router();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Has excedido el límite de solicitudes. Inténtalo de nuevo más tarde.'
});

//Rayos
router.post('/v2/uploadFile',uploadFilesRayos);
router.delete('/v2/deleteFile',deleteFilesRayos);
router.get('/v2/getFiles',getFilesRayos);

router.get('/v2/getImageServer',getImagesLocalServers)
router.get('/v2/getPatientDates',getPatientDates)

//GD Express 
router.get('/v2/filesGdExpress',getFilesInvoicesGd)

//Flujo Digital
router.post('/v2/uploadFlujo', uploadFilesFlujoDigital)
router.get('/v2/getFlujo', getFilesFlujoDigital)
router.delete('/v2/deleteFlujo',deleteFilesFlujoDigital);




export default router