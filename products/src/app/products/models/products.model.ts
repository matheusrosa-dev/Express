import { PoolConnection } from "mysql2/promise";
import { Model } from "../../../shared/classes";
import { pool } from "../../../shared/config/db";

interface IProductModelProps {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  created_at: Date;
}

export class ProductsModel extends Model<IProductModelProps> {
  constructor() {
    super("products");
  }

  async findManyByIds(productIds: number[]) {
    const placeholders = productIds.map(() => "?").join(",");

    const [rows] = await pool.execute(
      `SELECT * FROM ${this._tableName} WHERE id IN (${placeholders})`,
      productIds
    );

    const models = rows as IProductModelProps[];

    return models;
  }

  async decrementProductsStock(props: {
    items: {
      productId: number;
      amount: number;
    }[];
  }) {
    const { items } = props;
    const poolConnection = await pool.getConnection();

    const productIds = items.map((item) => item.productId);
    const params = items.flatMap((item) => [item.productId, item.amount]);

    const cases = items.map(() => `WHEN ? THEN stock - ?`).join(" ");
    const placeholders = productIds.map(() => "?").join(",");

    try {
      await poolConnection.execute(
        `UPDATE products
        SET stock = CASE id
        ${cases}
        ELSE stock
        END
        WHERE id IN (${placeholders});`,
        [...params, ...productIds]
      );

      const models = await this.findManyByIds(productIds);

      await poolConnection.commit();

      return models;
    } catch (error) {
      await poolConnection.rollback();
      throw error;
    } finally {
      poolConnection.release();
    }
  }
}
