import { Product } from "./entities";
import {
  CreateProductDto,
  DecrementStockDto,
  UpdateProductBodyDto,
} from "./dtos";
import { IProductsRepository, IProductsService } from "./interfaces";
import { BadRequestError, NotFoundError } from "../../shared/errors";

export class ProductsService implements IProductsService {
  constructor(private _productsRepository: IProductsRepository) {}

  async findAll() {
    const products = await this._productsRepository.findAll();

    return {
      data: { products: products.map((product) => product.toJSON()) },
    };
  }

  async findById(productId: number) {
    const foundProduct = await this._productsRepository.findById(productId);

    if (!foundProduct) {
      throw new NotFoundError("Product not found");
    }

    return {
      data: foundProduct.toJSON(),
    };
  }

  async create(dto: CreateProductDto) {
    const product = new Product(dto);

    const newProduct = await this._productsRepository.create(product);

    return {
      data: newProduct.toJSON(),
    };
  }

  async update(productId: number, dto: UpdateProductBodyDto) {
    const existingProduct = await this._productsRepository.findById(productId);

    if (!existingProduct) {
      throw new NotFoundError("Product not found");
    }

    existingProduct.update(dto);

    const updatedProduct = await this._productsRepository.update(
      existingProduct
    );

    return {
      data: updatedProduct.toJSON(),
    };
  }

  async decrementStock(dto: DecrementStockDto) {
    const productIds = dto.items.map((item) => item.productId);

    const products = await this._productsRepository.findManyByIds(productIds);

    const notFoundProductIds = productIds.filter(
      (productId) =>
        !products.find((product) => product.toJSON().id === productId)
    );

    if (notFoundProductIds.length) {
      throw new NotFoundError(
        `Products with id [${notFoundProductIds.join(", ")}] were not found`
      );
    }

    const notEnoughStockProductIds = this._validateProductStock({
      items: dto.items,
      products,
    });

    if (notEnoughStockProductIds.length) {
      throw new BadRequestError(
        `Products with id [${notEnoughStockProductIds.join(
          ", "
        )}] do not have enough stock`
      );
    }

    const updatedProducts =
      await this._productsRepository.decrementProductsStock({
        items: dto.items,
      });

    return {
      data: {
        products: updatedProducts.map((product) => product.toJSON()),
      },
    };
  }

  async delete(productId: number) {
    const foundProduct = await this._productsRepository.findById(productId);

    if (!foundProduct) {
      throw new NotFoundError("Product not found");
    }

    await this._productsRepository.delete(productId);
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
