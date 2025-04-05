import { migrations } from "./scripts";

import { Migration } from "./entities";
import { MigrationModel } from "./models";
import { MigrationsRepository } from "./repositories";
import CreateMigrationsTable from "./scripts/create_migrations_table";

const migrationModel = new MigrationModel();
const migrationRepository = new MigrationsRepository(migrationModel);

const runMigrations = async () => {
  try {
    await CreateMigrationsTable.up();

    for (const migration of migrations) {
      const foundMigration = await migrationRepository.findByName(
        migration.migrationName
      );

      if (foundMigration) continue;

      const migrationEntity = new Migration({
        name: migration.migrationName,
      });

      await migration.up();
      await migrationRepository.create(migrationEntity);
    }
  } catch (error) {
    console.log(error);
  }
};

runMigrations();
