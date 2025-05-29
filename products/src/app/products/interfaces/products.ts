import { IRepository } from "../../../shared/interfaces";
import { CreateProductDto, DecrementStockDto, UpdateProductDto } from "../dtos";
import { Product } from "../entities";
import { Response, Request } from "express";

export interface IProductsModel {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  created_at: Date;
}

export interface IProductsRepository extends IRepository<Product> {
  findManyByIds(productIds: number[]): Promise<Product[]>;
  update(entity: Product): Promise<Product>;
  decrementProductsStock(props: {
    items: { productId: number; amount: number }[];
  }): Promise<Product[]>;
}

type ProductJSON = ReturnType<Product["toJSON"]>;

export interface IProductsService {
  findAll(): Promise<{ data: { products: ProductJSON[] } }>;

  findById(
    productId: number
  ): Promise<{ data: ProductJSON | null; message?: string }>;

  create(dto: CreateProductDto): Promise<{ data: ProductJSON }>;

  update(
    productId: number,
    dto: UpdateProductDto
  ): Promise<{ data: ProductJSON | null; message?: string }>;

  decrementStock(dto: DecrementStockDto): Promise<{
    data: {
      products: ProductJSON[];
    } | null;
    message?: string;
  }>;

  delete(productId: number): Promise<{ message?: string; data: null } | void>;
}

export interface IProductsController {
  findAll(req: Request, res: Response): Promise<void>;

  findById(req: Request, res: Response): Promise<void>;

  create(req: Request, res: Response): Promise<void>;

  update(req: Request, res: Response): Promise<void>;

  decrementStock(req: Request, res: Response): Promise<void>;

  delete(req: Request, res: Response): Promise<void>;
}
