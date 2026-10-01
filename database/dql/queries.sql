USE acme_school;

-- 1. Consultar estudiantes con su ciudad y tipo de documento
SELECT 
    s.code AS estudiante_codigo,
    CONCAT(s.first_name, ' ', s.last_name) AS nombre_completo,
    it.name AS tipo_documento,
    s.identification_number AS documento,
    c.name AS ciudad
FROM students s
INNER JOIN identification_types it ON s.identification_type_id = it.id
INNER JOIN cities c ON s.city_id = c.id;

-- 2. Consultar la oferta de cursos programados con profesor y aula asignada
SELECT 
    cs.id AS schedule_id,
    co.code AS curso_codigo,
    co.description AS curso_nombre,
    CONCAT(t.first_name, ' ', t.last_name) AS profesor,
    cl.code AS aula,
    cs.start_date,
    cs.end_date
FROM courses_schedules cs
INNER JOIN courses co ON cs.course_id = co.id
INNER JOIN teachers t ON cs.teacher_id = t.id
INNER JOIN classrooms cl ON cs.classroom_id = cl.id
WHERE cs.active = 1;

-- 3. Consultar la lista de estudiantes inscritos por cada curso
SELECT 
    co.description AS curso,
    CONCAT(s.first_name, ' ', s.last_name) AS estudiante,
    i.register_date AS fecha_inscripcion
FROM inscriptions i
INNER JOIN courses_schedules cs ON i.course_schedule_id = cs.id
INNER JOIN courses co ON cs.course_id = co.id
INNER JOIN students s ON i.student_id = s.id
WHERE i.active = 1;

-- 4. Consultar los temas pertenecientes a un curso específico
SELECT 
    co.code AS curso_codigo,
    co.description AS curso,
    tp.code AS tema_codigo,
    tp.title AS tema_titulo,
    tp.description AS tema_detalle
FROM topics tp
INNER JOIN courses co ON tp.course_id = co.id
WHERE tp.active = 1
AND co.code = 'CURS1';

-- 5. Consultar las notas/calificaciones de cada estudiante con el nombre del curso
SELECT 
    CONCAT(s.first_name, ' ', s.last_name) AS estudiante,
    co.description AS curso,
    r.rate AS calificacion,
    r.comments AS observaciones
FROM rates r
INNER JOIN inscriptions i ON r.inscription_id = i.id
INNER JOIN students s ON i.student_id = s.id
INNER JOIN courses_schedules cs ON i.course_schedule_id = cs.id
INNER JOIN courses co ON cs.course_id = co.id;
