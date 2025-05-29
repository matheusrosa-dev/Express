import { PoolConnection } from "mysql2/promise";
import { pool } from "../config/db";

type CreateUpdateData<ModelProps> = Omit<ModelProps, "id" | "createdAt">;

//TODO: substituir query por execute
export abstract class Model<ModelProps> {
  protected _tableName: string;

  constructor(tableName: string) {
    if (!tableName) {
      throw new Error("Table name is required");
    }
    this._tableName = tableName;
  }

  async insert(
    data: CreateUpdateData<ModelProps>,
    poolConnection?: PoolConnection
  ) {
    const [insertResult]: any = await (poolConnection || pool).query(
      `INSERT INTO ${this._tableName} SET ?`,
      data
    );

    const model = await this.findById(insertResult.insertId);

    return model;
  }

  async update(id: number, data: CreateUpdateData<ModelProps>) {
    await pool.query(`UPDATE ${this._tableName} SET ? WHERE id = ?`, [
      data,
      id,
    ]);

    const model = await this.findById(id);

    return model;
  }

  async delete(id: number) {
    await pool.query(`DELETE FROM ${this._tableName} WHERE id = ?`, [id]);
  }

  async findAll() {
    const [rows] = await pool.query(`SELECT * FROM ${this._tableName}`);

    const models = rows as ModelProps[];

    return models;
  }

  async findById(id: number) {
    const [rows] = await pool.execute(
      `SELECT * FROM ${this._tableName} WHERE id = ?`,
      [id]
    );

    const model = (rows as ModelProps[])[0];

    return model;
  }
}
