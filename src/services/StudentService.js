import { BaseService } from './BaseService.js';

export class StudentService extends BaseService {
  constructor() {
    super('students', 'Student');
  }

  async getDetailedStudents() {
    const sql = `
      SELECT 
        s.id,
        s.code AS estudiante_codigo,
        CONCAT(s.first_name, ' ', s.last_name) AS nombre_completo,
        it.name AS tipo_documento,
        s.identification_number AS documento,
        s.gender AS genero,
        s.birthdate AS fecha_nacimiento,
        s.email,
        s.address AS direccion,
        c.name AS ciudad
      FROM students s
      INNER JOIN identification_types it ON s.identification_type_id = it.id
      INNER JOIN cities c ON s.city_id = c.id
    `;
    const [rows] = await this.db.query(sql);
    return rows;
  }

  async findByCode(code) {
    const sql = 'SELECT * FROM students WHERE code = ?';
    const [rows] = await this.db.execute(sql, [code]);
    return rows[0] || null;
  }

  async findByIdentification(doc) {
    const sql = 'SELECT * FROM students WHERE identification_number = ?';
    const [rows] = await this.db.execute(sql, [doc]);
    return rows[0] || null;
  }

  async findByEmail(email) {
    const sql = 'SELECT * FROM students WHERE email = ?';
    const [rows] = await this.db.execute(sql, [email]);
    return rows[0] || null;
  }
}

export default StudentService;
