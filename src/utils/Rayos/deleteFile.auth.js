import axios from 'axios'


export const deleteFileRx = async (accessToken,drivesIdRayos, folderName ,fileName) => {
  if (!folderName || !fileName) {
    throw new Error("Parametros requeridos no proporcionados");
  }
  const endpoint = `https://graph.microsoft.com/v1.0/drives/${ drivesIdRayos }/items/root:/${ folderName }/${ fileName }`;
  try {
    await axios.delete(endpoint,{

      headers: {
        'Authorization':`Bearer ${ accessToken }`
      }
    })
  } catch (error) {
    throw new Error("Error al eliminar el archivo: ",  error.response ? error.response.data : error.message  );
  }
}

