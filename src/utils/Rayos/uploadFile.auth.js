import axios from 'axios'


export const uploadFileToDriveRx = async (base64, fileName, accessToken, drivesIdRayos, folderName) => {
  if (!folderName || !fileName) {
    throw new Error("Parametros requeridos no proporcionados");
  }
  const endpoint = `https://graph.microsoft.com/v1.0/drives/${ drivesIdRayos }/items/root:/${ folderName }/${ fileName }:/content`;

  try {
      const response = await axios.put(endpoint, Buffer.from(base64, 'base64'), {
          headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/octet-stream'
          } 
      });

      return response.data;
  } catch (error) {
      throw new Error("Error al subir el archivo:",  error.response ? error.response.data : error.message);
  }
}

