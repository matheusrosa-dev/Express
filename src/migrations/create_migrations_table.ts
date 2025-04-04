import { pool } from "../config/db";
import { IMigration } from "./interfaces";

class CreateMigrationsTable implements IMigration {
  migrationName = "create_migrations_table";

  async up() {
    try {
      await pool.query(`CREATE TABLE migrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
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
      await pool.query(`DROP TABLE migrations;`);
      console.log(`Migration '${this.migrationName}' is down.`);
    } catch (error) {
      throw new Error(
        `Error executing migration ${this.migrationName}: ${error}`
      );
    }
  }
}

export default new CreateMigrationsTable();
