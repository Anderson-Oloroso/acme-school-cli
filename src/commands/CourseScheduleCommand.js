import { BaseCommand } from './BaseCommand.js';
import { CourseScheduleService } from '../services/CourseScheduleService.js';
import { CourseService } from '../services/CourseService.js';
import { TeacherService } from '../services/TeacherService.js';
import { ClassroomService } from '../services/ClassroomService.js';
import { ask } from '../utils/readline.js';
import { validateInteger, validateDate, validateActive } from '../utils/validators.js';

export class CourseScheduleCommand extends BaseCommand {
  constructor() {
    super('GESTION DE HORARIOS Y PROGRAMACION', 'Horario', new CourseScheduleService());
    this.courseService = new CourseService();
    this.teacherService = new TeacherService();
    this.classroomService = new ClassroomService();
  }

  async fetchListRecords() {
    return await this.service.getDetailedSchedules();
  }

  async promptCreateData() {
    const courses = await this.courseService.getActive();
    const teachers = await this.teacherService.getAll();
    const classrooms = await this.classroomService.getActive();

    if (courses.length === 0 || teachers.length === 0 || classrooms.length === 0) {
      console.log('\nSe requiere que existan cursos activos, docentes y aulas activas para programar horarios.');
      return null;
    }

    console.log('\n--- Cursos disponibles ---');
    courses.forEach(c => console.log(`[ID: ${c.id}] ${c.code} - ${c.description}`));
    const course_id = await ask('\nID del curso', validateInteger('ID de Curso', 1));

    console.log('\n--- Docentes disponibles ---');
    teachers.forEach(t => console.log(`[ID: ${t.id}] ${t.first_name} ${t.last_name}`));
    const teacher_id = await ask('\nID del docente', validateInteger('ID de Docente', 1));

    console.log('\n--- Aulas disponibles ---');
    classrooms.forEach(cl => console.log(`[ID: ${cl.id}] ${cl.code} (Capacidad: ${cl.capacity})`));
    const classroom_id = await ask('\nID del aula', validateInteger('ID de Aula', 1));

    const start_date = await ask('Fecha y hora de inicio (YYYY-MM-DD HH:mm:ss)', validateDate('Fecha de inicio'));
    const end_date = await ask('Fecha y hora de finalización (YYYY-MM-DD HH:mm:ss)', validateDate('Fecha de fin'));
    const active = await ask('Estado (1: Activo, 0: Inactivo)', validateActive, '1');

    return {
      course_id: Number(course_id),
      teacher_id: Number(teacher_id),
      classroom_id: Number(classroom_id),
      start_date,
      end_date,
      active: Number(active)
    };
  }

  async promptUpdateData(existing) {
    const course_id = await ask('Nuevo ID del curso', validateInteger('ID de Curso', 1), existing.course_id);
    const teacher_id = await ask('Nuevo ID del docente', validateInteger('ID de Docente', 1), existing.teacher_id);
    const classroom_id = await ask('Nuevo ID del aula', validateInteger('ID de Aula', 1), existing.classroom_id);
    const start_date = await ask('Nueva fecha de inicio (YYYY-MM-DD HH:mm:ss)', validateDate('Fecha de inicio'), existing.start_date);
    const end_date = await ask('Nueva fecha de fin (YYYY-MM-DD HH:mm:ss)', validateDate('Fecha de fin'), existing.end_date);
    const active = await ask('Nuevo estado (1: Activo, 0: Inactivo)', validateActive, existing.active);

    return {
      course_id: Number(course_id),
      teacher_id: Number(teacher_id),
      classroom_id: Number(classroom_id),
      start_date,
      end_date,
      active: Number(active)
    };
  }
}

export default CourseScheduleCommand;
