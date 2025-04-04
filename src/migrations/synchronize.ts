import CreateMigrationsTable from "./create_migrations_table";
import CreateProductsTable from "./create_products_table";
import CreateUsersTable from "./create_users_table";

const migrations = [CreateProductsTable, CreateUsersTable];

const runMigrations = async () => {
  try {
    await CreateMigrationsTable.up();

    for (const migration of migrations) {
      await migration.up();
    }
  } catch (error) {
    console.log(error);
  }
};

runMigrations();
