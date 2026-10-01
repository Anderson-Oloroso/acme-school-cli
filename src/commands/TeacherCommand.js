import { BaseCommand } from './BaseCommand.js';
import { TeacherService } from '../services/TeacherService.js';
import { IdentificationTypeService } from '../services/IdentificationTypeService.js';
import { ask } from '../utils/readline.js';
import { validateRequired, validateLength, validateEmail, validateInteger } from '../utils/validators.js';

export class TeacherCommand extends BaseCommand {
  constructor() {
    super('GESTION DE DOCENTES', 'Docente', new TeacherService());
    this.idTypeService = new IdentificationTypeService();
  }

  async fetchListRecords() {
    return await this.service.getDetailedTeachers();
  }

  async promptCreateData() {
    const types = await this.idTypeService.getAll();
    if (types.length === 0) {
      console.log('\nDebe registrar al menos un tipo de identificación antes de crear docentes.');
      return null;
    }

    const firstName = await ask('Nombres', validateRequired('Nombres'));
    const lastName = await ask('Apellidos', validateRequired('Apellidos'));

    console.log('\nTipos de identificación:');
    types.forEach(t => console.log(`[ID: ${t.id}] ${t.code} - ${t.name}`));
    const identificationTypeId = await ask('\nID del tipo de identificación', validateInteger('Tipo ID', 1));

    const identificationNumber = await ask('Número de documento / DPI', validateLength('Documento', 4, 20));
    const email = await ask('Correo electrónico', validateEmail);

    return {
      firstName,
      lastName,
      identificationTypeId: Number(identificationTypeId),
      identificationNumber,
      email
    };
  }

  async promptUpdateData(existing) {
    const firstName = await ask('Nuevos nombres', null, existing.first_name);
    const lastName = await ask('Nuevos apellidos', null, existing.last_name);
    const identificationTypeId = await ask('Nuevo ID de tipo de documento', null, existing.identification_type_id);
    const identificationNumber = await ask('Nuevo número de documento', null, existing.identification_number);
    const email = await ask('Nuevo correo electrónico', validateEmail, existing.email);

    return {
      firstName,
      lastName,
      identificationTypeId: Number(identificationTypeId),
      identificationNumber,
      email
    };
  }
}

export default TeacherCommand;
