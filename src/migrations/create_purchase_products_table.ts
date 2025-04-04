import { pool } from "../config/db";

export const createPurchaseProductsTable = async () => {
  const sql = `
    CREATE TABLE purchase_products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      purchase_id INT NOT NULL,
      product_id INT NOT NULL,
      quantity INT NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      FOREIGN KEY (purchase_id) REFERENCES purchases(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    );
  `;

  const connection = await pool.getConnection();

  try {
    await connection.query(sql);

    console.log("Table 'purchases_products' created successfully!");
  } catch (error) {
    connection.rollback();
    throw new Error(`Error creating 'purchases_products' table: ${error}`);
  } finally {
    connection.release();
  }
};
