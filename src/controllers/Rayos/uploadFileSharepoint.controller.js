import { uploadFileToDriveRx } from "../../utils/Rayos/uploadFile.auth.js";
import { createFolderUser } from "../../utils/Sharepoint/createItems.auth.js";
import { getAccessToken } from "../../utils/Sharepoint/getCredencials.auth.js";
import { folderExistsUser } from "../../utils/Sharepoint/validateItem.js";


export const uploadFilesRayos = async (req, res) => {
  try {
      const { base64, fileName,folderName,mimeType } = req.body;

      const allowedMimeTypes = ['image/jpeg', 'image/png','video/mp4'];

      if (!allowedMimeTypes.includes(mimeType)) {
        return res.status(400).json({ success: false, error: 'Tipo de archivo no permitido' });
      }

      const accessToken = await getAccessToken(process.env.API_TENANT_ID, process.env.API_CLIENT_ID, process.env.API_CLIENT_SECRET);

      const folderExists = await folderExistsUser(accessToken, drivesIdRayos, folderName);

      if( !folderExists){
        await createFolderUser (accessToken, drivesIdRayos, folderName)
      }

      await uploadFileToDriveRx (base64, fileName, accessToken, drivesIdRayos, folderName);
      
      res.json({ success: true, data: "Archivo subido correctamente" });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
};
