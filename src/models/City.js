import { BaseEntity } from './BaseEntity.js';

export class City extends BaseEntity {
  constructor(data = {}) {
    super(data.id);
    this.code = data.code || '';
    this.name = data.name || '';
  }
}

export default City;
