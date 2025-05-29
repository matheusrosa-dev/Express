import { User } from "../entities";
import { pool } from "../../../shared/config/db";
import { IUsersModel, IUsersRepository } from "../interfaces";

//TODO: substituir query por execute
export class UsersRepository implements IUsersRepository {
  private _tableName = "users";

  async findAll() {
    const [rows] = await pool.query(`SELECT * FROM ${this._tableName}`);

    const models = rows as IUsersModel[];

    const entities = models.map(
      (model) =>
        new User({
          id: model.id,
          name: model.name,
          createdAt: model.created_at,
        })
    );

    return entities;
  }

  async findById(userId: number) {
    const [rows] = await pool.execute(
      `SELECT * FROM ${this._tableName} WHERE id = ?`,
      [userId]
    );

    const row = (rows as IUsersModel[])[0];

    if (!row) return null;

    return new User({
      id: row.id,
      name: row.name,
      createdAt: row.created_at,
    });
  }

  async create(user: User) {
    const dataToInsert = {
      name: user.toJSON().name,
    };

    const [insertResult]: any = await pool.query(
      `INSERT INTO ${this._tableName} SET ?`,
      dataToInsert
    );

    const createdUser = await this.findById(insertResult.insertId);

    return createdUser!;
  }

  async delete(userId: number) {
    await pool.query(`DELETE FROM ${this._tableName} WHERE id = ?`, [userId]);
  }
}
