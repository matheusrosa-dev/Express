import { PoolConnection } from "mysql2/promise";
import { PurchaseItem } from "../entities";
import { IPurchaseItemsRepository } from "../interfaces";

//TODO: substituir query por execute
export class PurchaseItemsRepository implements IPurchaseItemsRepository {
  private _tableName = "purchase_items";

  async createMany(
    purchaseItems: PurchaseItem[],
    poolConnection: PoolConnection
  ) {
    const dataJson = purchaseItems.map((purchaseItem) => purchaseItem.toJSON());

    const values = dataJson.map((item) => [
      item.purchaseId,
      item.productId,
      item.productName,
      item.amount,
    ]);

    await poolConnection.query(
      `INSERT INTO ${this._tableName} (purchase_id, product_id, product_name, amount) VALUES ?`,
      [values]
    );
  }

  create(): Promise<PurchaseItem> {
    throw new Error("Method not implemented.");
  }

  update(): Promise<PurchaseItem> {
    throw new Error("Method not implemented.");
  }

  delete(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  findAll(): Promise<PurchaseItem[]> {
    throw new Error("Method not implemented.");
  }

  findById(): Promise<PurchaseItem> {
    throw new Error("Method not implemented.");
  }
}
