import { BaseEntity } from './BaseEntity.js';

export class Inscription extends BaseEntity {
  constructor(data = {}) {
    super(data.id);
    this.courseScheduleId = Number(data.courseScheduleId || data.course_schedule_id) || null;
    this.studentId = Number(data.studentId || data.student_id) || null;
    this.registerDate = data.registerDate || data.register_date || '';
    this.active = data.active !== undefined ? Number(data.active) : 1;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      courseScheduleId: this.courseScheduleId,
      studentId: this.studentId,
      registerDate: this.registerDate,
      active: this.active
    };
  }
}

export default Inscription;
