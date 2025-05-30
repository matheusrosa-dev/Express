import { NextFunction, Request, Response } from "express";
import { IPurchasesController, IPurchasesService } from "./interfaces";
import { CreatePurchaseDto } from "./dtos";
import { BadRequestError } from "../../shared/errors";

export class PurchasesController implements IPurchasesController {
  constructor(private _purchasesService: IPurchasesService) {}

  async findByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.userId);

      if (isNaN(userId)) {
        throw new BadRequestError("Invalid user id");
      }

      const response = await this._purchasesService.findByUserId(userId);

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const purchaseId = Number(req.params.purchaseId);

      if (isNaN(purchaseId)) {
        throw new BadRequestError("Invalid purchase id");
      }

      const response = await this._purchasesService.findById(purchaseId);

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as CreatePurchaseDto;

      const response = await this._purchasesService.create(dto);

      res.status(201).send(response);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const purchaseId = Number(req.params.purchaseId);

      if (isNaN(purchaseId)) {
        throw new BadRequestError("Invalid purchase id");
      }

      await this._purchasesService.delete(purchaseId);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
