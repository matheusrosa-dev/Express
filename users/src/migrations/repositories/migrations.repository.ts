import { pool } from "../../shared/config/db";
import { IRepository } from "../../shared/interfaces";
import { Migration } from "../entities";
import { IMigrationsModel } from "../interfaces";

//TODO: substituir query por execute
export class MigrationsRepository implements IRepository<Migration> {
  private _tableName = "migrations";

  async findAll() {
    const [rows] = await pool.query(`SELECT * FROM ${this._tableName}`);

    const models = rows as IMigrationsModel[];

    const entities = models.map(
      (model) =>
        new Migration({
          id: model.id,
          name: model.name,
          createdAt: model.created_at,
        })
    );

    return entities;
  }

  async findByName(name: string) {
    const [rows] = await pool.execute(
      "SELECT * FROM migrations WHERE name = ?",
      [name]
    );

    const migration = (rows as IMigrationsModel[])[0];

    if (!migration) return null;

    return new Migration({
      ...migration,
      createdAt: migration.created_at,
    });
  }

  async findById(id: number) {
    const [rows] = await pool.execute(
      `SELECT * FROM ${this._tableName} WHERE id = ?`,
      [id]
    );

    const model = (rows as IMigrationsModel[])[0];

    if (!model) return null;

    return new Migration({
      id: model.id,
      name: model.name,
      createdAt: model.created_at,
    });
  }

  async create(migration: Migration) {
    const dataToInsert = {
      name: migration.toJSON().name,
    };

    const [insertResult]: any = await pool.query(
      `INSERT INTO ${this._tableName} SET ?`,
      dataToInsert
    );

    const createdMigration = await this.findById(insertResult.insertId);

    return createdMigration!;
  }

  async delete(id: number) {
    await pool.query(`DELETE FROM ${this._tableName} WHERE id = ?`, [id]);
  }
}
