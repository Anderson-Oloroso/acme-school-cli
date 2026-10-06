import { BaseCommand } from './BaseCommand.js';
import { TopicService } from '../services/TopicService.js';
import { CourseService } from '../services/CourseService.js';
import { ask } from '../utils/readline.js';
import { validateRequired, validateLength, validateInteger, validateActive } from '../utils/validators.js';

export class TopicCommand extends BaseCommand {
  constructor() {
    super('GESTION DE TEMAS', 'Tema', new TopicService());
    this.courseService = new CourseService();
  }

  async fetchListRecords() {
    return await this.service.getTopicsWithCourseDetails();
  }

  async promptCreateData() {
    const courses = await this.courseService.getActive();
    if (courses.length === 0) {
      console.log('\nNo hay cursos activos disponibles. Cree un curso primero.');
      return null;
    }

    console.log('\nCursos disponibles:');
    courses.forEach(c => console.log(`[ID: ${c.id}] ${c.code} - ${c.description}`));

    const course_id = await ask('\nID del curso al que pertenece el tema', validateInteger('ID de Curso', 1));
    const code = await ask('Código del tema (ej. TEMA1)', validateLength('Código', 2, 10));
    const title = await ask('Título del tema', validateRequired('Título'));
    const description = await ask('Descripción o detalle del tema');
    const active = await ask('Estado (1: Activo, 0: Inactivo)', validateActive, '1');

    return {
      course_id: Number(course_id),
      code,
      title,
      description,
      active: Number(active)
    };
  }

  async promptUpdateData(existing) {
    const course_id = await ask('Nuevo ID del curso', validateInteger('ID de Curso', 1), existing.course_id);
    const code = await ask('Nuevo código del tema', null, existing.code);
    const title = await ask('Nuevo título', null, existing.title);
    const description = await ask('Nueva descripción', null, existing.description);
    const active = await ask('Nuevo estado (1: Activo, 0: Inactivo)', validateActive, existing.active);

    return {
      course_id: Number(course_id),
      code,
      title,
      description,
      active: Number(active)
    };
  }
}

export default TopicCommand;
