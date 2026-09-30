DROP DATABASE IF EXISTS acme_school;
CREATE DATABASE IF NOT EXISTS acme_school
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE acme_school;

CREATE TABLE IF NOT EXISTS identification_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(6) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(250)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS cities (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(10) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS classrooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(10) NOT NULL UNIQUE,
    description VARCHAR(250),
    capacity INT NOT NULL,
    active TINYINT DEFAULT 1
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS courses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(10) NOT NULL UNIQUE,
    description VARCHAR(250) NOT NULL,
    intensity INT NOT NULL,
    weight INT NOT NULL,
    active TINYINT DEFAULT 1
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS teachers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(60) NOT NULL,
    last_name VARCHAR(60) NOT NULL,
    identification_type_id INT NOT NULL,
    identification_number VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    FOREIGN KEY (identification_type_id)
        REFERENCES identification_types(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS students (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(14) NOT NULL UNIQUE,
    first_name VARCHAR(60) NOT NULL,
    last_name VARCHAR(60) NOT NULL,
    identification_type_id INT NOT NULL,
    identification_number VARCHAR(20) NOT NULL UNIQUE,
    gender VARCHAR(20),
    birthdate DATETIME,
    email VARCHAR(100) NOT NULL UNIQUE,
    address VARCHAR(100),
    city_id BIGINT NOT NULL,
    FOREIGN KEY (identification_type_id)
        REFERENCES identification_types(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    FOREIGN KEY (city_id)
        REFERENCES cities(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS topics (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT NOT NULL,
    code VARCHAR(10) NOT NULL,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(250),
    active TINYINT DEFAULT 1,
    FOREIGN KEY (course_id)
        REFERENCES courses(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS courses_schedules (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT NOT NULL,
    teacher_id BIGINT NOT NULL,
    classroom_id INT NOT NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    active TINYINT DEFAULT 1,
    FOREIGN KEY (course_id)
        REFERENCES courses(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    FOREIGN KEY (teacher_id)
        REFERENCES teachers(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    FOREIGN KEY (classroom_id)
        REFERENCES classrooms(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS inscriptions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_schedule_id BIGINT NOT NULL,
    student_id BIGINT NOT NULL,
    register_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    active TINYINT DEFAULT 1,
    FOREIGN KEY (course_schedule_id)
        REFERENCES courses_schedules(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    FOREIGN KEY (student_id)
        REFERENCES students(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS rates (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    inscription_id BIGINT NOT NULL,
    rate DECIMAL(5,2) NOT NULL,
    comments VARCHAR(250),
    FOREIGN KEY (inscription_id)
        REFERENCES inscriptions(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
) ENGINE=InnoDB;
