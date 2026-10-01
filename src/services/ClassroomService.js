import { BaseService } from './BaseService.js';

export class ClassroomService extends BaseService {
  constructor() {
    super('classrooms', 'Classroom');
  }

  async getActive() {
    const sql = 'SELECT * FROM classrooms WHERE active = 1';
    const [rows] = await this.db.query(sql);
    return rows;
  }

  async findByCode(code) {
    const sql = 'SELECT * FROM classrooms WHERE code = ?';
    const [rows] = await this.db.execute(sql, [code]);
    return rows[0] || null;
  }
}

export default ClassroomService;
