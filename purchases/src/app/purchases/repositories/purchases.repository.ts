import { Purchase } from "../entities";
import { PurchasesModel } from "../models";

export class PurchasesRepository {
  private _purchasesModel: PurchasesModel;

  constructor(purchasesModel: PurchasesModel) {
    this._purchasesModel = purchasesModel;
  }

  async findAll() {
    const purchases = await this._purchasesModel.findAll();

    const entities = purchases.map(
      (purchase) =>
        new Purchase({
          ...purchase,
          productId: purchase.product_id,
          productName: purchase.product_name,
          userId: purchase.user_id,
          userName: purchase.user_name,
          createdAt: purchase.created_at,
        })
    );

    return entities;
  }

  async create(purchase: Purchase) {
    const data = purchase.toJSON();

    const model = await this._purchasesModel.insert({
      amount: data.amount,
      product_id: data.productId,
      product_name: data.productName,
      user_id: data.userId,
      user_name: data.userName,
    });

    return new Purchase({
      ...model,
      productId: model.product_id,
      productName: model.product_name,
      userId: model.user_id,
      userName: model.user_name,
      createdAt: model.created_at,
    });
  }

  async findById(id: number) {
    const foundPurchaseModel = await this._purchasesModel.findById(id);

    if (!foundPurchaseModel) return null;

    return new Purchase({
      ...foundPurchaseModel,
      productId: foundPurchaseModel.product_id,
      productName: foundPurchaseModel.product_name,
      userId: foundPurchaseModel.user_id,
      userName: foundPurchaseModel.user_name,
      createdAt: foundPurchaseModel.created_at,
    });
  }

  async delete(purchaseId: number) {
    await this._purchasesModel.delete(purchaseId);
  }
}
