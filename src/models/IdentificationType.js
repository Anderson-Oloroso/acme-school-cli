import { BaseEntity } from './BaseEntity.js';

export class IdentificationType extends BaseEntity {
  constructor(data = {}) {
    super(data.id);
    this.code = data.code || '';
    this.name = data.name || '';
    this.description = data.description || '';
  }
}

export default IdentificationType;
