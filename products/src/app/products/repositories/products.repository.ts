import { Product } from "../entities";
import { ProductsModel } from "../models";

export class ProductsRepository {
  private _productsModel: ProductsModel;

  constructor(productsModel: ProductsModel) {
    this._productsModel = productsModel;
  }

  async findAll() {
    const products = await this._productsModel.findAll();

    const entities = products.map(
      (product) => new Product({ ...product, createdAt: product.created_at })
    );

    return entities;
  }

  async create(product: Product) {
    const data = product.toJSON();

    const model = await this._productsModel.insert({
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
    });

    return new Product({ ...model, createdAt: model.created_at });
  }

  async findById(productId: number) {
    const foundProduct = await this._productsModel.findById(productId);

    if (!foundProduct) return null;

    return new Product({
      ...foundProduct,
      createdAt: foundProduct.created_at,
    });
  }

  async findManyByIds(productIds: number[]) {
    const foundProducts = await this._productsModel.findManyByIds(productIds);

    if (!foundProducts) return [];

    const products = foundProducts.map(
      (product) =>
        new Product({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          createdAt: product.created_at,
        })
    );

    return products;
  }

  async update(product: Product) {
    const data = product.toJSON();

    const model = await this._productsModel.update(data.id!, {
      name: data.name,
      price: data.price,
      description: data.description,
      stock: data.stock,
    });

    return new Product({
      ...model,
      createdAt: model.created_at,
    });
  }

  async delete(productId: number) {
    await this._productsModel.delete(productId);
  }

  async decrementProductsStock(props: {
    items: { productId: number; amount: number }[];
  }) {
    const models = await this._productsModel.decrementProductsStock(props);

    return models.map(
      (model) =>
        new Product({
          ...model,
          createdAt: model.created_at,
        })
    );
  }
}
