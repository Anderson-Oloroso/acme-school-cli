import { createConnection } from 'mysql2/promise';
import 'dotenv/config';

// Variable global para la conexion simple
let dbConnection = null;

// Establece una conexion simple con MySQL
export async function connectDB() {
  try {
    dbConnection = await createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'acme_school',
      dateStrings: true
    });
    console.log('Conectado exitosamente a la base de datos MySQL (acme_school).\n');
    return dbConnection;
  } catch (error) {
    console.error('Error al conectarse a la base de datos MySQL:', error.message);
    return null;
  }
}

// Retorna la conexion activa
export function getDbConnection() {
  return dbConnection;
}

// Cierra la conexion simple
export async function closeDB() {
  if (dbConnection) {
    await dbConnection.end();
    dbConnection = null;
  }
}

export default {
  connectDB,
  getDbConnection,
  closeDB
};
