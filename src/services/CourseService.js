import { BaseService } from './BaseService.js';

export class CourseService extends BaseService {
  constructor() {
    super('courses', 'Course');
  }

  async getActive() {
    const sql = 'SELECT * FROM courses WHERE active = 1';
    const [rows] = await this.db.query(sql);
    return rows;
  }

  async findByCode(code) {
    const sql = 'SELECT * FROM courses WHERE code = ?';
    const [rows] = await this.db.execute(sql, [code]);
    return rows[0] || null;
  }
}

export default CourseService;
