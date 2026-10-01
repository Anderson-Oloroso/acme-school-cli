import { BaseService } from './BaseService.js';

export class InscriptionService extends BaseService {
  constructor() {
    super('inscriptions', 'Inscription');
  }

  async getDetailedInscriptions() {
    const sql = `
      SELECT 
        i.id AS inscripcion_id,
        co.description AS curso,
        CONCAT(s.first_name, ' ', s.last_name) AS estudiante,
        s.code AS estudiante_codigo,
        i.register_date AS fecha_inscripcion,
        IF(i.active = 1, 'Activo', 'Inactivo') AS estado
      FROM inscriptions i
      INNER JOIN courses_schedules cs ON i.course_schedule_id = cs.id
      INNER JOIN courses co ON cs.course_id = co.id
      INNER JOIN students s ON i.student_id = s.id
    `;
    const [rows] = await this.db.query(sql);
    return rows;
  }

  async getActiveInscriptions() {
    const sql = `
      SELECT 
        i.id AS inscripcion_id,
        co.description AS curso,
        CONCAT(s.first_name, ' ', s.last_name) AS estudiante,
        i.register_date AS fecha_inscripcion
      FROM inscriptions i
      INNER JOIN courses_schedules cs ON i.course_schedule_id = cs.id
      INNER JOIN courses co ON cs.course_id = co.id
      INNER JOIN students s ON i.student_id = s.id
      WHERE i.active = 1
    `;
    const [rows] = await this.db.query(sql);
    return rows;
  }
}

export default InscriptionService;
