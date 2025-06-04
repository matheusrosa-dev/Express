CREATE TABLE users (
    id CHAR(36) PRIMARY KEY NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    status ENUM('blocked', 'active') NOT NULL,
    created_at TIMESTAMP(3) NOT NULL

);