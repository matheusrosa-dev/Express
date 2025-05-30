import { Purchase, PurchaseItem } from "./entities";
import { productsServices, usersServices } from "../../shared/services";
import { CreatePurchaseDto } from "./dtos";
import { IPurchasesRepository, IPurchasesService } from "./interfaces";
import { NotFoundError } from "../../shared/errors";
import { AppError } from "../../shared/classes";

export class PurchasesService implements IPurchasesService {
  constructor(private _purchasesRepository: IPurchasesRepository) {}

  async findByUserId(userId: number) {
    const purchases = await this._purchasesRepository.findByUserId(userId);

    if (!purchases.length) {
      throw new NotFoundError("The user has no purchases");
    }

    return {
      data: { purchases: purchases.map((purchase) => purchase.toJSON()) },
    };
  }

  async findById(purchaseId: number) {
    const foundPurchase = await this._purchasesRepository.findById(purchaseId);

    if (!foundPurchase) {
      throw new NotFoundError("Purchase not found");
    }

    return {
      data: foundPurchase.toJSON(),
    };
  }

  async create(dto: CreatePurchaseDto) {
    try {
      const [user, ...products] = await Promise.all([
        usersServices.findById(dto.userId),
        ...dto.items.map((item) => productsServices.findById(item.productId)),
      ]);

      await productsServices.decrementStock({
        items: dto.items,
      });

      const purchaseItems = products.map(
        (product) =>
          new PurchaseItem({
            productId: product.id,
            productName: product.name,
            amount: dto.items.find((item) => item.productId === product.id)!
              .amount,
          })
      );

      const purchase = new Purchase({
        userId: user.id,
        userName: user.name,
        items: purchaseItems,
      });

      const newPurchase = await this._purchasesRepository.create(purchase);

      return {
        data: newPurchase.toJSON(),
      };
    } catch (e: any) {
      throw new AppError({
        message: e?.response?.data?.message || "Internal server error",
        statusCode: e?.response?.status || 500,
      });
    }
  }

  async delete(purchaseId: number) {
    const foundPurchase = await this._purchasesRepository.findById(purchaseId);

    if (!foundPurchase) {
      throw new NotFoundError("Purchase not found");
    }

    await this._purchasesRepository.delete(purchaseId);
  }
}
