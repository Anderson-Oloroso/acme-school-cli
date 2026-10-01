import { BaseCommand } from './BaseCommand.js';
import { ClassroomService } from '../services/ClassroomService.js';
import { ask } from '../utils/readline.js';
import { validateRequired, validateLength, validateInteger, validateActive } from '../utils/validators.js';

export class ClassroomCommand extends BaseCommand {
  constructor() {
    super('GESTION DE AULAS', 'Aula', new ClassroomService());
  }

  async promptCreateData() {
    const code = await ask('Código del aula (ej. AULA1)', validateLength('Código', 2, 10));
    const description = await ask('Descripción o ubicación');
    const capacity = await ask('Capacidad máxima', validateInteger('Capacidad', 1, 500));
    const active = await ask('Estado (1: Activo, 0: Inactivo)', validateActive, '1');

    return { code, description, capacity: Number(capacity), active: Number(active) };
  }

  async promptUpdateData(existing) {
    const code = await ask('Nuevo código', null, existing.code);
    const description = await ask('Nueva descripción', null, existing.description);
    const capacity = await ask('Nueva capacidad', validateInteger('Capacidad', 1, 500), existing.capacity);
    const active = await ask('Nuevo estado (1: Activo, 0: Inactivo)', validateActive, existing.active);

    return { code, description, capacity: Number(capacity), active: Number(active) };
  }
}

export default ClassroomCommand;
