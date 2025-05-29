import { pool } from "../../../shared/config/db";
import { Product } from "../entities";
import { IProductsModel, IProductsRepository } from "../interfaces";

//TODO: substituir query por execute
export class ProductsRepository implements IProductsRepository {
  private _tableName = "products";

  async findAll() {
    const [rows] = await pool.query(`SELECT * FROM ${this._tableName}`);

    const models = rows as IProductsModel[];

    const products = models.map(
      (model) =>
        new Product({
          id: model.id,
          name: model.name,
          description: model.description,
          price: model.price,
          stock: model.stock,
          createdAt: model.created_at,
        })
    );

    return products;
  }

  async create(product: Product) {
    const dataJson = product.toJSON();

    const dataToInsert = {
      name: dataJson.name,
      description: dataJson.description,
      price: dataJson.price,
      stock: dataJson.stock,
    };

    const [insertResult]: any = await pool.query(
      `INSERT INTO ${this._tableName} SET ?`,
      dataToInsert
    );

    const createdProduct = await this.findById(insertResult.insertId);

    return createdProduct!;
  }

  async findById(productId: number) {
    const [rows] = await pool.execute(
      `SELECT * FROM ${this._tableName} WHERE id = ?`,
      [productId]
    );

    const model = (rows as IProductsModel[])[0];

    if (!model) return null;

    return new Product({
      id: model.id,
      name: model.name,
      description: model.description,
      price: model.price,
      stock: model.stock,
      createdAt: model.created_at,
    });
  }

  async findManyByIds(productIds: number[]) {
    const placeholders = productIds.map(() => "?").join(",");

    const [rows] = await pool.execute(
      `SELECT * FROM ${this._tableName} WHERE id IN (${placeholders})`,
      productIds
    );

    const models = rows as IProductsModel[];

    if (!models) return [];

    const products = models.map(
      (model) =>
        new Product({
          id: model.id,
          name: model.name,
          description: model.description,
          price: model.price,
          stock: model.stock,
          createdAt: model.created_at,
        })
    );

    return products;
  }

  async update(data: Product) {
    const dataJson = data.toJSON();
    const productId = dataJson.id!;

    const dataToInsert = {
      name: dataJson.name,
      description: dataJson.description,
      price: dataJson.price,
      stock: dataJson.stock,
    };

    await pool.query(`UPDATE ${this._tableName} SET ? WHERE id = ?`, [
      dataToInsert,
      productId,
    ]);

    const product = await this.findById(productId);

    return product!;
  }

  async delete(productId: number) {
    await pool.query(`DELETE FROM ${this._tableName} WHERE id = ?`, [
      productId,
    ]);
  }

  async decrementProductsStock(props: {
    items: { productId: number; amount: number }[];
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

      const products = await this.findManyByIds(productIds);

      await poolConnection.commit();

      return products;
    } catch (error) {
      await poolConnection.rollback();
      throw error;
    } finally {
      poolConnection.release();
    }
  }
}
