import { BaseEntity } from './BaseEntity.js';

export class CourseSchedule extends BaseEntity {
  constructor(data = {}) {
    super(data.id);
    this.courseId = Number(data.courseId || data.course_id) || null;
    this.teacherId = Number(data.teacherId || data.teacher_id) || null;
    this.classroomId = Number(data.classroomId || data.classroom_id) || null;
    this.startDate = data.startDate || data.start_date || '';
    this.endDate = data.endDate || data.end_date || '';
    this.active = data.active !== undefined ? Number(data.active) : 1;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      courseId: this.courseId,
      teacherId: this.teacherId,
      classroomId: this.classroomId,
      startDate: this.startDate,
      endDate: this.endDate,
      active: this.active
    };
  }
}

export default CourseSchedule;
