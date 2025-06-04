import { Model, ModelMapper } from "./user-model.mapper";
import { Uuid } from "../../../../shared/domain/value-objects";
import { mysqlPool } from "../../../../shared/infra/db/my-sql/connection";
import { IUserRepository } from "../../../../domain/user/user.repository";
import { User } from "../../../../domain/user/user.entity";

export class UserMySQLRepository implements IUserRepository {
  private _tableName = "users";

  get tableName() {
    return this._tableName;
  }

  async insert(entity: User) {
    const model = ModelMapper.toModel(entity);

    const columns = Object.keys(model);
    const placeholders = columns.map(() => "?").join(", ");
    const values = Object.values(model);

    await mysqlPool.execute(
      `INSERT INTO ${this._tableName} (${columns.join(
        ", "
      )}) VALUES (${placeholders})`,
      values
    );

    const user = await this.findById(entity.id);

    return user!;
  }

  async findById(id: Uuid) {
    const [rows] = await mysqlPool.execute(
      `SELECT * FROM ${this._tableName} WHERE id = ?`,
      [id.id]
    );

    const model = (rows as Model[])[0];

    if (!model) return null;

    const user = ModelMapper.toEntity(model);

    return user;
  }

  async update(entity: User) {
    const model = ModelMapper.toModel(entity);

    // @ts-expect-error - ID must not be updated
    delete model.id;

    const columns = Object.keys(model);
    const setClause = columns.map((col) => `${col} = ?`).join(", ");
    const values = [...Object.values(model), entity.id.id];

    await mysqlPool.execute(
      `UPDATE ${this._tableName} SET ${setClause} WHERE id = ?`,
      values
    );

    const updatedUser = await this.findById(entity.id);

    return updatedUser!;
  }

  async findAll() {
    const [rows] = await mysqlPool.execute(`SELECT * FROM ${this._tableName}`);

    const models = rows as Model[];

    const entities = models.map((model) => ModelMapper.toEntity(model));

    return entities;
  }

  async delete(id: Uuid) {
    await mysqlPool.execute(`DELETE FROM ${this._tableName} WHERE id = ?`, [
      id.id,
    ]);
  }
}
