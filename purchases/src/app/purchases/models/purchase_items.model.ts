import { PoolConnection } from "mysql2/promise";
import { Model } from "../../../shared/classes";

export interface IPurchaseItemsModelProps {
  id: number;
  purchase_id: number;
  product_id: number;
  product_name: string;
  amount: number;
  created_at: Date;
}

type CreateUpdateData = Omit<
  Omit<IPurchaseItemsModelProps, "id">,
  "created_at"
>;

//TODO: substituir query por execute
export class PurchaseItemsModel extends Model<IPurchaseItemsModelProps> {
  constructor() {
    super("purchase_items");
  }

  async findByPurchaseId(purchase_id: number, poolConnection: PoolConnection) {
    const [rows] = await poolConnection.execute(
      `SELECT * FROM ${this._tableName} WHERE purchase_id = ?`,
      [purchase_id]
    );

    const model = rows as IPurchaseItemsModelProps[];

    return model;
  }

  async insertMany(data: CreateUpdateData[], poolConnection: PoolConnection) {
    const values = data.map((item) => [
      item.purchase_id,
      item.product_id,
      item.product_name,
      item.amount,
    ]);

    await poolConnection.query(
      `INSERT INTO ${this._tableName} (purchase_id, product_id, product_name, amount) VALUES ?`,
      [values]
    );

    const purchaseId = data[0].purchase_id;

    const models = await this.findByPurchaseId(purchaseId, poolConnection);

    return models;
  }
}
