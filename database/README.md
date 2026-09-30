# ACME School — Database

## Descripción general

Este proyecto contiene la estructura y los datos de prueba de la base de datos `acme_school`, desarrollada en **MySQL** para la gestión de estudiantes, docentes, cursos, horarios, aulas, inscripciones y demás entidades académicas.

La carpeta `database` organiza los scripts SQL según su función:

```text
database/
├── ddl/
│   └── db.sql
├── dml/
│   └── insert.sql
└── dql/
    └── queries.sql
```

## Objetivo general

Implementar y documentar la base de datos `acme_school`, permitiendo reproducir su estructura en un nuevo entorno MySQL mediante una secuencia ordenada de scripts para la creación de la base de datos, carga de datos de prueba y ejecución de consultas de demostración.

## Requisitos

Antes de ejecutar los scripts es necesario contar con:

- **MySQL Server** instalado y ejecutándose.
- **MySQL 8.0 o superior** recomendado.
- **MySQL Workbench**, terminal de MySQL u otro cliente compatible.
- Permisos suficientes para crear bases de datos, tablas e insertar registros.
- Los archivos del proyecto disponibles localmente.

## Archivos de la base de datos

### `database/ddl/db.sql`
---

Contiene el **DDL (Data Definition Language)** de la base de datos.

Se encarga de:

- Crear la base de datos `acme_school`.
- Seleccionar la base de datos mediante `USE`.
- Crear las tablas del sistema.
- Definir claves primarias.
- Definir claves foráneas.
- Establecer las relaciones entre las entidades.
- Definir los tipos de datos de cada campo.

Este archivo debe ejecutarse **primero**, ya que crea la estructura necesaria para los demás scripts.

### `database/dml/insert.sql`
---

Contiene el **DML (Data Manipulation Language)** utilizado para insertar datos.

Los registros incluidos son **Demo Seeds**, es decir, datos de prueba destinados a:

- Verificar que las relaciones funcionen correctamente.
- Poblar temporalmente las tablas.
- Realizar pruebas de consultas.
- Simular información académica dentro del sistema.

Estos datos **no representan información real de una institución educativa**.

Este archivo debe ejecutarse **después de** `db.sql`.

### `database/dql/queries.sql`
---

Contiene el **DQL (Data Query Language)** utilizado para realizar consultas sobre la información almacenada.

Las consultas funcionan como **Demo Queries**, destinadas a demostrar y comprobar el funcionamiento de la base de datos utilizando los datos de prueba previamente insertados.

Este archivo debe ejecutarse **después de** `insert.sql`.

## Orden de ejecución

Para garantizar que todos los scripts funcionen correctamente, se debe respetar el siguiente orden:

```text
1. ddl/db.sql
       ↓
2. dml/insert.sql
       ↓
3. dql/queries.sql
```

No se recomienda ejecutar `insert.sql` antes de `db.sql`, debido a que las tablas y relaciones todavía no existirían.

De igual manera, `queries.sql` debe ejecutarse después de cargar los Demo Seeds para obtener resultados en las consultas.

## Instalación y ejecución

### 1. Iniciar MySQL

Verificar que el servidor MySQL se encuentre activo.

### 2. Abrir el cliente MySQL

Se puede utilizar:

- MySQL Workbench.
- MySQL Shell.
- Terminal.
- Otro cliente compatible con MySQL.

### 3. Ejecutar el DDL

Abrir:

```text
database/ddl/db.sql
```

y ejecutar todo el script.

Este paso crea la base de datos:

```text
acme_school
```

### 4. Verificar la base de datos

Ejecutar:

```sql
SHOW DATABASES;
```

Luego seleccionar:

```sql
USE acme_school;
```

Y comprobar las tablas:

```sql
SHOW TABLES;
```

### 5. Ejecutar los Demo Seeds

Abrir:

```text
database/dml/insert.sql
```

y ejecutar el script completo.

Este paso inserta los datos de prueba necesarios para comprobar el funcionamiento de las relaciones y consultas.

### 6. Verificar los registros

Se pueden realizar consultas básicas para comprobar la carga:

```sql
USE acme_school;

SELECT * FROM students;
SELECT * FROM teachers;
SELECT * FROM courses;
```

### 7. Ejecutar las Demo Queries

Finalmente, abrir:

```text
database/dql/queries.sql
```

y ejecutar las consultas incluidas.

Estas consultas utilizan los registros de prueba cargados mediante `insert.sql`.

## Consideraciones

- `db.sql` debe ejecutarse antes que los demás scripts.
- `insert.sql` contiene únicamente **datos de prueba (Demo Seeds)**.
- `queries.sql` contiene **consultas de demostración (Demo Queries)**.
- Los Demo Seeds pueden modificarse o reemplazarse según las necesidades del entorno.
- Se recomienda ejecutar los scripts en el orden establecido para evitar errores de dependencias entre tablas y claves foráneas.
- La base de datos utilizada por el proyecto es `acme_school`.

## Tecnologías

- **MySQL** — Sistema gestor de base de datos.
- **SQL** — Lenguaje utilizado para definición, manipulación y consulta de datos.
- **Node.js** — Tecnología prevista para la integración de la base de datos con la aplicación.