import { CreateProductDto, DecrementStockDto, UpdateProductDto } from "./dtos";
import { IProductsController, IProductsService } from "./interfaces";
import { Response, Request } from "express";

export class ProductsController implements IProductsController {
  private _productsService: IProductsService;

  constructor(productsService: IProductsService) {
    this._productsService = productsService;
  }

  async findAll(req: Request, res: Response) {
    const response = await this._productsService.findAll();

    res.send(response);
  }

  async findById(req: Request, res: Response) {
    const productId = Number(req.params.productId);

    const response = await this._productsService.findById(productId);

    if (response?.message === "Product not found") {
      res.status(404).send(response);
      return;
    }

    res.send(response);
  }

  async create(req: Request, res: Response) {
    const dto = req.body as CreateProductDto;

    const response = await this._productsService.create(dto);

    res.status(201).send(response);
  }

  async update(req: Request, res: Response): Promise<void> {
    const productId = Number(req.params.productId);
    const dto = req.body as UpdateProductDto;

    const response = await this._productsService.update(productId, dto);

    if (response?.message === "Product not found") {
      res.status(404).send(response);
      return;
    }

    res.send(response);
  }

  async decrementStock(req: Request, res: Response): Promise<void> {
    const dto = req.body as DecrementStockDto;

    const response = await this._productsService.decrementStock(dto);

    if (response?.message?.includes("were not found")) {
      res.status(404).send(response);
      return;
    }

    if (response?.message?.includes("not enough stock")) {
      res.status(400).send(response);
      return;
    }

    res.send(response);
  }

  async delete(req: Request, res: Response) {
    const productId = Number(req.params.productId);

    const response = await this._productsService.delete(productId);

    if (response?.message === "Product not found") {
      res.status(404).send(response);
      return;
    }

    res.status(204).send();
  }
}
