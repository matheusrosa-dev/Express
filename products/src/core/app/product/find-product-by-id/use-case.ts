import { IProductRepository } from "../../../domain/product/interfaces";
import { IUseCase } from "../../../shared/app/interfaces";
import { Uuid } from "../../../shared/domain/value-objects";
import { ProductOutput, ProductOutputMapper } from "../common";
import { ProductNotFoundError } from "../common/errors";

type Input = {
  id: string;
};

export class FindProductById implements IUseCase<Input, ProductOutput> {
  constructor(private _productRepository: IProductRepository) {}

  async execute(input: Input) {
    const id = new Uuid(input.id);
    const product = await this._productRepository.findById(id);

    if (!product) {
      throw new ProductNotFoundError();
    }

    return ProductOutputMapper.toOutput(product);
  }
}
