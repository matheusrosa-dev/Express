import { Model } from "../../../shared/classes";
import { pool } from "../../../shared/config/db";
import { IPurchaseItemsModelProps } from "./purchase_items.model";

interface IPurchasesModelProps {
  id: number;
  user_id: number;
  user_name: string;
  created_at: Date;
}

interface IPurchasesModelPropsWithItems extends IPurchasesModelProps {
  items: IPurchaseItemsModelProps[];
}

//TODO: substituir query por execute
export class PurchasesModel extends Model<IPurchasesModelProps> {
  constructor() {
    super("purchases");
  }

  async findByUserId(userId: number) {
    const [rows] = await pool.query(
      `SELECT purchase.*, 
    JSON_ARRAYAGG(
      JSON_OBJECT(
        'id', purchase_item.id,
        'purchase_id', purchase_item.purchase_id,
        'product_id', purchase_item.product_id,
        'product_name', purchase_item.product_name,
        'amount', purchase_item.amount,
        'created_at', purchase_item.created_at
      )
    ) AS items
    FROM purchases purchase
    LEFT JOIN purchase_items purchase_item ON purchase.id = purchase_item.purchase_id
    WHERE purchase.user_id = ?
    GROUP BY purchase.id`,
      [userId]
    );

    const models = rows as IPurchasesModelPropsWithItems[];

    return models;
  }

  async findById(purchaseId: number) {
    const [rows] = await pool.query(
      `SELECT purchase.*, 
    JSON_ARRAYAGG(
      JSON_OBJECT(
        'id', purchase_item.id,
        'purchase_id', purchase_item.purchase_id,
        'product_id', purchase_item.product_id,
        'product_name', purchase_item.product_name,
        'amount', purchase_item.amount,
        'created_at', purchase_item.created_at
      )
    ) AS items
    FROM purchases purchase
    LEFT JOIN purchase_items purchase_item ON purchase.id = purchase_item.purchase_id
    WHERE purchase.id = ?
    GROUP BY purchase.id`,
      [purchaseId]
    );

    const model = (rows as IPurchasesModelPropsWithItems[])[0];

    return model;
  }
}
