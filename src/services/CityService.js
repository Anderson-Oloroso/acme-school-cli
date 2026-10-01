import { BaseService } from './BaseService.js';

export class CityService extends BaseService {
  constructor() {
    super('cities', 'City');
  }

  async findByCode(code) {
    const sql = 'SELECT * FROM cities WHERE code = ?';
    const [rows] = await this.db.execute(sql, [code]);
    return rows[0] || null;
  }
}

export default CityService;
