# Análisis de Requerimientos — Base de Datos ACME School

## Objetivo general

Diseñar una base de datos relacional para gestionar la información académica y administrativa de una institución educativa, permitiendo administrar estudiantes, docentes, cursos, horarios, aulas, temas, inscripciones, ciudades, tipos de identificación y tarifas, utilizando MySQL como sistema gestor y Node.js como tecnología de desarrollo de la aplicación.

## Entidades identificadas y propiedades

### 1. identification_types
- `id` — INT — Clave primaria.
- `code` — VARCHAR(6) — Código del tipo de identificación.
- `name` — VARCHAR(100) — Nombre del tipo de identificación.
- `description` — VARCHAR(250) — Descripción del tipo de identificación.

### 2. students
- `id` — BIGINT — Clave primaria.
- `code` — VARCHAR(14) — Código del estudiante.
- `firstName` — VARCHAR(60) — Nombre del estudiante.
- `lastName` — VARCHAR(60) — Apellido del estudiante.
- `identification_type_id` — INT — Tipo de identificación.
- `identificationNumber` — VARCHAR(16) — Número de identificación.
- `gender` — VARCHAR(20) — Género.
- `birthdate` — DATETIME — Fecha de nacimiento.
- `email` — VARCHAR(60) — Correo electrónico.
- `address` — VARCHAR(100) — Dirección.
- `city_id` — BIGINT — Ciudad de residencia.

### 3. teachers
- `id` — BIGINT — Clave primaria.
- `firstName` — VARCHAR(60) — Nombre del docente.
- `lastName` — VARCHAR(60) — Apellido del docente.
- `identification_type_id` — INT — Tipo de identificación.
- `identificationNumber` — VARCHAR(16) — Número de identificación.
- `email` — VARCHAR(100) — Correo electrónico.

### 4. cities
- `id` — BIGINT — Clave primaria.
- `code` — VARCHAR(10) — Código de la ciudad.
- `name` — VARCHAR(100) — Nombre de la ciudad.

### 5. courses
- `id` — BIGINT — Clave primaria.
- `code` — VARCHAR(10) — Código del curso.
- `description` — VARCHAR(250) — Descripción del curso.
- `intensity` — INT — Intensidad del curso.
- `weight` — INT — Peso o valor asociado al curso.
- `active` — TINYINT — Estado de disponibilidad del curso.

### 6. courses_schedules
- `id` — BIGINT — Clave primaria.
- `course_id` — BIGINT — Curso asociado.
- `teacher_id` — BIGINT — Docente asignado.
- `classroom_id` — INT — Aula asignada.
- `start_date` — DATETIME — Fecha y hora de inicio.
- `end_date` — DATETIME — Fecha y hora de finalización.
- `active` — TINYINT — Estado del horario.

### 7. classrooms
- `id` — INT — Clave primaria.
- `code` — VARCHAR(10) — Código del aula.
- `description` — VARCHAR(250) — Descripción del aula.
- `capacity` — INT — Capacidad máxima.
- `active` — TINYINT — Estado del aula.

### 8. topics
- `id` — BIGINT — Clave primaria.
- `course_id` — BIGINT — Curso al que pertenece el tema.
- `code` — VARCHAR(10) — Código del tema.
- `title` — VARCHAR(100) — Título del tema.
- `description` — VARCHAR(250) — Descripción del tema.
- `active` — TINYINT — Estado del tema.

### 9. inscriptions
- `id` — BIGINT — Clave primaria.
- `course_schedule` — BIGINT — Horario del curso asociado.
- `student_id` — BIGINT — Estudiante inscrito.
- `register_date` — DATETIME — Fecha de inscripción.
- `active` — TINYINT — Estado de la inscripción.

### 10. rates
- `id` — BIGINT — Clave primaria.
- `inscription_id` — BIGINT — Inscripción asociada.
- `rate` — BIGINT — Valor de la tarifa.
- `comments` — VARCHAR(250) — Comentarios relacionados con la tarifa.

## Relaciones y cardinalidades

| Entidad origen | Relación | Entidad destino | Cardinalidad |
|---|---|---|---|
| `identification_types` | Identifica | `students` | 1:N |
| `identification_types` | Identifica | `teachers` | 1:N |
| `cities` | Tiene | `students` | 1:N |
| `teachers` | Imparte | `courses_schedules` | 1:N |
| `courses` | Tiene | `courses_schedules` | 1:N |
| `classrooms` | Asigna | `courses_schedules` | 1:N |
| `courses` | Contiene | `topics` | 1:N |
| `students` | Realiza | `inscriptions` | 1:N |
| `courses_schedules` | Recibe | `inscriptions` | 1:N |
| `inscriptions` | Genera | `rates` | 1:N |

## Reglas de negocio

1. Cada estudiante debe estar asociado a un único tipo de identificación y a una ciudad registrada en la base de datos.

2. Cada docente debe tener un tipo de identificación y no puede existir una asignación de horario sin un docente asociado.

3. Un curso puede tener múltiples horarios, pero cada horario debe estar asociado a un único curso, docente y aula.

4. Un estudiante puede realizar múltiples inscripciones y cada inscripción debe corresponder a un horario de curso específico.

5. Un aula debe respetar su capacidad máxima y solamente puede utilizarse en horarios registrados como activos.

## Supuestos

1. Los identificadores (`id`) son valores únicos utilizados como claves primarias para relacionar las entidades.

2. Los campos `active` representan el estado lógico de registros como cursos, horarios, aulas, temas e inscripciones, permitiendo conservar información histórica.

3. Un estudiante puede estar inscrito en diferentes cursos o horarios, siempre que cada inscripción quede registrada de manera independiente.

4. Las tarifas están asociadas directamente a las inscripciones y pueden existir uno o varios registros de tarifa para una misma inscripción.

5. La aplicación desarrollada con Node.js utilizará MySQL como sistema gestor de base de datos y deberá respetar las relaciones y restricciones definidas en el modelo.