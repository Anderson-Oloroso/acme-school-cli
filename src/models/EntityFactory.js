import { Student } from './Student.js';
import { Teacher } from './Teacher.js';
import { Course } from './Course.js';
import { Topic } from './Topic.js';
import { Classroom } from './Classroom.js';
import { CourseSchedule } from './CourseSchedule.js';
import { IdentificationType } from './IdentificationType.js';
import { City } from './City.js';
import { Inscription } from './Inscription.js';
import { Rate } from './Rate.js';

export class EntityFactory {
  static create(type, data = {}) {
    switch (type.toLowerCase()) {
      case 'student':
      case 'estudiante':
        return new Student(data);
      case 'teacher':
      case 'docente':
      case 'profesor':
        return new Teacher(data);
      case 'course':
      case 'curso':
        return new Course(data);
      case 'topic':
      case 'tema':
        return new Topic(data);
      case 'classroom':
      case 'aula':
        return new Classroom(data);
      case 'courseschedule':
      case 'schedule':
      case 'horario':
        return new CourseSchedule(data);
      case 'identificationtype':
      case 'tipodocumento':
        return new IdentificationType(data);
      case 'city':
      case 'ciudad':
        return new City(data);
      case 'inscription':
      case 'inscripcion':
        return new Inscription(data);
      case 'rate':
      case 'nota':
      case 'calificacion':
        return new Rate(data);
      default:
        throw new Error(`Tipo desconocido: ${type}`);
    }
  }
}

export default EntityFactory;
