import { User } from "../../../domain/user.entity";
import { IUserRepository } from "../../../domain/user.repository";
import mysql from "mysql2/promise";
import { Model, ModelMapper } from "./user-model.mapper";
import { Uuid } from "../../../../shared/domain/value-objects";

export class UserMySQLRepository implements IUserRepository {
  private _tableName = "users";

  constructor(private _connection: mysql.Pool) {}

  async insert(entity: User) {
    const model = ModelMapper.toModel(entity);

    const [insertResult]: any = await this._connection.execute(
      `INSERT INTO ${this._tableName} SET ?`,
      model
    );

    const user = await this.findById(insertResult.insertId);

    return user!;
  }

  async findById(id: Uuid) {
    const [rows] = await this._connection.execute(
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

    await this._connection.query(
      `UPDATE ${this._tableName} SET ? WHERE id = ?`,
      [model, entity.id.id]
    );

    const updatedUser = await this.findById(entity.id);

    return updatedUser!;
  }

  async findAll() {
    const [rows] = await this._connection.query(
      `SELECT * FROM ${this._tableName}`
    );

    const models = rows as Model[];

    const entities = models.map((model) => ModelMapper.toEntity(model));

    return entities;
  }

  async delete(id: Uuid) {
    await this._connection.query(
      `DELETE FROM ${this._tableName} WHERE id = ?`,
      [id.id]
    );
  }
}
