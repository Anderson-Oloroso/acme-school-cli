import { BaseEntity } from './BaseEntity.js';

export class Classroom extends BaseEntity {
  constructor(data = {}) {
    super(data.id);
    this.code = data.code || '';
    this.description = data.description || '';
    this.capacity = Number(data.capacity) || 0;
    this.active = data.active !== undefined ? Number(data.active) : 1;
  }
}

export default Classroom;
