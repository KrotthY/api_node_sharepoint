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
