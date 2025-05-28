CREATE TABLE purchase_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amount INT NOT NULL,
    purchase_id INT NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_purchase
    FOREIGN KEY (purchase_id)
    REFERENCES purchases(id)
    ON DELETE CASCADE
);