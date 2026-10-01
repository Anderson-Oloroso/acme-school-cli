import { BaseCommand } from './BaseCommand.js';
import { RateService } from '../services/RateService.js';
import { InscriptionService } from '../services/InscriptionService.js';
import { ask } from '../utils/readline.js';
import { validateInteger, validateDecimal } from '../utils/validators.js';

export class RateCommand extends BaseCommand {
  constructor() {
    super('GESTION DE CALIFICACIONES Y NOTAS', 'Calificación', new RateService());
    this.inscriptionService = new InscriptionService();
  }

  async fetchListRecords() {
    return await this.service.getDetailedRates();
  }

  async promptCreateData() {
    const inscriptions = await this.inscriptionService.getActiveInscriptions();
    if (inscriptions.length === 0) {
      console.log('\nNo hay inscripciones activas registradas para calificar.');
      return null;
    }

    console.log('\n--- Inscripciones disponibles ---');
    inscriptions.forEach(i => console.log(`[ID: ${i.inscripcion_id}] Estudiante: ${i.estudiante} | Curso: ${i.curso}`));
    const inscriptionId = await ask('\nID de la inscripción a calificar', validateInteger('ID de Inscripción', 1));

    const rate = await ask('Nota / Calificación (0.00 a 100.00)', validateDecimal('Nota', 0, 100));
    const comments = await ask('Observaciones / Comentarios');

    return {
      inscriptionId: Number(inscriptionId),
      rate: Number(rate),
      comments
    };
  }

  async promptUpdateData(existing) {
    const inscriptionId = await ask('Nuevo ID de inscripción', validateInteger('ID de Inscripción', 1), existing.inscription_id);
    const rate = await ask('Nueva nota / calificación (0.00 a 100.00)', validateDecimal('Nota', 0, 100), existing.rate);
    const comments = await ask('Nuevas observaciones', null, existing.comments);

    return {
      inscriptionId: Number(inscriptionId),
      rate: Number(rate),
      comments
    };
  }
}

export default RateCommand;
