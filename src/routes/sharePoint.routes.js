import express  from 'express';
import { uploadFileSharePoint, deleteFileSharePoint, getFilesSharePoint } from '../controllers/sharePoint.controller.js';
import { getImagesLocal } from '../controllers/imagesLocal.controller.js';

import rateLimit from 'express-rate-limit';



const router = express.Router();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Has excedido el límite de solicitudes. Inténtalo de nuevo más tarde.'
});



router.post('/uploadFile',limiter,uploadFileSharePoint);
router.delete('/deleteFile',limiter,deleteFileSharePoint);
router.get('/getFiles',limiter,getFilesSharePoint);
router.get('/getImageServer',limiter,getImagesLocal)


export default router