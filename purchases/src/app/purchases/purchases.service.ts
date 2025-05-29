import { Purchase, PurchaseItem } from "./entities";
import { productsServices, usersServices } from "../../shared/services";
import { CreatePurchaseDto } from "./dtos";
import { IPurchasesRepository, IPurchasesService } from "./interfaces";

export class PurchasesService implements IPurchasesService {
  constructor(private _purchasesRepository: IPurchasesRepository) {}

  async findByUserId(userId: number) {
    const purchases = await this._purchasesRepository.findByUserId(userId);

    if (!purchases.length) {
      return {
        data: null,
        message: "The user has no purchases",
      };
    }

    return {
      data: { purchases: purchases.map((purchase) => purchase.toJSON()) },
    };
  }

  async findById(purchaseId: number) {
    const foundPurchase = await this._purchasesRepository.findById(purchaseId);

    if (!foundPurchase) {
      return {
        data: null,
        message: "Purchase not found",
      };
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
      const response: {
        status?: number;
        data?: {
          message?: string;
        };
      } = e?.response;

      if (response?.data?.message) {
        return {
          data: null,
          message: response.data.message,
        };
      }

      console.log(e);

      return {
        data: null,
        message: "Internal server error",
      };
    }
  }

  async delete(purchaseId: number) {
    const foundPurchase = await this._purchasesRepository.findById(purchaseId);

    if (!foundPurchase) {
      return {
        data: null,
        message: "Purchase not found",
      };
    }

    await this._purchasesRepository.delete(purchaseId);
  }
}
