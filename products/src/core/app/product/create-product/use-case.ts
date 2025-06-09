import { IProductRepository } from "../../../domain/product/interfaces";
import { ProductFactory } from "../../../domain/product/product.factory";
import { IUseCase } from "../../../shared/app/interfaces";
import { ProductOutput, ProductOutputMapper } from "../common";

type Input = {
  name: string;
  description: string;
  price: number;
  stock: number;
};

export class CreateProduct implements IUseCase<Input, ProductOutput> {
  constructor(private _productRepository: IProductRepository) {}

  async execute(input: Input) {
    const product = ProductFactory.create(input);

    await this._productRepository.insert(product);

    return ProductOutputMapper.toOutput(product);
  }
}
