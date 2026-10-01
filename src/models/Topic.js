import { BaseEntity } from './BaseEntity.js';

export class Topic extends BaseEntity {
  constructor(data = {}) {
    super(data.id);
    this.courseId = Number(data.courseId || data.course_id) || null;
    this.code = data.code || '';
    this.title = data.title || '';
    this.description = data.description || '';
    this.active = data.active !== undefined ? Number(data.active) : 1;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      courseId: this.courseId,
      code: this.code,
      title: this.title,
      description: this.description,
      active: this.active
    };
  }
}

export default Topic;
