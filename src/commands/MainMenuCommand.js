import { clear, showBanner, showWarning } from '../utils/ui.js';
import { ask, pause, closeReadline } from '../utils/readline.js';
import connection from '../config/database.js';

import { StudentCommand } from './StudentCommand.js';
import { TeacherCommand } from './TeacherCommand.js';
import { CourseCommand } from './CourseCommand.js';
import { TopicCommand } from './TopicCommand.js';
import { ClassroomCommand } from './ClassroomCommand.js';
import { CourseScheduleCommand } from './CourseScheduleCommand.js';
import { InscriptionCommand } from './InscriptionCommand.js';
import { RateCommand } from './RateCommand.js';
import { IdentificationTypeCommand } from './IdentificationTypeCommand.js';
import { CityCommand } from './CityCommand.js';
import { ReportsCommand } from './ReportsCommand.js';

export class MainMenuCommand {
  constructor() {
    this.commands = {
      '1': new StudentCommand(),
      '2': new TeacherCommand(),
      '3': new CourseCommand(),
      '4': new TopicCommand(),
      '5': new ClassroomCommand(),
      '6': new CourseScheduleCommand(),
      '7': new InscriptionCommand(),
      '8': new RateCommand(),
      '9': new IdentificationTypeCommand(),
      '10': new CityCommand(),
      '11': new ReportsCommand()
    };
  }

  async execute() {
    while (true) {
      clear();
      showBanner();
      console.log('1.  Gestión de Estudiantes');
      console.log('2.  Gestión de Docentes');
      console.log('3.  Gestión de Cursos');
      console.log('4.  Gestión de Temas');
      console.log('5.  Gestión de Aulas');
      console.log('6.  Gestión de Horarios y Programación');
      console.log('7.  Gestión de Inscripciones');
      console.log('8.  Gestión de Calificaciones / Notas');
      console.log('9.  Gestión de Tipos de Identificación');
      console.log('10. Gestión de Ciudades');
      console.log('11. Consultas y Reportes Académicos (DQL)');
      console.log('0.  Salir del Sistema');

      const opt = await ask('-> Elija una opción');

      if (opt === '0') {
        console.log('\nCerrando conexión y saliendo del sistema. ¡Hasta luego!\n');
        await connection.end();
        closeReadline();
        return;
      }

      const command = this.commands[opt];
      if (command) {
        await command.execute();
      } else {
        showWarning('Opción inválida. Intente de nuevo.');
        await pause();
      }
    }
  }
}

export default MainMenuCommand;
