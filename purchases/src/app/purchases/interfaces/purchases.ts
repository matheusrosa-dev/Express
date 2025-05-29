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
  findByUserId(
    userId: number
  ): Promise<{ data: { purchases: ProductJSON[] } | null; message?: string }>;

  findById(
    purchaseId: number
  ): Promise<{ data: ProductJSON | null; message?: string }>;

  create(
    dto: CreatePurchaseDto
  ): Promise<{ data: ProductJSON | null; message?: string }>;

  delete(purchaseId: number): Promise<{ message?: string; data: null } | void>;
}
