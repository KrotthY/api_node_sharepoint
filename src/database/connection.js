import sql from 'msnodesqlv8';

const connectionString = `Driver={SQL Server Native Client 11.0};Server={${process.env.BD1_SERVER_NAME}};Database={${process.env.DB1_NAME}};UID={${process.env.DB1_USER}};PWD={${process.env.DB1_PWD}};`;

export async function getConnection() {
  return new Promise((resolve, reject) => {
    sql.open(connectionString, (err, conn) => {
      if (err) {
        console.error('Error de conexión:', err);
        reject(err);
        return;
      }
      resolve(conn);
    });
  });
}