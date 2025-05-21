import { Response, Request } from "express";
import { ProductsRepository } from "./repositories";
import { Product } from "./entities";

export class ProductsService {
  _productsRepository: ProductsRepository;

  constructor(productsRepository: ProductsRepository) {
    this._productsRepository = productsRepository;
  }

  async findAll(_req: Request, res: Response) {
    const products = await this._productsRepository.findAll();

    res.send({
      data: { products: products.map((product) => product.toJSON()) },
    });
  }

  async findById(req: Request, res: Response) {
    const productId = Number(req.params.productId);

    const foundProduct = await this._productsRepository.findById(productId);

    if (!foundProduct) {
      res.status(404).send({ message: "Product not found", data: null });
      return;
    }

    res.send({
      data: foundProduct.toJSON(),
    });
  }

  async create(req: Request, res: Response) {
    const product = new Product(req.body);

    const newProduct = await this._productsRepository.create(product);

    res.status(201).send({
      data: newProduct.toJSON(),
    });
  }

  async update(req: Request, res: Response) {
    const productId = Number(req.params.productId);

    const foundProduct = await this._productsRepository.findById(productId);

    if (!foundProduct) {
      res.status(404).send({ message: "Product not found", data: null });
      return;
    }

    const product = new Product({
      id: productId,
      ...req.body,
    });

    const updatedProduct = await this._productsRepository.update(product);

    res.send({
      data: updatedProduct.toJSON(),
    });
  }

  async delete(req: Request, res: Response) {
    const productId = Number(req.params.productId);

    const foundProduct = await this._productsRepository.findById(productId);

    if (!foundProduct) {
      res.status(404).send({ message: "Product not found", data: null });
      return;
    }

    await this._productsRepository.delete(productId);

    res.status(204).send();
  }
}
