import { getDbConnection } from '../config/database.js';
import { clear, showHeader, showTable, showSuccess, showError } from '../utils/ui.js';
import { ask, pause, confirm } from '../utils/readline.js';
import { HTMLReportService } from '../services/HTMLReportService.js';
import { StudentService } from '../services/StudentService.js';
import { TeacherService } from '../services/TeacherService.js';
import { CourseScheduleService } from '../services/CourseScheduleService.js';
import { InscriptionService } from '../services/InscriptionService.js';
import { TopicService } from '../services/TopicService.js';

// Modulo de Consultas y Reportes Academicos (DQL) con exportacion a HTML
export class ReportsCommand {
  constructor() {
    this.htmlService = new HTMLReportService();
    this.studentService = new StudentService();
    this.teacherService = new TeacherService();
    this.scheduleService = new CourseScheduleService();
    this.inscriptionService = new InscriptionService();
    this.topicService = new TopicService();
  }

  get db() {
    return getDbConnection();
  }

  async execute() {
    while (true) {
      clear();
      showHeader('CONSULTAS Y REPORTES ACADEMICOS (DQL)');
      console.log('1. Lista de Estudiantes (con ciudad y tipo de documento)');
      console.log('2. Lista de Profesores / Docentes');
      console.log('3. Horarios por curso (con profesor y aula)');
      console.log('4. Estudiantes inscritos por curso');
      console.log('5. Temas pertenecientes a un curso');
      console.log('6. Calificaciones y notas de estudiantes por curso');
      console.log('7. [HTML] Generar TODOS los reportes en archivos HTML');
      console.log('0. Regresar al Menú Principal');

      const opt = await ask('-> Elija una opción');

      if (opt === '0') return;

      switch (opt) {
        case '1':
          await this.reportStudents();
          break;
        case '2':
          await this.reportTeachers();
          break;
        case '3':
          await this.reportSchedulesByCourse();
          break;
        case '4':
          await this.reportStudentsByCourse();
          break;
        case '5':
          await this.reportTopicsByCourse();
          break;
        case '6':
          await this.reportRatesWithCourseAndStudent();
          break;
        case '7':
          await this.generateAllHtmlReports();
          break;
        default:
          console.log('\nOpción inválida. Intente de nuevo.');
          await pause();
      }
    }
  }

  // 1. Reporte de estudiantes
  async reportStudents() {
    clear();
    showHeader('REPORTE 1: LISTA DE ESTUDIANTES');
    try {
      const rows = await this.studentService.getDetailedStudents();
      showTable(rows);

      if (rows.length > 0 && await confirm('\n¿Desea generar el reporte en un archivo HTML?')) {
        const filePath = await this.htmlService.generarReporteEstudiantes(rows);
        showSuccess(`Reporte HTML generado exitosamente en:\n${filePath}`);
      }
    } catch (error) {
      showError(`Error al consultar estudiantes: ${error.message}`);
    }
    await pause();
  }

  // 2. Reporte de profesores
  async reportTeachers() {
    clear();
    showHeader('REPORTE 2: LISTA DE PROFESORES');
    try {
      const rows = await this.teacherService.getDetailedTeachers();
      showTable(rows);

      if (rows.length > 0 && await confirm('\n¿Desea generar el reporte en un archivo HTML?')) {
        const filePath = await this.htmlService.generarReporteProfesores(rows);
        showSuccess(`Reporte HTML generado exitosamente en:\n${filePath}`);
      }
    } catch (error) {
      showError(`Error al consultar profesores: ${error.message}`);
    }
    await pause();
  }

  // 3. Reporte de horarios por curso
  async reportSchedulesByCourse() {
    clear();
    showHeader('REPORTE 3: HORARIOS POR CURSO');
    try {
      const rows = await this.scheduleService.getDetailedSchedules();
      showTable(rows);

      if (rows.length > 0 && await confirm('\n¿Desea generar el reporte en un archivo HTML?')) {
        const filePath = await this.htmlService.generarReporteHorariosPorCurso(rows);
        showSuccess(`Reporte HTML generado exitosamente en:\n${filePath}`);
      }
    } catch (error) {
      showError(`Error al consultar horarios: ${error.message}`);
    }
    await pause();
  }

  // 4. Reporte de estudiantes por cursos
  async reportStudentsByCourse() {
    clear();
    showHeader('REPORTE 4: ESTUDIANTES POR CURSOS');
    try {
      const rows = await this.inscriptionService.getDetailedInscriptions();
      showTable(rows);

      if (rows.length > 0 && await confirm('\n¿Desea generar el reporte en un archivo HTML?')) {
        const filePath = await this.htmlService.generarReporteEstudiantesPorCurso(rows);
        showSuccess(`Reporte HTML generado exitosamente en:\n${filePath}`);
      }
    } catch (error) {
      showError(`Error al consultar estudiantes por curso: ${error.message}`);
    }
    await pause();
  }

  // 5. Reporte de temas de un curso
  async reportTopicsByCourse() {
    clear();
    showHeader('REPORTE 5: TEMAS DE UN CURSO');
    try {
      const courseCode = await ask('Ingrese el código del curso (ej. CURS1, o presione ENTER para ver todos)');
      let rows;
      if (courseCode) {
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
          WHERE co.code = ?
        `;
        const [result] = await this.db.execute(sql, [courseCode]);
        rows = result;
      } else {
        rows = await this.topicService.getTopicsWithCourseDetails();
      }

      showTable(rows);

      if (rows.length > 0 && await confirm('\n¿Desea generar el reporte en un archivo HTML?')) {
        const filePath = await this.htmlService.generarReporteTemasPorCurso(rows, courseCode);
        showSuccess(`Reporte HTML generado exitosamente en:\n${filePath}`);
      }
    } catch (error) {
      showError(`Error al consultar temas: ${error.message}`);
    }
    await pause();
  }

  // 6. Reporte de calificaciones y notas
  async reportRatesWithCourseAndStudent() {
    clear();
    showHeader('REPORTE 6: CALIFICACIONES Y NOTAS');
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
      const [rows] = await this.db.query(sql);
      showTable(rows);
    } catch (error) {
      showError(`Error al consultar calificaciones: ${error.message}`);
    }
    await pause();
  }

  // 7. Generar todos los reportes HTML
  async generateAllHtmlReports() {
    clear();
    showHeader('GENERACION COMPLETA DE REPORTES HTML');
    try {
      console.log('Generando archivos HTML en la carpeta "reports/"...\n');

      const estudiantes = await this.studentService.getDetailedStudents();
      const p1 = await this.htmlService.generarReporteEstudiantes(estudiantes);
      console.log(`✔ Reporte de Estudiantes: ${p1}`);

      const profesores = await this.teacherService.getDetailedTeachers();
      const p2 = await this.htmlService.generarReporteProfesores(profesores);
      console.log(`✔ Reporte de Profesores: ${p2}`);

      const horarios = await this.scheduleService.getDetailedSchedules();
      const p3 = await this.htmlService.generarReporteHorariosPorCurso(horarios);
      console.log(`✔ Reporte de Horarios por Curso: ${p3}`);

      const inscripciones = await this.inscriptionService.getDetailedInscriptions();
      const p4 = await this.htmlService.generarReporteEstudiantesPorCurso(inscripciones);
      console.log(`✔ Reporte de Estudiantes por Cursos: ${p4}`);

      const temas = await this.topicService.getTopicsWithCourseDetails();
      const p5 = await this.htmlService.generarReporteTemasPorCurso(temas);
      console.log(`✔ Reporte de Temas de Cursos: ${p5}`);

      showSuccess('\n¡Todos los reportes HTML han sido generados con éxito!');
    } catch (error) {
      showError(`Error al generar reportes HTML: ${error.message}`);
    }
    await pause();
  }
}

export default ReportsCommand;
