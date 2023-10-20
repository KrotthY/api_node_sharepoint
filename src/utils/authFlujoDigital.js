import axios from 'axios'

export const uploadFileToDrive = async (accessToken, driveId, contentFile,fileName, parentFolderId,subFolderName) => {
  if (!fileName) {
    throw new Error(`Parametros requeridos no proporcionados`);
  }
  const endpoint = `https://graph.microsoft.com/v1.0/drives/${ driveId }/items/${ parentFolderId }:/${ subFolderName }/${ fileName }:/content`;

  try {
      const response = await axios.put(endpoint, Buffer.from(contentFile, 'base64'), {
          headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/octet-stream'
          } 
      });

      return response.data;
  } catch (error) {
      throw new Error("Error al subir el archivo 1:",  error.response ? error.response.data : error.message);
  }
}

export const createFolderUser = async ( accessToken, driveId, folderName ) => {

  if (!folderName ) {
    throw new Error("Parametros requeridos no proporcionados");
  }
  const endpoint =  `https://graph.microsoft.com/v1.0/drives/${ driveId }/root/children`;
  try {
    const response = await axios.post(endpoint, {
      name: folderName,
      folder: {},
      "@microsoft.graph.conflicBehavior" : "rename"
    },
    {
      headers: {
        'Authorization': `Bearer ${ accessToken }`,
        'Content-Type': 'application/json'
      }
    })

    return response.data 

  } catch (error) {
    throw new Error("Error al intentar crear la carpeta del usuario: ", error.response ? error.response.data : error.message)
  }
}

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

export const createsubFolderUser = async ( accessToken, driveId,parentFolderId ,subFolderName ) => {

  if (!subFolderName ) {
    throw new Error("Parametros requeridos no proporcionados");
  }
  const endpoint =  `https://graph.microsoft.com/v1.0/drives/${ driveId }/items/${ parentFolderId }/children`;
  const subFolderData = {
    name: subFolderName,
    folder: {},
    "@microsoft.graph.conflicBehavior" : "rename"
  };

  try {
    const response = await axios.post(endpoint, subFolderData,
    {
      headers: {
        'Authorization': `Bearer ${ accessToken }`,
        'Content-Type': 'application/json'
      }
    })

    return response.data 

  } catch (error) {
    throw new Error("Error al intentar crear la sub carpeta del usuario: ", error.response ? error.response.data : error.message)
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




export const getFolderId = async(accessToken,driveId,parentFolderName) =>{
  if (!parentFolderName ) {
    throw new Error("Parametros requeridos no proporcionados getFolderId");
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

export const getAllContentSubFolder = async(accessToken,driveId,subFolderID) =>{
  if (!subFolderID || !driveId) {
    throw new Error("Parametros requeridos no proporcionados getAllContentSubFolder");
  }
  const endpoint = `https://graph.microsoft.com/v1.0/drives/${driveId}/items/${subFolderID}/children`;
  try {
    const response = await axios.get(endpoint, {
      headers: {
        'Authorization': `Bearer ${ accessToken }`
      }
    });

    const AllData =  response.data.value;

    return AllData.map(file => ({
      name: file.name,
      mimeType: file.file.mimeType,
      url: file['@microsoft.graph.downloadUrl']
    }))  
  } catch (error) {
    throw new Error("Error al obtener el id subcarpeta: ",  error.response ? error.response.data : error.message)
  }
}