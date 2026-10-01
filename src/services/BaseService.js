import pool from '../config/database.js';
import { EntityFactory } from '../models/EntityFactory.js';

/**
 * Servicio base genérico para operaciones CRUD con MySQL
 */
export class BaseService {
  /**
   * @param {string} tableName - Nombre de la tabla en MySQL
   * @param {string} [entityType] - Nombre del modelo para EntityFactory
   */
  constructor(tableName, entityType = null) {
    this.tableName = tableName;
    this.entityType = entityType;
    this.db = pool;
  }

  /**
   * Ejecuta una consulta SQL personalizada
   * @param {string} sql 
   * @param {Array<any>} params 
   * @returns {Promise<Array<any>>}
   */
  async query(sql, params = []) {
    const [rows] = await this.db.query(sql, params);
    return rows;
  }

  /**
   * Ejecuta un comando SQL preparado (INSERT, UPDATE, DELETE)
   * @param {string} sql 
   * @param {Array<any>} params 
   * @returns {Promise<any>}
   */
  async execute(sql, params = []) {
    const [result] = await this.db.execute(sql, params);
    return result;
  }

  /**
   * Obtiene todos los registros de la tabla
   * @returns {Promise<Array<any>>}
   */
  async getAll() {
    const sql = `SELECT * FROM ${this.tableName}`;
    const [rows] = await this.db.query(sql);
    return rows;
  }

  /**
   * Obtiene un registro por su ID
   * @param {number|string} id 
   * @returns {Promise<any|null>}
   */
  async getById(id) {
    const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`;
    const [rows] = await this.db.execute(sql, [id]);
    if (rows.length === 0) return null;
    return rows[0];
  }

  /**
   * Inserta un nuevo registro en la base de datos
   * @param {Object} data 
   * @returns {Promise<{insertId: number}>}
   */
  async create(data) {
    const dbData = this._formatToDb(data);
    delete dbData.id;

    const columns = Object.keys(dbData);
    const placeholders = columns.map(() => '?').join(', ');
    const values = Object.values(dbData);

    const sql = `INSERT INTO ${this.tableName} (${columns.join(', ')}) VALUES (${placeholders})`;
    const [result] = await this.db.execute(sql, values);
    return { insertId: result.insertId };
  }

  /**
   * Actualiza un registro existente por ID
   * @param {number|string} id 
   * @param {Object} data 
   * @returns {Promise<{affectedRows: number, changedRows: number}>}
   */
  async update(id, data) {
    const dbData = this._formatToDb(data);
    delete dbData.id;

    const columns = Object.keys(dbData);
    if (columns.length === 0) return { affectedRows: 0, changedRows: 0 };

    const setClause = columns.map(col => `${col} = ?`).join(', ');
    const values = [...Object.values(dbData), id];

    const sql = `UPDATE ${this.tableName} SET ${setClause} WHERE id = ?`;
    const [result] = await this.db.execute(sql, values);
    return { affectedRows: result.affectedRows, changedRows: result.changedRows };
  }

  /**
   * Elimina un registro por ID
   * @param {number|string} id 
   * @returns {Promise<{affectedRows: number}>}
   */
  async delete(id) {
    const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
    const [result] = await this.db.execute(sql, [id]);
    return { affectedRows: result.affectedRows };
  }

  /**
   * Convierte objetos camelCase a snake_case para MySQL
   * @private
   */
  _formatToDb(data) {
    if (!data) return {};
    const raw = typeof data.toJSON === 'function' ? data.toJSON() : data;
    const result = {};

    for (const [key, value] of Object.entries(raw)) {
      if (key === 'fullName') continue; // Ignorar campos virtuales
      const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
      result[snakeKey] = value;
    }
    return result;
  }
}

export default BaseService;
