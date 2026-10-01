import mysql from 'mysql2';
import 'dotenv/config';

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'acme_school',
  dateStrings: true
}).promise();

export async function testConnection() {
  try {
    await connection.ping();
    console.log('Conectado exitosamente a la base de datos MySQL (acme_school).');
    return true;
  } catch (error) {
    console.error('Error al conectarse a la base de datos MySQL:', error.message);
    return false;
  }
}

export default connection;
