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

