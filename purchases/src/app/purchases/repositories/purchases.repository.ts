import { pool } from "../../../shared/config/db";
import { Purchase, PurchaseItem } from "../entities";
import {
  IPurchaseItemsRepository,
  IPurchasesModel,
  IPurchasesRepository,
} from "../interfaces";

//TODO: substituir query por execute
export class PurchasesRepository implements IPurchasesRepository {
  private _tableName = "purchases";

  constructor(private _purchaseItemsRepository: IPurchaseItemsRepository) {}

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

    const models = rows as IPurchasesModel[];

    const purchases = models.map((model) => {
      const purchaseItems = model.items.map(
        (itemModel) =>
          new PurchaseItem({
            id: itemModel.id,
            amount: itemModel.amount,
            productId: itemModel.product_id,
            purchaseId: itemModel.purchase_id,
            productName: itemModel.product_name,
            createdAt: itemModel.created_at,
          })
      );

      return new Purchase({
        id: model.id,
        userId: model.user_id,
        userName: model.user_name,
        items: purchaseItems,
        createdAt: model.created_at,
      });
    });

    return purchases;
  }

  async create(purchase: Purchase) {
    const poolConnection = await pool.getConnection();

    try {
      const purchaseJson = purchase.toJSON();

      const purchaseDataToInsert = {
        user_id: purchaseJson.userId,
        user_name: purchaseJson.userName,
      };

      poolConnection.beginTransaction();

      const [insertResult]: any = await poolConnection.query(
        `INSERT INTO ${this._tableName} SET ?`,
        purchaseDataToInsert
      );

      const purchaseId = insertResult.insertId as number;

      const purchaseItems = purchaseJson.items.map(
        (purchaseItem) =>
          new PurchaseItem({
            purchaseId: purchaseId,
            productId: purchaseItem.productId,
            productName: purchaseItem.productName,
            amount: purchaseItem.amount,
          })
      );

      await this._purchaseItemsRepository.createMany(
        purchaseItems,
        poolConnection
      );

      await poolConnection.commit();

      const createdPurchase = await this.findById(insertResult.insertId);

      return createdPurchase!;
    } catch (error) {
      poolConnection.rollback();
      throw error;
    } finally {
      poolConnection.release();
    }
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

    const model = (rows as IPurchasesModel[])[0];

    if (!model) return null;

    const purchaseItems = model.items.map(
      (itemModel) =>
        new PurchaseItem({
          id: itemModel.id,
          purchaseId: itemModel.purchase_id,
          amount: itemModel.amount,
          productId: itemModel.product_id,
          productName: itemModel.product_name,
          createdAt: itemModel.created_at,
        })
    );

    const purchase = new Purchase({
      id: model.id,
      items: purchaseItems,
      userId: model.user_id,
      userName: model.user_name,
      createdAt: model.created_at,
    });

    return purchase;
  }

  async delete(purchaseId: number) {
    await pool.query(`DELETE FROM ${this._tableName} WHERE id = ?`, [
      purchaseId,
    ]);
  }

  findAll(): Promise<Purchase[]> {
    throw new Error("Method not implemented.");
  }

  update(): Promise<Purchase> {
    throw new Error("Method not implemented.");
  }
}
