import axios from "axios";

export const getDataFiles = async( typeDoc, issueDateStart, issueDateEnd) => {
  const cantidadArchivos = 500;
  if (!typeDoc || !issueDateStart || !issueDateEnd ) {
    throw new Error("Parametros requeridos no proporcionados");
  }

  try {
    let queryTypeDocument;

    switch (typeDoc) {
      case '1':
        queryTypeDocument = ' TipoDTE:33 ';
        break;
      case '2':
        queryTypeDocument = ' TipoDTE:34 ';
        break;
      case '3':
        queryTypeDocument = '(TipoDTE:33 OR TipoDTE:34) ';
        break;
      default:
        throw new Error("Tipo de documento no válido.");
    }

    if (issueDateStart && issueDateEnd) {
      queryTypeDocument += ` AND FchEmis:[${issueDateStart} TO ${issueDateEnd}]`;
    }

    const queryGdExpress64 = Buffer.from(queryTypeDocument).toString('base64');

    const endpoint = `http://192.168.0.199/api/Core.svc/core/PaginatedSearch/P/R/${queryGdExpress64}/1/${cantidadArchivos}`

    const response = await axios.get(endpoint, {
      headers: {
        'AuthKey': '2b440c34-979a-4c5c-b58e-5540dcb55922',
        'Content-Type': 'application/xml',
        'Accept': 'application/xml'
      }
    });
    return response.data
    
  } catch (error) {
    const errorMessage = error.response ? error.response.data : error.message;
    throw new Error(`Error al establecer la conexión con GD Express.- ${errorMessage}`);
  }
}