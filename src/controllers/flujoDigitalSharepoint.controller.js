import { getAccessToken } from '../utils/auth.js';
import { createFolderUser, createsubFolderUser, folderExistsUser, getAllContentSubFolder, getFolderId, getSubFolderId, subFolderExistsUser, uploadFileToDrive } from '../utils/authFlujoDigital.js'

let  driveId = 'b!CzGfDnIio0SyF0mY2qNRneYCk1s-jilIkDxmR_5bBcEqP4tFQ-b0Q55PPh2jhtHN';
export const uploadFileDriveSP = async (req, res) => {
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


export const getFilesFlujoDigital = async (req, res)=>{
  try {
    
    const { parentFolderName,subFolderName } = req.query

    const accessToken =  await getAccessToken(process.env.API_TENANT_ID, process.env.API_CLIENT_ID, process.env.API_CLIENT_SECRET);

    const parentFolderId = await getFolderId(accessToken,driveId,parentFolderName);

    const subFolderID =await getSubFolderId(accessToken,driveId,parentFolderId,subFolderName)

    const result = await getAllContentSubFolder(accessToken,driveId,subFolderID);
    res.json({ success: true, data: result });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}