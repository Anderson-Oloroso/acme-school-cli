import { BaseEntity } from './BaseEntity.js';

export class Classroom extends BaseEntity {
  constructor(data = {}) {
    super(data.id);
    this.code = data.code || '';
    this.description = data.description || '';
    this.capacity = Number(data.capacity) || 0;
    this.active = data.active !== undefined ? Number(data.active) : 1;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      code: this.code,
      description: this.description,
      capacity: this.capacity,
      active: this.active
    };
  }
}

export default Classroom;
