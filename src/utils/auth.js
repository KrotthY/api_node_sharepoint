import axios from 'axios'

export const getAccessToken =  async (tenantId, clientId, clientSecret) => {
  if (!tenantId || !clientId  || !clientSecret) {
    throw new Error(`Parametros requeridos no proporcionados => ClientId: ${clientId} o clientSecret: ${clientSecret} o tenantId: ${tenantId} o`);
  }

  const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
  const tokenParams = {
      client_id: clientId,
      scope: 'https://graph.microsoft.com/.default',
      client_secret: clientSecret,
      grant_type: 'client_credentials'
  };

  try {
      const response = await axios.post(tokenUrl, new URLSearchParams(tokenParams), {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
      });

      return response.data.access_token;
  } catch (error) {
      throw new Error("Error al obtener el tocken de acceso: ",  error.response ? error.response.data : error.message);
  }
}

export const uploadFileToSharePoint = async (base64, fileName, accessToken, siteId, folderName) => {
  if (!folderName || !fileName) {
    throw new Error("Parametros requeridos no proporcionados");
  }
  const endpoint = `https://graph.microsoft.com/v1.0/sites/${ siteId }/drive/items/root:/${ folderName }/${ fileName }:/content`;

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

export const getSiteId =  async (accessToken, siteUrl) => {

  const siteEndpoint = `https://graph.microsoft.com/v1.0/sites/root?search=${siteUrl}`;
  try {
    const response = await axios.get(siteEndpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    
    return response.data.id;
  } catch (error) {
    
    throw new Error("Error al obtener el id del sitio: ",  error.response ? error.response.data : error.message)
  }
}

export const deleteFile = async (accessToken,siteId, folderName ,fileName) => {
  if (!folderName || !fileName) {
    throw new Error("Parametros requeridos no proporcionados");
  }
  const endpoint = `https://graph.microsoft.com/v1.0/sites/${ siteId }/drive/items/root:/${ folderName }/${ fileName }`;
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


export const folderExists = async (accessToken, siteId,  folderName) =>{
  if (!folderName ) {
    throw new Error("Parametros requeridos no proporcionados");
  }

  const endpoint = `https://graph.microsoft.com/v1.0/sites/${siteId}/drive/root/children?$filter=name eq '${folderName}'`;
  try {
    const response =  await axios.get(endpoint,{
      headers:{
        'Authorization':`Bearer ${ accessToken }`
      }
    })
    
    return response.data.value.length > 0; 

  } catch (error) {
    throw new Error("Error la carpeta no existe: ",  error.response ? error.response.data : error.message);
  }
}

export const createFolder = async ( accessToken, siteId, folderName ) => {

  if (!folderName ) {
    throw new Error("Parametros requeridos no proporcionados");
  }
  const endpoint =  `https://graph.microsoft.com/v1.0/sites/${ siteId }/drive/root/children`;

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
    throw new Error("Error al intentar crear la carpeta: ", error.response ? error.response.data : error.message)
}
}


export const getFilesPatient = async(accessToken,siteId, folderName) =>{
  
  if (!folderName ) {
    throw new Error("Parametros requeridos no proporcionados");
  }
  const endpoint = `https://graph.microsoft.com/v1.0/sites/${siteId}/drive/root:/${folderName}:/children`;

  try {
    const response = await axios.get(endpoint, {
      headers: {
        'Authorization': `Bearer ${ accessToken }`
      }
    });

    const filesImg =  response.data.value;

    return filesImg.map(file => ({
      name: file.name,
      url: file['@microsoft.graph.downloadUrl']
    }))
    
  } catch (error) {
    
    throw new Error("Error no se pudo consultar: ",  error.response ? error.response.data : error.message)
}
}