import { pool } from "../../../shared/config/db";
import { Purchase, PurchaseItem } from "../entities";
import { PurchasesModel } from "../models";
import { PurchaseItemsRepository } from "./purchase_items.repository";

export class PurchasesRepository {
  private _purchasesModel: PurchasesModel;
  private _purchaseItemsRepository: PurchaseItemsRepository;

  constructor(
    purchasesModel: PurchasesModel,
    purchaseItemsRepository: PurchaseItemsRepository
  ) {
    this._purchasesModel = purchasesModel;
    this._purchaseItemsRepository = purchaseItemsRepository;
  }

  async findByUserId(userId: number) {
    const purchasesModels = await this._purchasesModel.findByUserId(userId);

    const purchases = purchasesModels.map((purchase) => {
      const purchaseItem = purchase.items.map(
        (item) =>
          new PurchaseItem({
            id: item.id,
            amount: item.amount,
            productId: item.product_id,
            purchaseId: item.purchase_id,
            productName: item.product_name,
            createdAt: item.created_at,
          })
      );

      return new Purchase({
        id: purchase.id,
        userId: purchase.user_id,
        userName: purchase.user_name,
        items: purchaseItem,
        createdAt: purchase.created_at,
      });
    });

    return purchases;
  }

  async create(purchase: Purchase) {
    const poolConnection = await pool.getConnection();

    const data = purchase.toJSON();

    try {
      const purchaseModel = await this._purchasesModel.insert(
        {
          user_id: data.userId,
          user_name: data.userName,
        },
        poolConnection
      );

      const purchaseItemsModels =
        await this._purchaseItemsRepository.insertMany(
          data.items.map((item) => ({
            purchase_id: purchaseModel.id,
            amount: item.amount,
            product_id: item.productId,
            product_name: item.productName,
          })),
          poolConnection
        );

      await poolConnection.commit();

      const purchase = new Purchase({
        id: purchaseModel.id,
        userId: purchaseModel.user_id,
        userName: purchaseModel.user_name,
        createdAt: purchaseModel.created_at,
        items: purchaseItemsModels.map(
          (item) =>
            new PurchaseItem({
              id: item.id,
              purchaseId: item.purchase_id,
              amount: item.amount,
              productId: item.product_id,
              productName: item.product_name,
              createdAt: item.created_at,
            })
        ),
      });

      return purchase;
    } catch (error) {
      await poolConnection.rollback();
      throw error;
    } finally {
      poolConnection.release();
    }
  }

  async findById(id: number) {
    const foundPurchaseModel = await this._purchasesModel.findById(id);

    if (!foundPurchaseModel) return null;

    const purchaseItems = foundPurchaseModel.items.map(
      (item) =>
        new PurchaseItem({
          id: item.id,
          purchaseId: item.purchase_id,
          amount: item.amount,
          productId: item.product_id,
          productName: item.product_name,
          createdAt: item.created_at,
        })
    );

    return new Purchase({
      id: foundPurchaseModel.id,
      items: purchaseItems,
      userId: foundPurchaseModel.user_id,
      userName: foundPurchaseModel.user_name,
      createdAt: foundPurchaseModel.created_at,
    });
  }

  async delete(purchaseId: number) {
    await this._purchasesModel.delete(purchaseId);
  }
}
