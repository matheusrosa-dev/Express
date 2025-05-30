import { PoolConnection } from "mysql2/promise";
import path from "path";
import fs from "fs/promises";
import { pool } from "../shared/config/db";
import kleur from "kleur";

const MIGRATIONS_DIR = path.join(__dirname, "..", "db", "migrations");

async function runMigrations() {
  const args = process.argv.slice(2);
  const direction = args[0] || "up";
  const stepsArg = Number(args[1]) || 1;

  if (direction !== "up" && direction !== "down") {
    console.log(kleur.bgRed("Invalid direction. Use 'up' or 'down'."));
    process.exit(1);
  }

  if (direction === "down" && (isNaN(stepsArg) || stepsArg < 1)) {
    console.log(
      kleur.bgRed(
        "Invalid number of steps for rollback. Must be a positive integer."
      )
    );
    process.exit(1);
  }

  let connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    await connection.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        migration_name VARCHAR(255) NOT NULL UNIQUE,
        applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    if (direction === "up") {
      await runUpMigrations(connection);
    } else if (direction === "down") {
      await runDownMigrations(connection, stepsArg);
    }

    await connection.commit();
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.log(error);
    process.exit(1);
  } finally {
    if (connection) {
      connection.release();
    }
    await pool.end();
  }
}

async function getAppliedMigrations(connection: PoolConnection) {
  const [rows] = await connection.query(
    "SELECT id, migration_name, applied_at FROM schema_migrations ORDER BY id ASC"
  );

  return rows as {
    id: number;
    migration_name: string;
    applied_at: Date;
  }[];
}

async function recordMigration(
  connection: PoolConnection,
  migrationName: string
) {
  await connection.query(
    "INSERT INTO schema_migrations (migration_name) VALUES (?)",
    [migrationName]
  );
}

async function removeMigrationRecord(
  connection: any,
  migrationName: string
): Promise<void> {
  await connection.query(
    "DELETE FROM schema_migrations WHERE migration_name = ?",
    [migrationName]
  );
}

async function runUpMigrations(connection: PoolConnection) {
  const appliedMigrationRecords = await getAppliedMigrations(connection);
  const appliedMigrationNames = appliedMigrationRecords.map(
    (r) => r.migration_name
  );

  const migrationFiles = (await fs.readdir(MIGRATIONS_DIR))
    .filter((file) => !file.endsWith(".down.sql"))
    .sort();

  let migrationsAppliedCount = 0;

  for (const fileName of migrationFiles) {
    if (!appliedMigrationNames.includes(fileName)) {
      const filePath = path.join(MIGRATIONS_DIR, fileName);
      const sqlScript = await fs.readFile(filePath, "utf-8");

      await connection.query(sqlScript);
      await recordMigration(connection, fileName);

      console.log(
        `Successfully applied UP migration: ${kleur.green(fileName)}`
      );
      migrationsAppliedCount++;
    }
  }

  if (migrationsAppliedCount === 0) {
    console.log(
      kleur.bgYellow(
        "No new UP migrations to apply. Database schema is up to date."
      )
    );
    return;
  }

  console.log(
    kleur.bgGreen(
      `Successfully applied ${migrationsAppliedCount} new UP migration(s).`
    )
  );
}

async function runDownMigrations(connection: any, steps: number = 1) {
  const appliedMigrations = await getAppliedMigrations(connection);
  if (appliedMigrations.length === 0) {
    console.log(
      kleur.bgYellow("No migrations have been applied. Nothing to roll back.")
    );
    return;
  }

  const migrationsToRollback = appliedMigrations.slice(-steps).reverse();

  let rolledBackCount = 0;

  for (const migrationRecord of migrationsToRollback) {
    const upFileName = migrationRecord.migration_name;
    const downFileName = upFileName.replace(".sql", ".down.sql");
    const downFilePath = path.join(MIGRATIONS_DIR, downFileName);

    try {
      await fs.access(downFilePath);
    } catch (err) {
      console.log(
        kleur.bgRed(
          `Down migration file ${downFileName} not found for ${upFileName}. Cannot roll back.`
        )
      );
      throw new Error(`Down migration file ${downFileName} not found.`);
    }

    const sqlScript = await fs.readFile(downFilePath, "utf-8");
    await connection.query(sqlScript);
    await removeMigrationRecord(connection, upFileName);
    console.log(kleur.green(`Successfully rolled back: ${upFileName}`));
    rolledBackCount++;
  }
  if (rolledBackCount > 0) {
    console.log(
      kleur.bgGreen(`Successfully rolled back ${rolledBackCount} migration(s).`)
    );
  }
}

runMigrations();
