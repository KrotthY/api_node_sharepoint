import { getFilesToDriveRx } from "../../utils/Rayos/getFile.auth.js";
import { getAccessToken } from "../../utils/Sharepoint/getCredencials.auth.js";


const drivesIdRayos = "b!CzGfDnIio0SyF0mY2qNRneYCk1s-jilIkDxmR_5bBcFMwrj_TRaMRJuU_BqjtdcJ"

export const getFilesRayos = async (req, res)=>{
  try {
    
    const { folderName } = req.query
    const accessToken =  await getAccessToken(process.env.API_TENANT_ID, process.env.API_CLIENT_ID, process.env.API_CLIENT_SECRET);
    const result = await getFilesToDriveRx(accessToken,drivesIdRayos,folderName);
    
    res.json({ success: true, data: result });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
