import util from 'util';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { isValidRut } from '../../utils/validateRut.auth.js';
import { createServerConnection } from '../../database';
import { getServerConnection } from '../../utils/Rayos/getConfigServerData.auth.js';

const readFileAsync = util.promisify(fs.readFile);

export const getImagesLocalServers = async (req, res) => {
  try {
    const { rut, clinicId, fechaToma } = req.query;
    const errors = [];

    if (!isValidRut(rut)) {
      throw new Error("Por favor, ingrese un RUT válido.");
    }

    const clinicConfig = getServerConnection.find(config => config.id === parseInt(clinicId));
    if (!clinicConfig) {
      throw new Error("No se encontró la configuración de la clínica proporcionada.");
    }

    const connectionPromises = clinicConfig.connection.map(async connConfig => {
      try {
        const conn = await createServerConnection(connConfig.ip, connConfig.serverName, connConfig.user, connConfig.password);
        const queryString = connConfig.queryUse;
        const queryPromise = util.promisify(conn.query).bind(conn);
        const results = await queryPromise(queryString, [rut, fechaToma]);

        const imagePromises = results.map(async item => {
          const imagePath = path.join(connConfig.basePath, item.RutaImg, '\\', item.NombreImagen);
          try {
            const imageFile = await readFileAsync(imagePath);
            const webpBuffer = await sharp(imageFile).webp().toBuffer();
            const base64Image = Buffer.from(webpBuffer).toString('base64');

            return {
              Servidor: connConfig.serverRx || 'Error Servidor',
              Clinica: connConfig.clinicName || 'Error Nombre Clinica',
              RUT: item.RUT || 'Error RUT',
              NombrePaciente: item.NombrePaciente || 'Error Nombre Paciente',
              image: base64Image,
              NombreImagen: item.NombreImagen || 'Error Nombre Imagen',
              IdImagen: item.ID || 'Error ID Imagen',
              FechaToma: item.FechaToma || 'Error Fecha Toma',
            };

          } catch (error) {
            errors.push(`Error al leer o cifrar la imagen ${item.NombreImagen} : ${error.message}`);
            return null;
          }
        });

        return await Promise.all(imagePromises);
      } catch (error) {
        errors.push(`Error en la conexión con el servidor ${connConfig.serverRx} : ${error.message}`);
        return [];
      }
    });

    const results = await Promise.all(connectionPromises);
    const allImages = results.flat();

    if (allImages.length === 0) {
      throw new Error("El paciente no posee imágenes.");
    }
    
    res.json({ success: true, images: allImages, errors });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
