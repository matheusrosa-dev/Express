import { Response, Request } from "express";
import { ProductsRepository } from "./repositories";
import { Product } from "./entities";
import { DecrementStockDto } from "./dtos";

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

  async decrementStock(req: Request, res: Response) {
    const body = req.body as DecrementStockDto;

    const productIds = body.items.map((item) => item.productId);

    const products = await this._productsRepository.findManyByIds(productIds);

    const notFoundProductIds = productIds.filter(
      (productId) =>
        !products.find((product) => product.toJSON().id === productId)
    );

    if (notFoundProductIds.length) {
      res.status(404).send({
        message: `Products with id [${notFoundProductIds.join(
          ", "
        )}] were not found`,
        data: null,
      });
      return;
    }

    const notEnoughStockProductIds = this._validateProductStock({
      items: body.items,
      products,
    });

    if (notEnoughStockProductIds.length) {
      res.status(400).send({
        message: `Products with id [${notEnoughStockProductIds.join(
          ", "
        )}] do not have enough stock`,
        data: null,
      });
      return;
    }

    const updatedProducts =
      await this._productsRepository.decrementProductsStock({
        items: body.items,
      });

    res.send({
      data: updatedProducts.map((product) => product.toJSON()),
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

  private _validateProductStock(props: {
    items: { productId: number; amount: number }[];
    products: Product[];
  }) {
    const { items, products } = props;

    const notEnoughStockProducts = items.filter((item) => {
      const product = products
        .find((product) => product.toJSON().id === item.productId)!
        .toJSON();

      if (product.stock < item.amount) {
        return true;
      }

      return false;
    });

    const notEnoughStockProductIds = notEnoughStockProducts.map(
      (item) => item.productId
    );

    return notEnoughStockProductIds;
  }
}
