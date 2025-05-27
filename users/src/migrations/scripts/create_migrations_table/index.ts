import { readFile } from "fs/promises";
import path from "path";
import { IMigration } from "../../interfaces";
import { pool } from "../../../shared/config/db";

class CreateMigrationsTable implements IMigration {
  migrationName = "create_migrations_table";

  async up() {
    try {
      const [rows]: any = await pool.execute("SHOW TABLES LIKE 'migrations'");

      if (rows?.length && Object.values(rows[0]).includes("migrations")) {
        return;
      }

      const sqlPath = path.join(__dirname, "up.sql");
      const sql = await readFile(sqlPath, "utf8");

      await pool.query(sql);

      console.log(`Migration '${this.migrationName}' is up.`);
    } catch (error) {
      throw new Error(
        `Error executing migration ${this.migrationName}: ${error}`
      );
    }
  }

  async down() {
    try {
      const sqlPath = path.join(__dirname, "down.sql");
      const sql = await readFile(sqlPath, "utf8");

      await pool.query(sql);
      console.log(`Migration '${this.migrationName}' is down.`);
    } catch (error) {
      throw new Error(
        `Error executing migration ${this.migrationName}: ${error}`
      );
    }
  }
}

export default new CreateMigrationsTable();
