import { PoolConnection } from "mysql2/promise";
import { IRepository } from "../../../shared/interfaces";
import { PurchaseItem } from "../entities";

export interface IPurchaseItemsModel {
  id: number;
  purchase_id: number;
  product_id: number;
  product_name: string;
  amount: number;
  created_at: Date;
}

export interface IPurchaseItemsRepository extends IRepository<PurchaseItem> {
  createMany(
    purchaseItems: PurchaseItem[],
    poolConnection: PoolConnection
  ): Promise<void>;
}
