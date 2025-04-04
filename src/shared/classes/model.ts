import { pool } from "../../config/db";

type CreateUpdateData<ModelProps> = Omit<Omit<ModelProps, "id">, "created_at">;

export abstract class Model<ModelProps> {
  private _tableName: string;

  constructor(tableName: string) {
    if (!tableName) {
      throw new Error("Table name is required");
    }
    this._tableName = tableName;
  }

  async insert(data: CreateUpdateData<ModelProps>) {
    const [insertResult]: any = await pool.query(
      `INSERT INTO ${this._tableName} SET ?`,
      data
    );

    const model = await this.selectById(insertResult.insertId);

    return model;
  }

  update(data: CreateUpdateData<ModelProps>) {
    console.log(`INSERT INTO ${this._tableName} SET ?`, data);

    return {} as ModelProps;
  }

  async delete(id: number) {
    await pool.query(`DELETE FROM ${this._tableName} WHERE id = ?`, [id]);
  }

  findAll() {
    console.log(`SELECT * FROM ${this._tableName}`);

    return [] as ModelProps[];
  }

  async selectById(id: number) {
    const [rows] = await pool.execute("SELECT * FROM migrations WHERE id = ?", [
      id,
    ]);

    const model = (rows as ModelProps[])[0];

    return model;
  }
}
