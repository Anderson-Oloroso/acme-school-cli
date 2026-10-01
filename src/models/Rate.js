import { BaseEntity } from './BaseEntity.js';

export class Rate extends BaseEntity {
  constructor(data = {}) {
    super(data.id);
    this.inscriptionId = Number(data.inscriptionId || data.inscription_id) || null;
    this.rate = Number(data.rate) || 0;
    this.comments = data.comments || '';
  }

  toJSON() {
    return {
      ...super.toJSON(),
      inscriptionId: this.inscriptionId,
      rate: this.rate,
      comments: this.comments
    };
  }
}

export default Rate;
