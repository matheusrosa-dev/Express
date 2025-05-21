import { Request, Response } from "express";
import { PurchasesRepository } from "./repositories";
import { Purchase } from "./entities";

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

  async create(req: Request, res: Response) {
    const purchase = new Purchase(req.body);

    const newPurchase = await this._purchasesRepository.create(purchase);

    res.send({
      data: newPurchase.toJSON(),
    });
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
