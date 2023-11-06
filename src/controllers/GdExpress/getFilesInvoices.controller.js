import xml2js from 'xml2js'
import { getDataFiles } from '../../utils/GdExpress/getDataFiles.auth.js';


export const getFilesInvoicesGd = async (req,res)=> {

  try {

    const { typeDoc, issueDateStart, issueDateEnd } = req.query ;

    const invoice = await getDataFiles(typeDoc, issueDateStart, issueDateEnd);

    xml2js.parseString(invoice, { explicitArray: false }, (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, error: 'Error al procesar la respuesta XML.' });
      }
      res.json({ Success: true, data: result.SearchResult.Data || {} });
    });
  } catch (error) {
    res.status(500).json({ Error: true, error: error.message });
  }
}