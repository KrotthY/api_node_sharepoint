import { getFilesToDrive } from "../../utils/FlujoDigital/getFile.auth.js";
import { getAccessToken } from "../../utils/Sharepoint/getCredencials.auth.js";
import { getFolderId, getSubFolderId } from "../../utils/Sharepoint/getIdItems.auth.js";

const  driveIdFlujo = process.env.FLUJO_ID;

export const getFilesFlujoDigital = async (req, res)=>{
  try {
    
    const { parentFolderName,subFolderName } = req.query

    const accessToken =  await getAccessToken(process.env.API_TENANT_ID, process.env.API_CLIENT_ID, process.env.API_CLIENT_SECRET);

    const parentFolderId = await getFolderId(accessToken,driveId,parentFolderName);

    const subFolderID =await getSubFolderId(accessToken,driveId,parentFolderId,subFolderName)

    const result = await getFilesToDrive(accessToken,driveId,subFolderID);
    res.json({ success: true, data: result });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
