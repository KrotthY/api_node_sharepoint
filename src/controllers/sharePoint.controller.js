import { getAccessToken, getSiteId, uploadFileToSharePoint, folderExists, createFolder, deleteFile, getFilesPatient } from '../utils/auth.js';



export const uploadFileSharePoint = async (req, res) => {
  try {
      const { base64, fileName,folderName,mimeType } = req.body;

      const allowedMimeTypes = ['image/jpeg', 'image/png','video/mp4'];

      if (!allowedMimeTypes.includes(mimeType)) {
        return res.status(400).json({ success: false, error: 'Tipo de archivo no permitido' });
      }

      const accessToken = await getAccessToken(process.env.API_TENANT_ID, process.env.API_CLIENT_ID, process.env.API_CLIENT_SECRET);
      const siteId = await getSiteId(accessToken, process.env.API_SITE_URL );
      if( !( await folderExists(accessToken, siteId, folderName))){
        await createFolder(accessToken, siteId, folderName);
      }
      
      await uploadFileToSharePoint(base64, fileName, accessToken ,siteId, folderName);

      
      res.json({ success: true, data: "Archivo subido correctamente" });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
};


export const deleteFileSharePoint = async (req, res) =>{

  try {
    const { fileName, folderName} = req.body
    const accessToken =  await getAccessToken(process.env.API_TENANT_ID, process.env.API_CLIENT_ID, process.env.API_CLIENT_SECRET);
    const siteId = await getSiteId(accessToken, process.env.API_SITE_URL)

    await deleteFile(accessToken,siteId, folderName ,fileName)

    res.json({ success: true, data: "Archivo borrado correctamente" });

  } catch (error) {

    res.status(500).json({ success: false, error: error.message });
    
  }
}

export const getFilesSharePoint = async (req, res)=>{
  try {
    
    const { folderName } = req.query
    const accessToken =  await getAccessToken(process.env.API_TENANT_ID, process.env.API_CLIENT_ID, process.env.API_CLIENT_SECRET);
    const siteId = await getSiteId(accessToken, process.env.API_SITE_URL)
    
    const result = await getFilesPatient(accessToken,siteId, folderName)
    

    res.json({ success: true, data: result });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
