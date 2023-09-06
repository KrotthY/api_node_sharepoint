import { getConnection ,queries } from "../database";
import util from  'util'
import fs, { readSync } from 'fs';
import path from 'path';
import crypto from 'crypto';

function encrypt(buffer) {
  const algorithm = 'aes-256-ctr';
  const password = crypto.randomBytes(32); 
  const iv = crypto.randomBytes(16); 

  const cipher = crypto.createCipheriv(algorithm, password, iv);
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);

  return { encryptedData: encrypted, iv, key: password };
}



export const getImagesLocal = async (req, res) => {
  try {
    const { rut } = req.query;
    const conn = await getConnection();
    console.log("Conexión establecida");  // Para depuración

    const queryString = queries.getAllImages;
    const queryPromise = util.promisify(conn.query).bind(conn);
    const results = await queryPromise(queryString, [rut]);

    const images = results.map(item => {
      const imagePath = path.join('\\\\192.168.0.6\\cvdata\\DB\\Files\\', item.RutaImg, '\\', item.NombreImagen);
      console.log(`Intentando leer el archivo desde: ${imagePath}`);  // Para depuración

      try {
        const imageFile = fs.readFileSync(imagePath);
        const encryptedImage = encrypt(imageFile);
        return {
          Servidor : item.Servidor,
          Clinica : item.Clinica,
          RUT : item.RUT,
          NombrePaciente : item.NombrePaciente,
          image : encryptedImage,
          NombreImagen : item.NombreImagen,
          IdImagen : item.ID,
        };
      } catch (error) {
        console.log(`Error al leer el archivo: ${error.message}`);  // Para depuración
        return item;
      }
    });

    res.json(images);

  } catch (error) {
    console.error(`Error general: ${error.message}`);  // Para depuración
    res.status(500).send("Ocurrió un error interno");  // Mensaje de error genérico
  }
};

