import { pool } from "../config/db";
import { IMigration } from "./interfaces";

export class CreateProductsTable implements IMigration {
  migrationName = "create_products_table";

  async up() {
    try {
      await pool.query(`CREATE TABLE products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`);

      console.log(`Migration '${this.migrationName}' is up.`);
    } catch (error) {
      throw new Error(
        `Error executing migration ${this.migrationName}: ${error}`
      );
    }
  }

  async down() {
    try {
      await pool.query(`DROP TABLE products;`);
      console.log(`Migration '${this.migrationName}' is down.`);
    } catch (error) {
      throw new Error(
        `Error executing migration ${this.migrationName}: ${error}`
      );
    }
  }
}

export default new CreateProductsTable();
