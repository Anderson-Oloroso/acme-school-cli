import { BaseEntity } from './BaseEntity.js';

export class IdentificationType extends BaseEntity {
  constructor(data = {}) {
    super(data.id);
    this.code = data.code || '';
    this.name = data.name || '';
    this.description = data.description || '';
  }

  toJSON() {
    return {
      ...super.toJSON(),
      code: this.code,
      name: this.name,
      description: this.description
    };
  }
}

export default IdentificationType;
