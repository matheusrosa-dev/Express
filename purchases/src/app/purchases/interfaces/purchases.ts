import { Request, Response, NextFunction } from "express";
import { IRepository } from "../../../shared/interfaces";
import { CreatePurchaseDto } from "../dtos";
import { Purchase } from "../entities";
import { IPurchaseItemsModel } from "./purchase_items";

export interface IPurchasesModel {
  id: number;
  user_id: number;
  user_name: string;
  created_at: Date;
  items: IPurchaseItemsModel[];
}

export interface IPurchasesRepository extends IRepository<Purchase> {
  findByUserId(userId: number): Promise<Purchase[]>;
  create(purchase: Purchase): Promise<Purchase>;
  findById(purchaseId: number): Promise<Purchase | null>;
  delete(purchaseId: number): Promise<void>;
}

type ProductJSON = ReturnType<Purchase["toJSON"]>;

export interface IPurchasesService {
  findByUserId(userId: number): Promise<{ data: { purchases: ProductJSON[] } }>;
  findById(purchaseId: number): Promise<{ data: ProductJSON }>;
  create(dto: CreatePurchaseDto): Promise<{ data: ProductJSON }>;
  delete(purchaseId: number): Promise<void>;
}

export interface IPurchasesController {
  findByUserId(req: Request, res: Response, next: NextFunction): Promise<void>;
  findById(req: Request, res: Response, next: NextFunction): Promise<void>;
  create(req: Request, res: Response, next: NextFunction): Promise<void>;
  delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}
