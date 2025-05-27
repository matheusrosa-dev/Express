import CreateMigrationsTable from "./scripts/create_migrations_table";

import { migrations } from "./scripts";

import { Migration } from "./entities";
import { MigrationModel } from "./models";
import { MigrationsRepository } from "./repositories";

type Action = "up" | "down";

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

const runAllMigrations = async (action: Action) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};

const runMigrationByName = async (props: {
  action: Action;
  migrationName: string;
}) => {
  const { action, migrationName } = props;

  try {
    const foundMigration = migrations.find(
      (migration) => migration.migrationName === migrationName
    );

    if (!foundMigration) {
      throw new Error(`Migration ${migrationName} not found`);
    }

    if (action === "up") {
      await runUpMigration(foundMigration);
    }

    if (action === "down") {
      await runDownMigration(foundMigration);
    }
  } catch (error) {
    console.log(error);
  }
};

const action = process.argv[2] as Action;
const migrationName = process.argv[3];

const hasAction = action === "up" || action === "down";

if (!hasAction) {
  console.log(`Invalid action: ${action}`);
  throw new Error(`Invalid action`);
}

(async () => {
  if (action === "up") {
    await CreateMigrationsTable.up();
  }

  if (migrationName) {
    await runMigrationByName({ action, migrationName });
    process.exit();
  }

  await runAllMigrations(action);

  if (action === "down") {
    await CreateMigrationsTable.down();
  }

  process.exit();
})();
