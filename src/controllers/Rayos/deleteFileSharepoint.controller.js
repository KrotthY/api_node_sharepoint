import { deleteFileRx } from "../../utils/Rayos/deleteFile.auth.js";
import { getAccessToken } from "../../utils/Sharepoint/getCredencials.auth.js";

const drivesIdRayos = "b!CzGfDnIio0SyF0mY2qNRneYCk1s-jilIkDxmR_5bBcFMwrj_TRaMRJuU_BqjtdcJ"

export const deleteFilesRayos = async (req, res) =>{

  try {
    const { fileName, folderName} = req.body
    const accessToken =  await getAccessToken(process.env.API_TENANT_ID, process.env.API_CLIENT_ID, process.env.API_CLIENT_SECRET);

    await deleteFileRx(accessToken,drivesIdRayos, folderName ,fileName)

    res.json({ success: true, data: "Archivo borrado correctamente" });

  } catch (error) {

    res.status(500).json({ success: false, error: error.message });
    
  }
}
