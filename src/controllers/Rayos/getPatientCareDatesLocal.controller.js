import util from 'util';
import { getServerConnectionDatesRx } from '../../utils/Rayos/getConfigServerPatientDates.auth.js';
import { createServerConnection } from '../../database';
import { isValidRut } from '../../utils/validateRut.auth.js';

export const getPatientDates = async (req, res) => {
  try {
    const { rut, clinicId, fechaTomaInicio, fechaTomaTermino } = req.query;
    const errors = [];

    if (!isValidRut(rut)) {
      throw new Error("Por favor, ingrese un RUT válido.");
    }

    const clinicConfigRx = getServerConnectionDatesRx.find(config => config.id === parseInt(clinicId));
    if (!clinicConfigRx) {
      throw new Error("No se encontró la configuración de la clínica proporcionada.");
    }

    const connectionPromises = clinicConfigRx.connection.map(async connConfigRx => {
      try {
        const conn = await createServerConnection(connConfigRx.ip, connConfigRx.serverName, connConfigRx.user, connConfigRx.password);
        const queryString = connConfigRx.queryUse;
        const queryPromise = util.promisify(conn.query).bind(conn);
        const results = await queryPromise(queryString, [rut, fechaTomaInicio, fechaTomaTermino]);
        return results.map(item => ({
          Servidor: connConfigRx.serverRx || 'Error Servidor',
          Clinica: connConfigRx.clinicName || 'Error Nombre Clinica',
          FechaToma: item.FechaToma || 'Error Fecha Toma',
          NumeroDeRegistros: item.NumeroDeRegistros || "0"
        }));
      } catch (error) {
        errors.push(`Error al obtener los registros de las Imágenes ${connConfigRx.serverRx} : ${error.message}`);
        return [];
      }
    });

    const results = await Promise.all(connectionPromises);
    const allDatePatientRx = results.flat();

    if (allDatePatientRx.length === 0) {
      throw new Error("El paciente no posee imágenes.");
    }

    res.json({ success: true, datePatientRx: allDatePatientRx, errors });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
