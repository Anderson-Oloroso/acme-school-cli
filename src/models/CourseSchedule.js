import { BaseEntity } from './BaseEntity.js';

export class CourseSchedule extends BaseEntity {
  constructor(data = {}) {
    super(data.id);
    this.course_id = data.course_id || null;
    this.teacher_id = data.teacher_id || null;
    this.classroom_id = data.classroom_id || null;
    this.start_date = data.start_date || '';
    this.end_date = data.end_date || '';
    this.active = data.active !== undefined ? Number(data.active) : 1;
  }
}

export default CourseSchedule;
