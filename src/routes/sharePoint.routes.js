import express  from 'express';
import { uploadFileSharePoint, deleteFileSharePoint, getFilesSharePoint } from '../controllers/sharePoint.controller.js';
import { getImagesLocal } from '../controllers/imagesLocal.controller.js';
import { getFilesInvoices } from '../controllers/invoicesGdExpress.controller.js';
import { getPatientDates } from '../controllers/getPatientDatesRx.controller.js';
import { getFilesFlujoDigital, uploadFileDriveSP } from '../controllers/flujoDigitalSharepoint.controller.js';

import rateLimit from 'express-rate-limit';



const router = express.Router();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Has excedido el límite de solicitudes. Inténtalo de nuevo más tarde.'
});

//Rayos
router.post('/uploadFile',uploadFileSharePoint);
router.delete('/deleteFile',deleteFileSharePoint);
router.get('/getFiles',getFilesSharePoint);
router.get('/getImageServer',getImagesLocal)
router.get('/v1/getPatientDates',getPatientDates)

//GD Express 
router.get('/v1/filesGdExpress',getFilesInvoices)

//Flujo Digital
router.post('/v1/uploadFlujo', uploadFileDriveSP)
router.get('/v1/getFlujo', getFilesFlujoDigital)



export default router