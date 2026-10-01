import { BaseCommand } from './BaseCommand.js';
import { InscriptionService } from '../services/InscriptionService.js';
import { CourseScheduleService } from '../services/CourseScheduleService.js';
import { StudentService } from '../services/StudentService.js';
import { ask } from '../utils/readline.js';
import { validateInteger, validateActive } from '../utils/validators.js';

export class InscriptionCommand extends BaseCommand {
  constructor() {
    super('GESTION DE INSCRIPCIONES', 'Inscripción', new InscriptionService());
    this.scheduleService = new CourseScheduleService();
    this.studentService = new StudentService();
  }

  async fetchListRecords() {
    return await this.service.getDetailedInscriptions();
  }

  async promptCreateData() {
    const schedules = await this.scheduleService.getActiveSchedules();
    const students = await this.studentService.getAll();

    if (schedules.length === 0 || students.length === 0) {
      console.log('\nSe requiere que existan horarios activos y estudiantes registrados.');
      return null;
    }

    console.log('\n--- Horarios de cursos activos ---');
    schedules.forEach(s => console.log(`[ID: ${s.schedule_id}] Curso: ${s.curso_nombre} | Prof: ${s.profesor} | Aula: ${s.aula}`));
    const courseScheduleId = await ask('\nID del horario a inscribir', validateInteger('ID de Horario', 1));

    console.log('\n--- Estudiantes registrados ---');
    students.forEach(st => console.log(`[ID: ${st.id}] ${st.code} - ${st.first_name} ${st.last_name}`));
    const studentId = await ask('\nID del estudiante', validateInteger('ID de Estudiante', 1));

    const active = await ask('Estado (1: Activo, 0: Inactivo)', validateActive, '1');

    return {
      courseScheduleId: Number(courseScheduleId),
      studentId: Number(studentId),
      active: Number(active)
    };
  }

  async promptUpdateData(existing) {
    const courseScheduleId = await ask('Nuevo ID del horario', validateInteger('ID Horario', 1), existing.course_schedule_id);
    const studentId = await ask('Nuevo ID del estudiante', validateInteger('ID Estudiante', 1), existing.student_id);
    const active = await ask('Nuevo estado (1: Activo, 0: Inactivo)', validateActive, existing.active);

    return {
      courseScheduleId: Number(courseScheduleId),
      studentId: Number(studentId),
      active: Number(active)
    };
  }
}

export default InscriptionCommand;
