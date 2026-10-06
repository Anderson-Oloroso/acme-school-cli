import { getDbConnection } from '../config/database.js';

// Servicio base generico para operaciones CRUD con MySQL
export class BaseService {
  constructor(tableName, entityType = null) {
    this.tableName = tableName;
    this.entityType = entityType;
  }

  get db() {
    const conn = getDbConnection();
    if (!conn) {
      throw new Error('No hay conexion activa con MySQL. Verifique la base de datos.');
    }
    return conn;
  }

  // Ejecuta una consulta SELECT personalizada
  async query(sql, params = []) {
    const [rows] = await this.db.query(sql, params);
    return rows;
  }

  // Ejecuta un comando SQL preparado (INSERT, UPDATE, DELETE)
  async execute(sql, params = []) {
    try {
      const [result] = await this.db.execute(sql, params);
      return result;
    } catch (error) {
      this._handleDbError(error);
    }
  }

  // Obtiene todos los registros de la tabla
  async getAll() {
    const sql = `SELECT * FROM ${this.tableName}`;
    const [rows] = await this.db.query(sql);
    return rows;
  }

  // Obtiene un registro por su ID
  async getById(id) {
    const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`;
    const [rows] = await this.db.execute(sql, [id]);
    if (rows.length === 0) return null;
    return rows[0];
  }

  // Inserta un nuevo registro respetando integridad referencial
  async create(data) {
    const dbData = this._formatToDb(data);
    delete dbData.id;

    const columns = Object.keys(dbData);
    const placeholders = columns.map(() => '?').join(', ');
    const values = Object.values(dbData);

    const sql = `INSERT INTO ${this.tableName} (${columns.join(', ')}) VALUES (${placeholders})`;
    const result = await this.execute(sql, values);
    return { insertId: result.insertId };
  }

  // Actualiza un registro existente por ID
  async update(id, data) {
    const dbData = this._formatToDb(data);
    delete dbData.id;

    const columns = Object.keys(dbData);
    if (columns.length === 0) return { affectedRows: 0, changedRows: 0 };

    const setClause = columns.map(col => `${col} = ?`).join(', ');
    const values = [...Object.values(dbData), id];

    const sql = `UPDATE ${this.tableName} SET ${setClause} WHERE id = ?`;
    const result = await this.execute(sql, values);
    return { affectedRows: result.affectedRows, changedRows: result.changedRows };
  }

  // Elimina un registro por ID con control de integridad referencial
  async delete(id) {
    const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
    const result = await this.execute(sql, [id]);
    return { affectedRows: result.affectedRows };
  }

  // Manejo de errores de integridad referencial y unicidad en MySQL
  _handleDbError(error) {
    if (error.errno === 1451 || error.code === 'ER_ROW_IS_REFERENCED_2') {
      throw new Error(`No se puede eliminar o modificar este registro porque tiene datos asociados en otras tablas (Integridad Referencial).`);
    }
    if (error.errno === 1452 || error.code === 'ER_NO_REFERENCED_ROW_2') {
      throw new Error(`El registro relacionado no existe en la base de datos. Verifique los IDs ingresados (Integridad Referencial).`);
    }
    if (error.errno === 1062 || error.code === 'ER_DUP_ENTRY') {
      throw new Error(`Ya existe un registro con ese valor único (código, documento o email duplicado).`);
    }
    throw error;
  }

  // Convierte camelCase a snake_case para MySQL
  _formatToDb(data) {
    if (!data) return {};
    const raw = typeof data.toJSON === 'function' ? data.toJSON() : data;
    const result = {};

    for (const [key, value] of Object.entries(raw)) {
      if (key === 'fullName') continue;
      const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
      result[snakeKey] = value;
    }
    return result;
  }
}

export default BaseService;
