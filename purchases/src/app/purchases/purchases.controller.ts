import { NextFunction, Request, Response } from "express";
import { IPurchasesController, IPurchasesService } from "./interfaces";
import {
  CreatePurchaseDto,
  DeletePurchaseDto,
  FindPurchaseByIdDto,
  FindPurchasesByUserIdDto,
} from "./dtos";
import { BadRequestError } from "../../shared/errors";

export class PurchasesController implements IPurchasesController {
  constructor(private _purchasesService: IPurchasesService) {}

  async findByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params as unknown as FindPurchasesByUserIdDto;

      const response = await this._purchasesService.findByUserId(userId);

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { purchaseId } = req.params as unknown as FindPurchaseByIdDto;

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
      const { purchaseId } = req.params as unknown as DeletePurchaseDto;

      await this._purchasesService.delete(purchaseId);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
