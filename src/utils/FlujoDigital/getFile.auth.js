import axios from 'axios'

export const getFilesToDrive = async(accessToken,driveId,subFolderID) =>{
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
      createdDateTime: file.createdDateTime,
      url: file['@microsoft.graph.downloadUrl']
    }))  
  } catch (error) {
    throw new Error("Error al obtener el id subcarpeta: ",  error.response ? error.response.data : error.message)
  }
}