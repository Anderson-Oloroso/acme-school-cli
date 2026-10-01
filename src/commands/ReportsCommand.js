import pool from '../config/database.js';
import { clear, showHeader, showTable, showError } from '../utils/ui.js';
import { ask, pause } from '../utils/readline.js';

/**
 * Módulo de Consultas y Reportes Académicos (DQL)
 */
export class ReportsCommand {
  async execute() {
    while (true) {
      clear();
      showHeader('CONSULTAS Y REPORTES ACADEMICOS (DQL)');
      console.log('1. Estudiantes con su ciudad y tipo de documento');
      console.log('2. Oferta de cursos programados (con profesor y aula)');
      console.log('3. Estudiantes inscritos por curso');
      console.log('4. Temas pertenecientes a un curso específico');
      console.log('5. Calificaciones y notas de estudiantes por curso');
      console.log('0. Regresar al Menú Principal');

      const opt = await ask('-> Elija una opción');

      if (opt === '0') return;

      switch (opt) {
        case '1':
          await this.reportStudentsWithCityAndId();
          break;
        case '2':
          await this.reportScheduledCourses();
          break;
        case '3':
          await this.reportStudentsByCourse();
          break;
        case '4':
          await this.reportTopicsByCourse();
          break;
        case '5':
          await this.reportRatesWithCourseAndStudent();
          break;
        default:
          console.log('\nOpción inválida. Intente de nuevo.');
          await pause();
      }
    }
  }

  /**
   * 1. Consultar estudiantes con su ciudad y tipo de documento
   */
  async reportStudentsWithCityAndId() {
    clear();
    showHeader('REPORTE 1: ESTUDIANTES CON CIUDAD Y TIPO DE DOCUMENTO');
    try {
      const sql = `
        SELECT 
          s.code AS estudiante_codigo,
          CONCAT(s.first_name, ' ', s.last_name) AS nombre_completo,
          it.name AS tipo_documento,
          s.identification_number AS documento,
          c.name AS ciudad
        FROM students s
        INNER JOIN identification_types it ON s.identification_type_id = it.id
        INNER JOIN cities c ON s.city_id = c.id
      `;
      const [rows] = await pool.query(sql);
      showTable(rows);
    } catch (error) {
      showError(`Error al consultar reporte: ${error.message}`);
    }
    await pause();
  }

  /**
   * 2. Consultar la oferta de cursos programados con profesor y aula asignada
   */
  async reportScheduledCourses() {
    clear();
    showHeader('REPORTE 2: OFERTA DE CURSOS PROGRAMADOS');
    try {
      const sql = `
        SELECT 
          cs.id AS schedule_id,
          co.code AS curso_codigo,
          co.description AS curso_nombre,
          CONCAT(t.first_name, ' ', t.last_name) AS profesor,
          cl.code AS aula,
          cs.start_date AS fecha_inicio,
          cs.end_date AS fecha_fin
        FROM courses_schedules cs
        INNER JOIN courses co ON cs.course_id = co.id
        INNER JOIN teachers t ON cs.teacher_id = t.id
        INNER JOIN classrooms cl ON cs.classroom_id = cl.id
        WHERE cs.active = 1
      `;
      const [rows] = await pool.query(sql);
      showTable(rows);
    } catch (error) {
      showError(`Error al consultar reporte: ${error.message}`);
    }
    await pause();
  }

  /**
   * 3. Consultar la lista de estudiantes inscritos por cada curso
   */
  async reportStudentsByCourse() {
    clear();
    showHeader('REPORTE 3: ESTUDIANTES INSCRITOS POR CURSO');
    try {
      const sql = `
        SELECT 
          co.description AS curso,
          CONCAT(s.first_name, ' ', s.last_name) AS estudiante,
          i.register_date AS fecha_inscripcion
        FROM inscriptions i
        INNER JOIN courses_schedules cs ON i.course_schedule_id = cs.id
        INNER JOIN courses co ON cs.course_id = co.id
        INNER JOIN students s ON i.student_id = s.id
        WHERE i.active = 1
      `;
      const [rows] = await pool.query(sql);
      showTable(rows);
    } catch (error) {
      showError(`Error al consultar reporte: ${error.message}`);
    }
    await pause();
  }

  /**
   * 4. Consultar los temas pertenecientes a un curso específico
   */
  async reportTopicsByCourse() {
    clear();
    showHeader('REPORTE 4: TEMAS POR CURSO');
    try {
      const courseCode = await ask('Ingrese el código del curso a consultar (ej. CURS1)');
      const sql = `
        SELECT 
          co.code AS curso_codigo,
          co.description AS curso,
          tp.code AS tema_codigo,
          tp.title AS tema_titulo,
          tp.description AS tema_detalle
        FROM topics tp
        INNER JOIN courses co ON tp.course_id = co.id
        WHERE tp.active = 1
        AND co.code = ?
      `;
      const [rows] = await pool.execute(sql, [courseCode]);
      if (rows.length === 0) {
        console.log(`\nNo se encontraron temas para el curso "${courseCode}".`);
      } else {
        showTable(rows);
      }
    } catch (error) {
      showError(`Error al consultar reporte: ${error.message}`);
    }
    await pause();
  }

  /**
   * 5. Consultar las notas/calificaciones de cada estudiante con el nombre del curso
   */
  async reportRatesWithCourseAndStudent() {
    clear();
    showHeader('REPORTE 5: NOTAS Y CALIFICACIONES');
    try {
      const sql = `
        SELECT 
          CONCAT(s.first_name, ' ', s.last_name) AS estudiante,
          co.description AS curso,
          r.rate AS calificacion,
          r.comments AS observaciones
        FROM rates r
        INNER JOIN inscriptions i ON r.inscription_id = i.id
        INNER JOIN students s ON i.student_id = s.id
        INNER JOIN courses_schedules cs ON i.course_schedule_id = cs.id
        INNER JOIN courses co ON cs.course_id = co.id
      `;
      const [rows] = await pool.query(sql);
      showTable(rows);
    } catch (error) {
      showError(`Error al consultar reporte: ${error.message}`);
    }
    await pause();
  }
}

export default ReportsCommand;
