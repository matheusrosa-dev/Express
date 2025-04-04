import CreateMigrationsTable from "./create_migrations_table";
import CreateProductsTable from "./create_products_table";
import CreateUsersTable from "./create_users_table";
import { Migration } from "./entities";
import { MigrationModel } from "./models";
import { MigrationsRepository } from "./repositories";

type Action = "up" | "down";

const migrations = [
  CreateMigrationsTable,
  CreateProductsTable,
  CreateUsersTable,
];

const migrationModel = new MigrationModel();
const migrationRepository = new MigrationsRepository(migrationModel);

const runUpMigration = async (migration: (typeof migrations)[number]) => {
  const foundMigration = await migrationRepository.findByName(
    migration.migrationName
  );

  if (foundMigration) {
    console.log(`Migration '${migration.migrationName}' is already up.`);
    return;
  }

  const migrationEntity = new Migration({
    name: migration.migrationName,
  });

  await migration.up();
  await migrationRepository.create(migrationEntity);
};

const runDownMigration = async (migration: (typeof migrations)[number]) => {
  const foundMigration = await migrationRepository.findByName(
    migration.migrationName
  );

  if (!foundMigration) {
    console.log(`Migration '${migration.migrationName}' is already down.`);
    return;
  }

  const migrationId = foundMigration.toJSON().id;

  await migration.down();
  await migrationRepository.delete(migrationId!);
};

const runMigrations = async (action: Action, migrationName?: string) => {
  try {
    if (!migrationName) {
      if (action === "down") {
        migrations.reverse();
      }

      for (const migration of migrations) {
        if (action === "up") {
          await runUpMigration(migration);
        }

        if (action === "down") {
          await runDownMigration(migration);
          continue;
        }
      }

      return;
    }

    if (migrationName) {
      const foundMigration = migrations.find(
        (migration) => migration.migrationName === migrationName
      );

      if (!foundMigration) {
        throw new Error(`Migration ${migrationName} not found`);
      }

      await foundMigration[action]();
    }
  } catch (error) {
    console.log(error);
  } finally {
    process.exit();
  }
};

const action = process.argv[2] as Action;
const migrationName = process.argv[3];

const hasAction = action === "up" || action === "down";

if (!hasAction) {
  console.log(`Invalid action: ${action}`);
  throw new Error(`Invalid action`);
}

runMigrations(action, migrationName);
