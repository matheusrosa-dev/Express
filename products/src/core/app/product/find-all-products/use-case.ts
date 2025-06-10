import { IProductRepository } from "../../../domain/product/interfaces";
import { IUseCase } from "../../../shared/app/interfaces";
import { ProductOutput, ProductOutputMapper } from "../common";

export class FindAllProducts implements IUseCase<void, ProductOutput[]> {
  constructor(private _productRepository: IProductRepository) {}

  async execute() {
    const products = await this._productRepository.findAll();

    return products.map((product) => ProductOutputMapper.toOutput(product));
  }
}
