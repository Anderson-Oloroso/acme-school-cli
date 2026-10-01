import { BaseService } from './BaseService.js';

export class RateService extends BaseService {
  constructor() {
    super('rates', 'Rate');
  }

  async getDetailedRates() {
    const sql = `
      SELECT 
        r.id AS rate_id,
        CONCAT(s.first_name, ' ', s.last_name) AS estudiante,
        s.code AS estudiante_codigo,
        co.description AS curso,
        r.rate AS calificacion,
        r.comments AS observaciones
      FROM rates r
      INNER JOIN inscriptions i ON r.inscription_id = i.id
      INNER JOIN students s ON i.student_id = s.id
      INNER JOIN courses_schedules cs ON i.course_schedule_id = cs.id
      INNER JOIN courses co ON cs.course_id = co.id
    `;
    const [rows] = await this.db.query(sql);
    return rows;
  }
}

export default RateService;
