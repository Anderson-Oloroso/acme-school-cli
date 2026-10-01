import { BaseCommand } from './BaseCommand.js';
import { CourseService } from '../services/CourseService.js';
import { ask } from '../utils/readline.js';
import { validateRequired, validateLength, validateInteger, validateActive } from '../utils/validators.js';

export class CourseCommand extends BaseCommand {
  constructor() {
    super('GESTION DE CURSOS', 'Curso', new CourseService());
  }

  async promptCreateData() {
    const code = await ask('Código del curso (ej. CURS1)', validateLength('Código', 2, 10));
    const description = await ask('Nombre / Descripción del curso', validateRequired('Descripción'));
    const intensity = await ask('Intensidad horaria (horas)', validateInteger('Intensidad', 1, 1000));
    const weight = await ask('Peso o créditos', validateInteger('Peso', 1, 100));
    const active = await ask('Estado (1: Activo, 0: Inactivo)', validateActive, '1');

    return {
      code,
      description,
      intensity: Number(intensity),
      weight: Number(weight),
      active: Number(active)
    };
  }

  async promptUpdateData(existing) {
    const code = await ask('Nuevo código', null, existing.code);
    const description = await ask('Nueva descripción', null, existing.description);
    const intensity = await ask('Nueva intensidad', validateInteger('Intensidad', 1, 1000), existing.intensity);
    const weight = await ask('Nuevo peso', validateInteger('Peso', 1, 100), existing.weight);
    const active = await ask('Nuevo estado (1: Activo, 0: Inactivo)', validateActive, existing.active);

    return {
      code,
      description,
      intensity: Number(intensity),
      weight: Number(weight),
      active: Number(active)
    };
  }
}

export default CourseCommand;
