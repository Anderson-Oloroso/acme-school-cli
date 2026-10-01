import { BaseService } from './BaseService.js';

export class IdentificationTypeService extends BaseService {
  constructor() {
    super('identification_types', 'IdentificationType');
  }

  async findByCode(code) {
    const sql = 'SELECT * FROM identification_types WHERE code = ?';
    const [rows] = await this.db.execute(sql, [code]);
    return rows[0] || null;
  }
}

export default IdentificationTypeService;
