# ACME School CLI — Sistema de Gestión Académica y Administrativa

Aplicación de consola (CLI) desarrollada en **Node.js** y **MySQL** para la administración integral de estudiantes, docentes, cursos, temas, aulas, horarios de clases, inscripciones, calificaciones, ciudades y tipos de identificación, con soporte para generación de reportes en archivos HTML.

---

## 🏛️ Arquitectura y Patrones de Diseño

El proyecto implementa una arquitectura limpia y modular basada en principios **SOLID** y patrones de diseño reconocidos:

```
acme-school-cli/
├── database/
│   ├── ddl/
│   │   └── db.sql                 # Estructura y esquemas de tablas MySQL
│   ├── dml/
│   │   └── insert.sql             # Datos iniciales (Seeders)
│   └── dql/
│       └── queries.sql            # Consultas relacionales y reportes
├── docs/
│   └── diagrams/
│       └── MER_Acme_School.png    # Diagrama Entidad-Relación
├── reports/                       # Directorio de salida para reportes generados en HTML
├── src/
│   ├── config/
│   │   └── database.js            # Conexión simple a MySQL con createConnection
│   ├── models/                    # POO, Herencia y Factory Method
│   │   ├── BaseEntity.js          # Clase base con ID y serialización
│   │   ├── Person.js              # Clase base para personas (firstName, lastName, DPI, email)
│   │   ├── Student.js             # Hereda de Person (código, género, fecha nacimiento, ciudad)
│   │   ├── Teacher.js             # Hereda de Person
│   │   ├── Course.js              # Modelo de cursos (intensidad, peso)
│   │   ├── Topic.js               # Temas de curso
│   │   ├── Classroom.js           # Aulas y capacidades
│   │   ├── CourseSchedule.js      # Horarios que relacionan curso, docente y aula
│   │   ├── IdentificationType.js  # Tipos de documento
│   │   ├── City.js                # Ciudades
│   │   ├── Inscription.js         # Inscripciones de estudiantes en horarios
│   │   ├── Rate.js                # Calificaciones y notas
│   │   └── EntityFactory.js       # Patrón Factory Method para instanciación dinámica
│   ├── services/                  # Capa de acceso a datos y lógica CRUD
│   │   ├── BaseService.js         # CRUD genérico SQL con control de integridad referencial
│   │   ├── HTMLReportService.js   # Generador de reportes en formato HTML (SOLID SRP)
│   │   ├── StudentService.js      # Consultas y joins específicos para Estudiantes
│   │   ├── TeacherService.js      # Consultas de Docentes
│   │   ├── CourseService.js       # Consultas de Cursos
│   │   ├── TopicService.js        # Temas vinculados a cursos
│   │   ├── ClassroomService.js    # Aulas y validación de disponibilidad
│   │   ├── CourseScheduleService.js # Horarios con cruce de profesores y aulas
│   │   ├── IdentificationTypeService.js # Tipos de documento
│   │   ├── CityService.js         # Ciudades
│   │   ├── InscriptionService.js  # Inscripciones detalladas
│   │   └── RateService.js         # Calificaciones y promedios
│   ├── commands/                  # Capa de presentación y menús CLI
│   │   ├── BaseCommand.js         # Patrón Template Method para flujos CRUD interactivos
│   │   ├── MainMenuCommand.js     # Menú principal y router de comandos
│   │   ├── StudentCommand.js      # Menú de gestión de estudiantes
│   │   ├── TeacherCommand.js      # Menú de gestión de docentes
│   │   ├── CourseCommand.js       # Menú de gestión de cursos
│   │   ├── TopicCommand.js        # Menú de gestión de temas
│   │   ├── ClassroomCommand.js    # Menú de gestión de aulas
│   │   ├── CourseScheduleCommand.js # Menú de gestión de horarios
│   │   ├── InscriptionCommand.js  # Menú de gestión de inscripciones
│   │   ├── RateCommand.js         # Menú de gestión de notas
│   │   ├── IdentificationTypeCommand.js # Menú de tipos de documento
│   │   ├── CityCommand.js         # Menú de ciudades
│   │   └── ReportsCommand.js      # Consultas DQL y exportación a HTML
│   ├── utils/                     # Utilidades transversales
│   │   ├── readline.js            # Manejador asíncrono de consola (async/await)
│   │   ├── ui.js                  # Banners, tablas, colores y encabezados
│   │   └── validators.js          # Validaciones de entradas (email, números, fechas)
│   └── app.js                     # Punto de entrada ejecutable
├── .env.example                   # Plantilla de variables de entorno
├── package.json
└── README.md
```

### Patrones y Principios Aplicados:
1. **Conexión Simple a MySQL**: Conexión directa mediante `createConnection` de `mysql2/promise`.
2. **Integridad Referencial**: Control de claves foráneas y restricciones en BaseService (captura de errores 1451, 1452 y 1062 para evitar inconsistencias de datos).
3. **Herencia y Polimorfismo (POO)**: `Student` y `Teacher` extienden de `Person`.
4. **Factory Method (`EntityFactory`)**: Instanciación dinámica según la entidad requerida.
5. **Template Method (`BaseCommand`)**: Flujo reutilizable de menús CRUD.
6. **Single Responsibility (SOLID)**: `FormatearReporteHTML` y `HTMLReportService` aislados para estructurar y guardar reportes web.

---

## 🚀 Requisitos e Instalación

### 1. Configurar Base de Datos
Ejecutar los scripts en MySQL:
1. Estructura: `database/ddl/db.sql`
2. Datos iniciales: `database/dml/insert.sql`

### 2. Variables de Entorno (.env)
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=acme_school
```

### 3. Ejecutar la Aplicación
```bash
npm install
npm start
```

---

## 📄 Generación de Reportes en Archivos HTML

El sistema incluye la opción de visualizar en consola y exportar a archivos HTML con diseño profesional en la carpeta `reports/`:
- **Estudiantes**: `reports/reporte_estudiantes.html`
- **Profesores**: `reports/reporte_profesores.html`
- **Horarios por Curso**: `reports/reporte_horarios_curso.html`
- **Estudiantes por Cursos**: `reports/reporte_estudiantes_curso.html`
- **Temas de un Curso**: `reports/reporte_temas_curso.html`