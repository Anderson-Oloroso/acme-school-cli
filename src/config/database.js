import mysql from 'mysql2/promise';
import 'dotenv/config';

// Pool de conexiones a MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'acme_school',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true
});

export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Conectado exitosamente a la base de datos MySQL (acme_school).');
    connection.release();
    return true;
  } catch (error) {
    console.error('Error al conectarse a la base de datos MySQL:', error.message);
    return false;
  }
}

export default pool;
