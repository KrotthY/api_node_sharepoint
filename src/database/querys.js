export const queries = {

  getDataServerKavo : `SELECT  
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
    WHERE
    EXT.RefType = 'ImageFile' and 
    REPLACE(REPLACE( PT.PatientID, '.', ''), '-', '') = REPLACE(REPLACE(?, '.', ''), '-', '')
    AND CONVERT(VARCHAR(10),EXT.LastUpdate,105) = ?
    ORDER BY EXT.LastUpdate DESC  
  `,

  getDataServerSirona: `
  SELECT 
  PW.tPatSExtPatID AS RUT,
  PW.tPatSFirstname+' '+PW.tPatSName AS NombrePaciente,
  IR.tImgCulIntImgIDPk as ID,
  SUBSTRING(IR.tImgSFile, CHARINDEX('\\', IR.tImgSFile, CHARINDEX('\\', IR.tImgSFile) + 1) + 1, LEN(IR.tImgSFile))  as NombreImagen,
  CONVERT(VARCHAR(10),IR.tImgTs,105) as FechaToma,
  SUBSTRING(IR.tImgSFile, 1, LEN(IR.tImgSFile) - CHARINDEX('\\', REVERSE(IR.tImgSFile))) AS RutaImg
  FROM [PDATA_SQLEXPRESS].[dbo].[TPatientRaw] AS PW 
  INNER JOIN [PDATA_SQLEXPRESS].[dbo].[TImageRaw] AS IR ON (PW.tPatCulIntPatIDPk = IR.tImgCulIntPatIDFk)
  WHERE REPLACE(REPLACE( PW.tPatSExtPatID, '.', ''), '-', '') = REPLACE(REPLACE(?, '.', ''), '-', '')
  AND CONVERT(VARCHAR(10),IR.tImgTs,105) = ?
  ORDER BY IR.tImgTs DESC;`
  ,

  getPatientDates_Kavo: `
  SELECT
  CONVERT(VARCHAR(10), DATEADD(DAY, DATEDIFF(DAY, 0, EXT.LastUpdate), 0), 105) AS FechaToma,
  COUNT(*) AS NumeroDeRegistros
  FROM PIDB_Patient as PT 
  INNER JOIN PIDB_Study SD ON PT.PatientGUID = SD.PatientGUID
  INNER JOIN PIDB_ImageSeries IMGS ON SD.StudyGUID = IMGS.StudyGUID
  INNER JOIN PIDB_Image IMG ON IMGS.SeriesGUID = IMG.SeriesGUID
  INNER JOIN PIDB_ExternalData EXT ON IMG.ImageGUID = EXT.RefGUID
  WHERE
    EXT.RefType = 'ImageFile' 
    AND REPLACE(REPLACE(PT.PatientID, '.', ''), '-', '') = REPLACE(REPLACE(?, '.', ''), '-', '')
    AND CAST(CONVERT(VARCHAR, EXT.LastUpdate, 112) AS DATETIME) BETWEEN ? AND ?
  GROUP BY DATEADD(DAY, DATEDIFF(DAY, 0, EXT.LastUpdate), 0)
  ORDER BY DATEADD(DAY, DATEDIFF(DAY, 0, EXT.LastUpdate), 0) DESC;`
  ,

  getPatientDates_Sirona: `
  SELECT
  CONVERT(VARCHAR(10), DATEADD(DAY, DATEDIFF(DAY, 0, IR.tImgTs), 0), 105) AS FechaToma,
  COUNT(*) AS NumeroDeRegistros
  FROM TPatientRaw PW 
  INNER JOIN TImageRaw IR ON (PW.tPatCulIntPatIDPk = IR.tImgCulIntPatIDFk)
  WHERE REPLACE(REPLACE(PW.tPatSExtPatID, '.', ''), '-', '') = REPLACE(REPLACE(?, '.', ''), '-', '')
  AND CAST(CONVERT(VARCHAR, IR.tImgTs, 112) AS DATETIME) BETWEEN ? AND ?
  GROUP BY DATEADD(DAY, DATEDIFF(DAY, 0, IR.tImgTs), 0)
  ORDER BY DATEADD(DAY, DATEDIFF(DAY, 0, IR.tImgTs), 0) desc;`
  ,

  getSolicitudesRayos: `
  SELECT idSolicitud
      ,idSucursal
      ,rutSolicitante
      ,nombreSolicitante
      ,emailSolicitante
      ,telefonoSolicitante
      ,fechaSolicitud
      ,fechaToma
      ,idTIpoSolicitud
      ,fechaRespuesta
      ,estadoRespuesta
  FROM SOLICITUD `
  ,

}