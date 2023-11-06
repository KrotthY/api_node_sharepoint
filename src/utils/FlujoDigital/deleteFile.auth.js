import axios from 'axios'


export const deleteFileToDrive = async (accessToken,driveIdFlujo, parentFolderId ,subFolderName,fileName) => {
  if (!fileName) {
    throw new Error("Parametros requeridos no proporcionados 2");
  }
  const endpoint = `https://graph.microsoft.com/v1.0/drives/${ driveIdFlujo }/items/${ parentFolderId }:/${ subFolderName }/${ fileName }`;

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

