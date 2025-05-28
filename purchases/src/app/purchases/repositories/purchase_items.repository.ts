import { PoolConnection } from "mysql2/promise";
import {
  IPurchaseItemsModelProps,
  PurchaseItemsModel,
} from "../models/purchase_items.model";

type CreateUpdateData = Omit<
  Omit<IPurchaseItemsModelProps, "id">,
  "created_at"
>;

export class PurchaseItemsRepository {
  private _purchaseItemsModel: PurchaseItemsModel;

  constructor(purchaseItemsModel: PurchaseItemsModel) {
    this._purchaseItemsModel = purchaseItemsModel;
  }

  async insertMany(data: CreateUpdateData[], poolConnection: PoolConnection) {
    const models = await this._purchaseItemsModel.insertMany(
      data.map((item) => ({
        purchase_id: item.purchase_id,
        amount: item.amount,
        product_id: item.product_id,
        product_name: item.product_name,
      })),
      poolConnection
    );

    return models;
  }
}
