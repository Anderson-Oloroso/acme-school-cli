import { getDbConnection } from '../config/database.js';

export class BaseService {
  constructor(tableName) {
    this.tableName = tableName;
  }

  get db() {
    const conn = getDbConnection();
    if (!conn) {
      throw new Error('No hay conexión activa con MySQL.');
    }
    return conn;
  }

  async query(sql, params = []) {
    const [rows] = await this.db.query(sql, params);
    return rows;
  }

  async execute(sql, params = []) {
    try {
      const [result] = await this.db.execute(sql, params);
      return result;
    } catch (error) {
      this._handleDbError(error);
    }
  }

  async getAll() {
    const [rows] = await this.db.query(`SELECT * FROM ${this.tableName}`);
    return rows;
  }

  async getById(id) {
    const [rows] = await this.db.execute(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id]);
    return rows[0] || null;
  }

  async create(data) {
    const keys = Object.keys(data).filter(k => k !== 'id');
    const placeholders = keys.map(() => '?').join(', ');
    const values = keys.map(k => data[k]);

    const sql = `INSERT INTO ${this.tableName} (${keys.join(', ')}) VALUES (${placeholders})`;
    const result = await this.execute(sql, values);
    return { insertId: result.insertId };
  }

  async update(id, data) {
    const keys = Object.keys(data).filter(k => k !== 'id');
    if (keys.length === 0) return { affectedRows: 0 };

    const setClause = keys.map(k => `${k} = ?`).join(', ');
    const values = [...keys.map(k => data[k]), id];

    const sql = `UPDATE ${this.tableName} SET ${setClause} WHERE id = ?`;
    const result = await this.execute(sql, values);
    return { affectedRows: result.affectedRows };
  }

  async delete(id) {
    const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
    const result = await this.execute(sql, [id]);
    return { affectedRows: result.affectedRows };
  }

  _handleDbError(error) {
    if (error.errno === 1451 || error.code === 'ER_ROW_IS_REFERENCED_2') {
      throw new Error('No se puede eliminar o modificar porque tiene registros asociados (Integridad Referencial).');
    }
    if (error.errno === 1452 || error.code === 'ER_NO_REFERENCED_ROW_2') {
      throw new Error('El registro relacionado no existe en la base de datos (Integridad Referencial).');
    }
    if (error.errno === 1062 || error.code === 'ER_DUP_ENTRY') {
      throw new Error('Ya existe un registro con ese valor único (código, documento o email duplicado).');
    }
    throw error;
  }
}

export default BaseService;
