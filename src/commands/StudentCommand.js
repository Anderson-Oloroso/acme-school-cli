import { BaseCommand } from './BaseCommand.js';
import { StudentService } from '../services/StudentService.js';
import { IdentificationTypeService } from '../services/IdentificationTypeService.js';
import { CityService } from '../services/CityService.js';
import { ask } from '../utils/readline.js';
import { validateRequired, validateLength, validateEmail, validateInteger, validateDate } from '../utils/validators.js';

export class StudentCommand extends BaseCommand {
  constructor() {
    super('GESTION DE ESTUDIANTES', 'Estudiante', new StudentService());
    this.idTypeService = new IdentificationTypeService();
    this.cityService = new CityService();
  }

  async fetchListRecords() {
    return await this.service.getDetailedStudents();
  }

  async promptCreateData() {
    const types = await this.idTypeService.getAll();
    const cities = await this.cityService.getAll();

    if (types.length === 0 || cities.length === 0) {
      console.log('\nSe requiere al menos un tipo de identificación y una ciudad registrada antes de crear estudiantes.');
      return null;
    }

    const code = await ask('Código del estudiante (ej. EST002)', validateLength('Código', 2, 14));
    const firstName = await ask('Nombres', validateRequired('Nombres'));
    const lastName = await ask('Apellidos', validateRequired('Apellidos'));

    console.log('\nTipos de identificación:');
    types.forEach(t => console.log(`[ID: ${t.id}] ${t.code} - ${t.name}`));
    const identificationTypeId = await ask('\nID del tipo de documento', validateInteger('Tipo ID', 1));

    const identificationNumber = await ask('Número de documento / DPI', validateLength('Documento', 4, 20));
    const gender = await ask('Género (Masculino / Femenino / Otro)', validateRequired('Género'));
    const birthdate = await ask('Fecha de nacimiento (YYYY-MM-DD)', validateDate('Fecha de nacimiento'));
    const email = await ask('Correo electrónico', validateEmail);
    const address = await ask('Dirección residencial', validateRequired('Dirección'));

    console.log('\nCiudades disponibles:');
    cities.forEach(c => console.log(`[ID: ${c.id}] ${c.code} - ${c.name}`));
    const cityId = await ask('\nID de la ciudad', validateInteger('Ciudad ID', 1));

    return {
      code,
      firstName,
      lastName,
      identificationTypeId: Number(identificationTypeId),
      identificationNumber,
      gender,
      birthdate,
      email,
      address,
      cityId: Number(cityId)
    };
  }

  async promptUpdateData(existing) {
    const code = await ask('Nuevo código', null, existing.code);
    const firstName = await ask('Nuevos nombres', null, existing.first_name);
    const lastName = await ask('Nuevos apellidos', null, existing.last_name);
    const identificationTypeId = await ask('Nuevo ID de tipo de documento', null, existing.identification_type_id);
    const identificationNumber = await ask('Nuevo número de documento', null, existing.identification_number);
    const gender = await ask('Nuevo género', null, existing.gender);
    const birthdate = await ask('Nueva fecha de nacimiento (YYYY-MM-DD)', null, existing.birthdate ? existing.birthdate.split(' ')[0] : '');
    const email = await ask('Nuevo correo electrónico', validateEmail, existing.email);
    const address = await ask('Nueva dirección', null, existing.address);
    const cityId = await ask('Nuevo ID de ciudad', null, existing.city_id);

    return {
      code,
      firstName,
      lastName,
      identificationTypeId: Number(identificationTypeId),
      identificationNumber,
      gender,
      birthdate,
      email,
      address,
      cityId: Number(cityId)
    };
  }
}

export default StudentCommand;
