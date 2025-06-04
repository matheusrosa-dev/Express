CREATE TABLE users (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    status ENUM('blocked', 'active') NOT NULL,
    created_at TIMESTAMP(3) NOT NULL

);