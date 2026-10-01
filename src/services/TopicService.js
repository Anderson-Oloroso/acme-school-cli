import { BaseService } from './BaseService.js';

export class TopicService extends BaseService {
  constructor() {
    super('topics', 'Topic');
  }

  async getByCourseId(courseId) {
    const sql = `
      SELECT 
        tp.id,
        tp.code AS tema_codigo,
        tp.title AS tema_titulo,
        tp.description AS tema_detalle,
        tp.active,
        co.code AS curso_codigo,
        co.description AS curso_nombre
      FROM topics tp
      INNER JOIN courses co ON tp.course_id = co.id
      WHERE tp.course_id = ?
    `;
    const [rows] = await this.db.execute(sql, [courseId]);
    return rows;
  }

  async getTopicsWithCourseDetails() {
    const sql = `
      SELECT 
        tp.id,
        co.code AS curso_codigo,
        co.description AS curso_nombre,
        tp.code AS tema_codigo,
        tp.title AS tema_titulo,
        tp.description AS tema_detalle,
        IF(tp.active = 1, 'Activo', 'Inactivo') AS estado
      FROM topics tp
      INNER JOIN courses co ON tp.course_id = co.id
    `;
    const [rows] = await this.db.query(sql);
    return rows;
  }
}

export default TopicService;
