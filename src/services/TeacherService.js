import { BaseService } from './BaseService.js';

export class TeacherService extends BaseService {
  constructor() {
    super('teachers', 'Teacher');
  }

  async getDetailedTeachers() {
    const sql = `
      SELECT 
        t.id,
        CONCAT(t.first_name, ' ', t.last_name) AS nombre_completo,
        it.name AS tipo_documento,
        t.identification_number AS documento,
        t.email
      FROM teachers t
      INNER JOIN identification_types it ON t.identification_type_id = it.id
    `;
    const [rows] = await this.db.query(sql);
    return rows;
  }

  async findByIdentification(doc) {
    const sql = 'SELECT * FROM teachers WHERE identification_number = ?';
    const [rows] = await this.db.execute(sql, [doc]);
    return rows[0] || null;
  }

  async findByEmail(email) {
    const sql = 'SELECT * FROM teachers WHERE email = ?';
    const [rows] = await this.db.execute(sql, [email]);
    return rows[0] || null;
  }
}

export default TeacherService;
