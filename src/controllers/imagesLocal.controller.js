import { createServerConnection } from "../database";
import { getServerConnection, isValidRut } from "../utils/authLocalServers";
import util from 'util';
import fs from 'fs';
import path from 'path';


const readFileAsync = util.promisify(fs.readFile);

export const getImagesLocal = async (req, res) => {
  const errors = []
  const allImages = [];
  try {
    const { rut , clinicId, fechaToma  } = req.query;

    if (!isValidRut(rut)) {
      throw new Error("Por favor, ingrese un RUT válido.");
    }
    
    const clinicConfig = getServerConnection.find(config => config.id === parseInt(clinicId))
    
    if (!clinicConfig) {
      throw new Error("No se encontró la configuración de la clínica proporcionada.");
    }

    for (const connConfig of clinicConfig.connection) {
      const conn = await createServerConnection(connConfig.ip, connConfig.serverName, connConfig.user, connConfig.password);
      const queryString = connConfig.queryUse;
      const queryPromise = util.promisify(conn.query).bind(conn);
      const results = await queryPromise(queryString, [rut,fechaToma]);
      const images = await Promise.all(results.map(async item => {
        const imagePath = path.join(connConfig.basePath, item.RutaImg,'\\',item.NombreImagen);
        try {
          const imageFile = await readFileAsync(imagePath); 
          const base64Image = Buffer.from(imageFile).toString('base64');
          return {
            Servidor: connConfig.serverRx || 'Error Servidor',
            Clinica: connConfig.clinicName || 'Error Nombre Clinica',
            RUT: item.RUT || 'Error RUT',
            NombrePaciente: item.NombrePaciente || 'Error Nombre Paciente',
            image: base64Image || 'Error Imagen',
            NombreImagen: item.NombreImagen || 'Error Nombre Imagen',
            IdImagen: item.ID || 'Error ID Imagen',
            FechaToma: item.FechaToma || 'Error Fecha Toma',
          };

        } catch (error) {
          errors.push(`Error al leer o cifrar la imagen ${item.NombreImagen} : ${error.message}`);
          return null;  
        }
      }));

      allImages.push(...images.filter(Boolean));
    }
    
    if (allImages.length === 0) {
      throw new Error("El paciente no posee imágenes.");
    }
    res.json({ success: true, images: allImages, errors });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


