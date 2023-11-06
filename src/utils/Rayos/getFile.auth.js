import axios from 'axios'

export const getFilesToDriveRx = async(accessToken,drivesIdRayos,folderName) =>{
  if (!folderName) {
    throw new Error("Parametros requeridos no proporcionados.");
  }
  const endpoint = `https://graph.microsoft.com/v1.0/drives/${drivesIdRayos}/root:/${folderName}:/children`;
  try {
    const response = await axios.get(endpoint, {
      headers: {
        'Authorization': `Bearer ${ accessToken }`
      }
    });

    const AllData =  response.data.value;

    return AllData.map(file => ({
      name: file.name,
      url: file['@microsoft.graph.downloadUrl']
    }))  
  } catch (error) {
    throw new Error("Error al obtener las imagenes solicitadas: ",  error.response ? error.response.data : error.message)
  }
}

