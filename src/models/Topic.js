import { BaseEntity } from './BaseEntity.js';

export class Topic extends BaseEntity {
  constructor(data = {}) {
    super(data.id);
    this.course_id = data.course_id || null;
    this.code = data.code || '';
    this.title = data.title || '';
    this.description = data.description || '';
    this.active = data.active !== undefined ? Number(data.active) : 1;
  }
}

export default Topic;
