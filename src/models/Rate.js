import { BaseEntity } from './BaseEntity.js';

export class Rate extends BaseEntity {
  constructor(data = {}) {
    super(data.id);
    this.inscription_id = data.inscription_id || null;
    this.rate = Number(data.rate) || 0;
    this.comments = data.comments || '';
  }
}

export default Rate;
