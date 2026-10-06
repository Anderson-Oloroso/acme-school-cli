import { BaseEntity } from './BaseEntity.js';

export class Inscription extends BaseEntity {
  constructor(data = {}) {
    super(data.id);
    this.course_schedule_id = data.course_schedule_id || null;
    this.student_id = data.student_id || null;
    this.register_date = data.register_date || '';
    this.active = data.active !== undefined ? Number(data.active) : 1;
  }
}

export default Inscription;
