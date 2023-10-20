import sql from 'msnodesqlv8';

export const createServerConnection = async (ipServer, nameServer, userServer, pwdServer) =>{
  const connectionServers = `Driver={SQL Server Native Client 11.0};Server={${ipServer}\\${nameServer}};Database={${nameServer}};UID={${userServer}};PWD={${pwdServer}}`;
  
  return new Promise((resolve, reject) => {
    sql.open(connectionServers, (err, conn) => {
      if (err) {
        console.error('Error de conexión:', connectionServers,err);
        reject(err);
        return;
      }
      resolve(conn);
    });
  });
}