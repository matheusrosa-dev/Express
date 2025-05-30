import { BadRequestError } from "../../shared/errors";
import { CreateProductDto, DecrementStockDto, UpdateProductDto } from "./dtos";
import { IProductsController, IProductsService } from "./interfaces";
import { Response, Request, NextFunction } from "express";

export class ProductsController implements IProductsController {
  constructor(private _productsService: IProductsService) {}

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this._productsService.findAll();

      res.send(response);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = Number(req.params.productId);

      if (isNaN(productId)) {
        throw new BadRequestError("Invalid product id");
      }

      const response = await this._productsService.findById(productId);

      res.send(response);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as CreateProductDto;

      const response = await this._productsService.create(dto);

      res.status(201).send(response);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const productId = Number(req.params.productId);
      const dto = req.body as UpdateProductDto;

      if (isNaN(productId)) {
        throw new BadRequestError("Invalid product id");
      }

      const response = await this._productsService.update(productId, dto);

      res.send(response);
    } catch (error) {
      next(error);
    }
  }

  async decrementStock(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const dto = req.body as DecrementStockDto;

      const response = await this._productsService.decrementStock(dto);

      res.send(response);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = Number(req.params.productId);

      if (isNaN(productId)) {
        throw new BadRequestError("Invalid product id");
      }

      await this._productsService.delete(productId);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
