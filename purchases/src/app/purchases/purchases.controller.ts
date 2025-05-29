import { Request, Response } from "express";
import { IPurchasesService } from "./interfaces";
import { CreatePurchaseDto } from "./dtos";

interface IPurchasesController {
  findByUserId(req: Request, res: Response): Promise<void>;
  findById(req: Request, res: Response): Promise<void>;
  create(req: Request, res: Response): Promise<void>;
  delete(req: Request, res: Response): Promise<void>;
}

export class PurchasesController implements IPurchasesController {
  constructor(private _purchasesService: IPurchasesService) {}

  async findByUserId(req: Request, res: Response) {
    const userId = Number(req.params.userId);

    const response = await this._purchasesService.findByUserId(userId);

    if (response?.message === "The user has no purchases") {
      res.status(404).send(response);
      return;
    }

    res.status(200).send(response);
  }

  async findById(req: Request, res: Response) {
    const purchaseId = Number(req.params.purchaseId);

    const response = await this._purchasesService.findById(purchaseId);

    if (response?.message === "Purchase not found") {
      res.status(404).send(response);
      return;
    }

    res.status(200).send(response);
  }

  async create(req: Request, res: Response) {
    const dto = req.body as CreatePurchaseDto;

    const response = await this._purchasesService.create(dto);

    if (response?.message === "Internal server error") {
      res.status(500).send(response);
      return;
    }

    if (response?.message) {
      res.status(400).send(response);
      return;
    }

    res.status(201).send(response);
  }

  async delete(req: Request, res: Response) {
    const purchaseId = Number(req.params.purchaseId);

    const response = await this._purchasesService.delete(purchaseId);

    if (response?.message === "Purchase not found") {
      res.status(404).send(response);
      return;
    }

    res.status(204).send();
  }
}
