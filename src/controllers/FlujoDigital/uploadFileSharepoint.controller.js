import { uploadFileToDrive } from "../../utils/FlujoDigital/uploadFile.auth.js";
import { createFolderUser, createsubFolderUser } from "../../utils/Sharepoint/createItems.auth.js";
import { getAccessToken } from "../../utils/Sharepoint/getCredencials.auth.js";
import { folderExistsUser, subFolderExistsUser } from "../../utils/Sharepoint/validateItem.js";

const  driveId = "b!CzGfDnIio0SyF0mY2qNRneYCk1s-jilIkDxmR_5bBcEqP4tFQ-b0Q55PPh2jhtHN";

export const uploadFilesFlujoDigital = async (req, res) => {
  try {
    const { folderUser,subFolderName,  fileName, contentFile  } = req.body;
    
    const accessToken = await getAccessToken(process.env.API_TENANT_ID, process.env.API_CLIENT_ID, process.env.API_CLIENT_SECRET);

    let parentFolderId;

    const  folderUserExists = await folderExistsUser(accessToken, driveId, folderUser);

    if( !folderUserExists){
      const parentFolder = await createFolderUser (accessToken, driveId, folderUser )
      parentFolderId = parentFolder.id
    }else{
      parentFolderId = folderUserExists
    }

    if(!(await subFolderExistsUser(accessToken, driveId, parentFolderId , subFolderName))){
      await createsubFolderUser( accessToken, driveId,parentFolderId ,subFolderName )
    }

    // SUBIR ARCHIVO
    await uploadFileToDrive (accessToken, driveId, contentFile,fileName, parentFolderId,subFolderName);
    res.json({ success: true, data: "Archivo subido correctamente" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
