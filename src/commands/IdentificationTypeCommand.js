import { BaseCommand } from './BaseCommand.js';
import { IdentificationTypeService } from '../services/IdentificationTypeService.js';
import { ask } from '../utils/readline.js';
import { validateRequired, validateLength } from '../utils/validators.js';

export class IdentificationTypeCommand extends BaseCommand {
  constructor() {
    super('GESTION DE TIPOS DE IDENTIFICACION', 'Tipo de Identificación', new IdentificationTypeService());
  }

  async promptCreateData() {
    const code = await ask('Código (ej. DPI, PAS)', validateLength('Código', 2, 6));
    const name = await ask('Nombre completo', validateRequired('Nombre'));
    const description = await ask('Descripción (opcional)');

    return { code, name, description };
  }

  async promptUpdateData(existing) {
    const code = await ask('Nuevo código', null, existing.code);
    const name = await ask('Nuevo nombre', null, existing.name);
    const description = await ask('Nueva descripción', null, existing.description);

    return { code, name, description };
  }
}

export default IdentificationTypeCommand;
