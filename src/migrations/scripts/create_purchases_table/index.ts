import path from "path";
import { pool } from "../../../config/db";
import { IMigration } from "../../interfaces";
import { readFile } from "fs/promises";

class CreatePurchasesTable implements IMigration {
  migrationName = "create_purchases_table";

  async up() {
    try {
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

export default new CreatePurchasesTable();
