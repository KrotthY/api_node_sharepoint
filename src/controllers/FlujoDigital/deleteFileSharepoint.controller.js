import { deleteFileToDrive } from "../../utils/FlujoDigital/deleteFile.auth.js";
import { getAccessToken } from "../../utils/Sharepoint/getCredencials.auth.js";
import { getFolderId } from "../../utils/Sharepoint/getIdItems.auth.js";

const  driveIdFlujo = "b!CzGfDnIio0SyF0mY2qNRneYCk1s-jilIkDxmR_5bBcEqP4tFQ-b0Q55PPh2jhtHN";

export const deleteFilesFlujoDigital = async (req, res) => {
  try {

    const { parentFolderName,subFolderName,  fileName  } = req.body;
    const accessToken = await getAccessToken(process.env.API_TENANT_ID, process.env.API_CLIENT_ID, process.env.API_CLIENT_SECRET);
    const parentFolderId = await getFolderId(accessToken,driveIdFlujo,parentFolderName);
    await deleteFileToDrive (accessToken,driveIdFlujo, parentFolderId ,subFolderName,fileName)

    res.json({ success: true, data: "Archivo eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
