export const queries = {

  getAllImages : `SELECT  
  'KAVO' as Servidor,
  'Apoquindo' as Clinica,
  PT.PatientID as RUT,
  PT.FirstName+' '+ PT.LastName as NombrePaciente, 
  IMG.ImageGUID AS ID,
  EXT.FileName AS NombreImagen,
  CONVERT(VARCHAR(10),EXT.LastUpdate,105) AS FechaToma,
  PT.MediaSubDirectory AS RutaImg
  FROM PIDB_Patient as PT 
  INNER JOIN PIDB_Study SD ON(PT.PatientGUID = SD.PatientGUID)
  INNER JOIN PIDB_ImageSeries IMGS ON(SD.StudyGUID = IMGS.StudyGUID)
  INNER JOIN PIDB_Image IMG ON(IMGS.SeriesGUID = IMG.SeriesGUID)
  INNER JOIN PIDB_ExternalData EXT ON(IMG.ImageGUID = EXT.RefGUID)
    where
    EXT.RefType = 'ImageFile' and 
    PT.PatientID=  ?`

}