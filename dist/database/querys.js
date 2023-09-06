"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queries = void 0;
var queries = {
  getAllImages: "SELECT  \n  'KAVO' as Servidor,\n  'Apoquindo' as Clinica,\n  PT.PatientID as RUT,\n  PT.FirstName+' '+ PT.LastName as NombrePaciente, \n  IMG.ImageGUID AS ID,\n  EXT.FileName AS NombreImagen,\n  CONVERT(VARCHAR(10),EXT.LastUpdate,105) AS FechaToma,\n  PT.MediaSubDirectory AS RutaImg\n  FROM PIDB_Patient as PT \n  INNER JOIN PIDB_Study SD ON(PT.PatientGUID = SD.PatientGUID)\n  INNER JOIN PIDB_ImageSeries IMGS ON(SD.StudyGUID = IMGS.StudyGUID)\n  INNER JOIN PIDB_Image IMG ON(IMGS.SeriesGUID = IMG.SeriesGUID)\n  INNER JOIN PIDB_ExternalData EXT ON(IMG.ImageGUID = EXT.RefGUID)\n    where\n    EXT.RefType = 'ImageFile' and \n    PT.PatientID=  ?"
};
exports.queries = queries;