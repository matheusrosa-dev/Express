import { pool } from "../../shared/config/db";
import { Migration } from "../entities";
import { MigrationModel } from "../models";

export class MigrationsRepository {
  private _migrationModel: MigrationModel;

  constructor(migrationModel: MigrationModel) {
    this._migrationModel = migrationModel;
  }

  async findAll() {
    const migrations = await this._migrationModel.findAll();

    const entities = migrations.map(
      (migration) =>
        new Migration({
          ...migration,
          createdAt: migration.created_at,
        })
    );

    return entities;
  }

  async findByName(name: string) {
    const [rows]: any = await pool.execute(
      "SELECT * FROM migrations WHERE name = ?",
      [name]
    );

    const migration = rows[0];

    if (!migration) return null;

    return new Migration({
      ...migration,
      createdAt: migration.created_at,
    });
  }

  async create(migration: Migration) {
    const data = migration.toJSON();

    const model = await this._migrationModel.insert({
      name: data.name,
    });

    return new Migration({
      ...model,
      createdAt: model.created_at,
    });
  }

  delete(id: number) {
    return this._migrationModel.delete(id);
  }
}
