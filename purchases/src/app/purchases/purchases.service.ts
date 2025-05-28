import { Request, Response } from "express";
import { PurchasesRepository } from "./repositories";
import { Purchase, PurchaseItem } from "./entities";
import { productsServices, usersServices } from "../../shared/services";
import { CreatePurchaseDto } from "./dtos";

export class PurchasesService {
  private _purchasesRepository: PurchasesRepository;

  constructor(purchasesRepository: PurchasesRepository) {
    this._purchasesRepository = purchasesRepository;
  }

  async findByUserId(req: Request, res: Response) {
    const userId = Number(req.params.userId);

    const purchases = await this._purchasesRepository.findByUserId(userId);

    if (!purchases.length) {
      res
        .status(404)
        .send({ message: "The user has no purchases", data: null });
      return;
    }

    res.send({
      data: { purchases: purchases.map((purchase) => purchase.toJSON()) },
    });
  }

  async findById(req: Request, res: Response) {
    const purchaseId = Number(req.params.purchaseId);

    const foundPurchase = await this._purchasesRepository.findById(purchaseId);

    if (!foundPurchase) {
      res.status(404).send({ message: "Purchase not found", data: null });
      return;
    }

    res.send({
      data: foundPurchase.toJSON(),
    });
  }

  async create(req: Request, res: Response) {
    const body = req.body as CreatePurchaseDto;

    try {
      const [user, ...products] = await Promise.all([
        usersServices.findById(body.userId),
        ...body.items.map((item) => productsServices.findById(item.productId)),
      ]);

      await productsServices.decrementStock({
        items: body.items,
      });

      const purchaseItems = products.map(
        (product) =>
          new PurchaseItem({
            productId: product.id,
            productName: product.name,
            amount: body.items.find((item) => item.productId === product.id)!
              .amount,
          })
      );

      const purchase = new Purchase({
        userId: user.id,
        userName: user.name,
        items: purchaseItems,
      });

      const newPurchase = await this._purchasesRepository.create(purchase);

      res.send({
        data: newPurchase.toJSON(),
      });
    } catch (e: any) {
      const response: {
        status?: number;
        data?: {
          message?: string;
        };
      } = e?.response;

      if (response?.status && response?.data?.message) {
        res
          .status(response.status)
          .send({ message: response.data.message, data: null });
        return;
      }

      console.log(e);

      res.status(500).send({ message: "Internal server error", data: null });
    }
  }

  async delete(req: Request, res: Response) {
    const purchaseId = Number(req.params.purchaseId);

    const foundPurchase = await this._purchasesRepository.findById(purchaseId);

    if (!foundPurchase) {
      res.status(404).send({ message: "Purchase not found", data: null });
      return;
    }

    await this._purchasesRepository.delete(purchaseId);

    res.status(204).send();
  }
}
