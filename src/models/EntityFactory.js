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

// Fabrica dinamica de entidades
export class EntityFactory {
  static create(type, data = {}) {
    const normalizedType = String(type).toLowerCase().replace(/[-_]/g, '');

    switch (normalizedType) {
      case 'student':
      case 'students':
      case 'estudiante':
      case 'estudiantes':
        return new Student(data);

      case 'teacher':
      case 'teachers':
      case 'profesor':
      case 'docente':
      case 'docentes':
        return new Teacher(data);

      case 'course':
      case 'courses':
      case 'curso':
      case 'cursos':
        return new Course(data);

      case 'topic':
      case 'topics':
      case 'tema':
      case 'temas':
        return new Topic(data);

      case 'classroom':
      case 'classrooms':
      case 'aula':
      case 'aulas':
        return new Classroom(data);

      case 'courseschedule':
      case 'courses_schedules':
      case 'schedule':
      case 'schedules':
      case 'horario':
      case 'horarios':
        return new CourseSchedule(data);

      case 'identificationtype':
      case 'identification_types':
      case 'tipodocumento':
      case 'tiposdocumento':
        return new IdentificationType(data);

      case 'city':
      case 'cities':
      case 'ciudad':
      case 'ciudades':
        return new City(data);

      case 'inscription':
      case 'inscriptions':
      case 'inscripcion':
      case 'inscripciones':
        return new Inscription(data);

      case 'rate':
      case 'rates':
      case 'nota':
      case 'notas':
      case 'calificacion':
      case 'calificaciones':
        return new Rate(data);

      default:
        throw new Error(`Tipo de entidad desconocido para EntityFactory: "${type}"`);
    }
  }
}

export default EntityFactory;
