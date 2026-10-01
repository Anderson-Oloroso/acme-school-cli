# ACME School CLI — Sistema de Gestión Académica y Administrativa

Aplicación de consola (CLI) desarrollada en **Node.js** y **MySQL** para la administración integral de estudiantes, docentes, cursos, temas, aulas, horarios de clases, inscripciones, calificaciones, ciudades y tipos de identificación.

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
├── src/
│   ├── config/
│   │   └── database.js            # Conexión/Pool a MySQL con mysql2/promise
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
│   │   ├── BaseService.js         # CRUD genérico SQL (getAll, getById, create, update, delete)
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
│   │   └── ReportsCommand.js      # Consultas DQL y reportes académicos
│   ├── utils/                     # Utilidades transversales
│   │   ├── readline.js            # Manejador asíncrono de consola (async/await)
│   │   ├── ui.js                  # Banners, tablas, colores y encabezados
│   │   └── validators.js          # Validaciones de entradas (email, números, fechas)
│   └── app.js                     # Punto de entrada ejecutable
├── .env.example                   # Plantilla de variables de entorno
├── package.json
└── README.md
```

### Patrones Aplicados:
1. **Herencia y Polimorfismo (POO)**: `Student` y `Teacher` extienden de `Person` reutilizando nombres, apellidos, documento y correo.
2. **Factory Method (`EntityFactory`)**: Encapsula la creación dinámica de instancias de entidad a partir de registros de MySQL o datos de formulario.
3. **Template Method (`BaseCommand`)**: Define la estructura algorítmica de los menús CRUD (Mostrar Menú -> Leer Entrada -> Ejecutar Operación -> Pausar), delegando las especificaciones a cada subclase.
4. **Single Responsibility (SOLID)**: Separación estricta entre modelos (datos), servicios (consultas SQL) y comandos (interacción con el usuario).

---

## 🚀 Requisitos e Instalación

### 1. Requisitos Previos
- Node.js (v18 o superior)
- Servidor MySQL activo

### 2. Configurar Base de Datos
Ejecuta los scripts SQL en tu cliente de base de datos MySQL (Workbench, DBeaver o CLI):
1. Estructura: `database/ddl/db.sql`
2. Datos iniciales: `database/dml/insert.sql`

### 3. Configurar Variables de Entorno
Crea o edita el archivo `.env` en la raíz del proyecto:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=acme_school
```

### 4. Instalar Dependencias y Ejecutar
```bash
npm install
npm start
```

Para desarrollo con recarga automática:
```bash
npm run dev
```

---

## 📊 Módulos y Funcionalidades

- **Gestión de Estudiantes**: Registro, listado con ciudad y documento, actualización y eliminación.
- **Gestión de Docentes**: Control de profesores vinculados a tipos de identificación.
- **Gestión de Cursos y Temas**: Catálogo académico con intensidades horarias, créditos y temas.
- **Gestión de Aulas y Horarios**: Asignación de salones, docentes y cursos con fechas y horas.
- **Inscripciones y Calificaciones**: Matrícula de estudiantes a horarios y registro de notas con comentarios.
- **Reportes DQL**:
  1. Estudiantes con ciudad y tipo de documento.
  2. Oferta de cursos programados con docente y aula asignada.
  3. Lista de estudiantes inscritos por curso.
  4. Temas pertenecientes a un curso específico.
  5. Calificaciones y notas de estudiantes por curso.