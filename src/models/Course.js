import { BaseEntity } from './BaseEntity.js';

export class Course extends BaseEntity {
  constructor(data = {}) {
    super(data.id);
    this.code = data.code || '';
    this.description = data.description || '';
    this.intensity = Number(data.intensity) || 0;
    this.weight = Number(data.weight) || 0;
    this.active = data.active !== undefined ? Number(data.active) : 1;
  }
}

export default Course;
