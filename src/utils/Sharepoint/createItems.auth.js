import axios from 'axios'

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
