CREATE TABLE purchases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amount INT NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);