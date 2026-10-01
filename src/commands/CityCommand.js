import { BaseCommand } from './BaseCommand.js';
import { CityService } from '../services/CityService.js';
import { ask } from '../utils/readline.js';
import { validateRequired, validateLength } from '../utils/validators.js';

export class CityCommand extends BaseCommand {
  constructor() {
    super('GESTION DE CIUDADES', 'Ciudad', new CityService());
  }

  async promptCreateData() {
    const code = await ask('Código de la ciudad (ej. GUA1, MIX1)', validateLength('Código', 2, 10));
    const name = await ask('Nombre de la ciudad', validateRequired('Nombre'));

    return { code, name };
  }

  async promptUpdateData(existing) {
    const code = await ask('Nuevo código', null, existing.code);
    const name = await ask('Nuevo nombre', null, existing.name);

    return { code, name };
  }
}

export default CityCommand;
