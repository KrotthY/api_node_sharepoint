import axios from 'axios'


export const folderExistsUser = async (accessToken, driveId,  folderName) =>{
  if (!folderName ) {
    throw new Error("Parametros requeridos no proporcionados");
  }

  const endpoint = `https://graph.microsoft.com/v1.0/drives/${driveId}/root/children?$filter=name eq '${folderName}'`;
  try {
    const response =  await axios.get(endpoint,{
      headers:{
        'Authorization':`Bearer ${ accessToken }`
      }
    })
    
    const folders = response.data.value;
    if (folders.length > 0) {
      return folders[0].id;
    } else {
      return null;
    }

  } catch (error) {
    throw new Error("Error la carpeta existe: ",  error.response ? error.response.data : error.message);
  }
}


export const subFolderExistsUser = async (accessToken, driveId, parentFolderId , subFolderName) =>{
  if (!subFolderName ) {
    throw new Error("Parametros requeridos no proporcionados");
  }

  const endpoint = `https://graph.microsoft.com/v1.0/drives/${driveId}/items/${ parentFolderId }/children?$filter=name eq '${subFolderName}'`;
  try {
    const response =  await axios.get(endpoint,{
      headers:{
        'Authorization':`Bearer ${ accessToken }`
      }
    })
    
    return response.data.value.length > 0; 

  } catch (error) {
    throw new Error("Error la carpeta existe: ",  error.response ? error.response.data : error.message);
  }
}
