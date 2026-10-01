import { BaseService } from './BaseService.js';

export class CourseScheduleService extends BaseService {
  constructor() {
    super('courses_schedules', 'CourseSchedule');
  }

  async getDetailedSchedules() {
    const sql = `
      SELECT 
        cs.id AS schedule_id,
        co.code AS curso_codigo,
        co.description AS curso_nombre,
        CONCAT(t.first_name, ' ', t.last_name) AS profesor,
        cl.code AS aula,
        cs.start_date AS fecha_inicio,
        cs.end_date AS fecha_fin,
        IF(cs.active = 1, 'Activo', 'Inactivo') AS estado
      FROM courses_schedules cs
      INNER JOIN courses co ON cs.course_id = co.id
      INNER JOIN teachers t ON cs.teacher_id = t.id
      INNER JOIN classrooms cl ON cs.classroom_id = cl.id
    `;
    const [rows] = await this.db.query(sql);
    return rows;
  }

  async getActiveSchedules() {
    const sql = `
      SELECT 
        cs.id AS schedule_id,
        co.code AS curso_codigo,
        co.description AS curso_nombre,
        CONCAT(t.first_name, ' ', t.last_name) AS profesor,
        cl.code AS aula,
        cs.start_date,
        cs.end_date
      FROM courses_schedules cs
      INNER JOIN courses co ON cs.course_id = co.id
      INNER JOIN teachers t ON cs.teacher_id = t.id
      INNER JOIN classrooms cl ON cs.classroom_id = cl.id
      WHERE cs.active = 1
    `;
    const [rows] = await this.db.query(sql);
    return rows;
  }
}

export default CourseScheduleService;
