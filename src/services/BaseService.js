import connection from '../config/database.js';
import { EntityFactory } from '../models/EntityFactory.js';

export class BaseService {
  constructor(tableName, entityType = null) {
    this.tableName = tableName;
    this.entityType = entityType;
    this.db = connection;
  }

  async query(sql, params = []) {
    const [rows] = await this.db.query(sql, params);
    return rows;
  }

  async execute(sql, params = []) {
    const [result] = await this.db.execute(sql, params);
    return result;
  }

  async getAll() {
    const sql = `SELECT * FROM ${this.tableName}`;
    const [rows] = await this.db.query(sql);
    return rows;
  }

  async getById(id) {
    const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`;
    const [rows] = await this.db.execute(sql, [id]);
    if (rows.length === 0) return null;
    return rows[0];
  }

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

  async delete(id) {
    const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
    const [result] = await this.db.execute(sql, [id]);
    return { affectedRows: result.affectedRows };
  }

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
