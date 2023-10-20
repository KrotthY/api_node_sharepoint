import { createServerConnection } from "../database";
import { getServerConnectionDatesRx, isValidRut } from "../utils/authPatientDates";
import util from 'util';


export const getPatientDates = async (req, res) => {
  const errors = []
  const allDatePatientRx = [];
  try {
    const { rut , clinicId ,fechaTomaInicio ,fechaTomaTermino } = req.query;

    if (!isValidRut(rut)) {
      throw new Error("Por favor, ingrese un RUT válido.");
    }
    
    const clinicConfigRx = getServerConnectionDatesRx.find(config => config.id === parseInt(clinicId))
    
    if (!clinicConfigRx) {
      throw new Error("No se encontró la configuración de la clínica proporcionada.");
    }

    for (const connConfigRx of clinicConfigRx.connection) {
      const conn = await createServerConnection(connConfigRx.ip, connConfigRx.serverName, connConfigRx.user, connConfigRx.password);
      const queryString = connConfigRx.queryUse;
      const queryPromise = util.promisify(conn.query).bind(conn);
      const results = await queryPromise(queryString, [rut,fechaTomaInicio ,fechaTomaTermino]);
      const datePatientRx = await Promise.all(results.map(async item => {
        try {
          return {
            Servidor: connConfigRx.serverRx || 'Error Servidor',
            Clinica: connConfigRx.clinicName || 'Error Nombre Clinica',
            FechaToma: item.FechaToma || 'Error Fecha Toma',
            NumeroDeRegistros: item.NumeroDeRegistros || "0"
          };

        } catch (error) {
          errors.push(`Error al obtener los registros de las Imágenes ${item.FechaToma} : ${error.message}`);
          return null;  
        }
      }));
      allDatePatientRx.push(...datePatientRx.filter(Boolean));
    }
    
    if (allDatePatientRx.length === 0) {
      throw new Error("El paciente no posee imágenes.");
    }
    res.json({ success: true, datePatientRx: allDatePatientRx, errors });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



