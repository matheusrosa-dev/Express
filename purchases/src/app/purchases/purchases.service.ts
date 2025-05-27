import { Request, Response } from "express";
import { PurchasesRepository } from "./repositories";
import { Purchase } from "./entities";
import { productsServices, usersServices } from "../../shared/services";

export class PurchasesService {
  private _purchasesRepository: PurchasesRepository;

  constructor(purchasesRepository: PurchasesRepository) {
    this._purchasesRepository = purchasesRepository;
  }

  async findAll(_req: Request, res: Response) {
    const purchases = await this._purchasesRepository.findAll();

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
    try {
      const [user, product] = await Promise.all([
        usersServices.findById(req.body.userId),
        productsServices.findById(req.body.productId),
      ]);

      if (req.body.amount > product.stock) {
        res
          .status(400)
          .send({ message: "Product stock is not enough", data: null });

        return;
      }

      await productsServices.decrementStock(product.id, {
        amount: req.body.amount,
      });

      const purchase = new Purchase({
        amount: req.body.amount,
        productId: product.id,
        productName: product.name,
        userId: user.id,
        userName: user.name,
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
