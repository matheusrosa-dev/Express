import { IRepository } from "../../../shared/interfaces";
import { CreateProductDto, DecrementStockDto, UpdateProductDto } from "../dtos";
import { Product } from "../entities";
import { Response, Request, NextFunction } from "express";

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

  findById(productId: number): Promise<{ data: ProductJSON }>;

  create(dto: CreateProductDto): Promise<{ data: ProductJSON }>;

  update(
    productId: number,
    dto: UpdateProductDto
  ): Promise<{ data: ProductJSON }>;

  decrementStock(dto: DecrementStockDto): Promise<{
    data: {
      products: ProductJSON[];
    };
  }>;

  delete(productId: number): Promise<void>;
}

export interface IProductsController {
  findAll(req: Request, res: Response, next: NextFunction): Promise<void>;

  findById(req: Request, res: Response, next: NextFunction): Promise<void>;

  create(req: Request, res: Response, next: NextFunction): Promise<void>;

  update(req: Request, res: Response, next: NextFunction): Promise<void>;

  decrementStock(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;

  delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}
