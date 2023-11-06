import axios from "axios";

export const getFolderId = async(accessToken,driveId,parentFolderName) =>{
  if (!parentFolderName ) {
    throw new Error(`Parametros requeridos no proporcionados 1 ${parentFolderName}`);
  }
  const endpoint = `https://graph.microsoft.com/v1.0/drives/${driveId}/items/root:/${parentFolderName}:/`;
  try {
    const response = await axios.get(endpoint, {
      headers: {
        'Authorization': `Bearer ${ accessToken }`
      }
    });

    return response.data.id;    
  } catch (error) {
    throw new Error("Error al obtener el id subcarpeta: ",  error.response ? error.response.data : error.message)
  }
}

export const getSubFolderId = async(accessToken,driveId,parentFolderId,subFolderName) =>{
  if (!subFolderName ) {
    throw new Error("Parametros requeridos no proporcionados getSubFolderId");
  }
  const endpoint = `https://graph.microsoft.com/v1.0/drives/${driveId}/items/${parentFolderId}:/${subFolderName}/`;
  try {
    const response = await axios.get(endpoint, {
      headers: {
        'Authorization': `Bearer ${ accessToken }`
      }
    });

    return response.data.id;    
  } catch (error) {
    throw new Error("Error al obtener el id subcarpeta: ",  error.response ? error.response.data : error.message)
  }
}