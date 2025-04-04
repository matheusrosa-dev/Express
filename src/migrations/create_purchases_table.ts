import { pool } from "../config/db";
import { IMigration } from "./interfaces";

export class CreatePurchasesTable implements IMigration {
  migrationName = "create_purchases_table";

  async up() {
    try {
      await pool.query(`CREATE TABLE purchases (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        total_price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
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
      await pool.query(`DROP TABLE purchases;`);
      console.log(`Migration '${this.migrationName}' is down.`);
    } catch (error) {
      throw new Error(
        `Error executing migration ${this.migrationName}: ${error}`
      );
    }
  }
}

export default new CreatePurchasesTable();
