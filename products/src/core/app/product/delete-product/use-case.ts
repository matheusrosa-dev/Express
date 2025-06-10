import { IProductRepository } from "../../../domain/product/interfaces";
import { IUseCase } from "../../../shared/app/interfaces";
import { Uuid } from "../../../shared/domain/value-objects";
import { ProductNotFoundError } from "../common/errors";

type Input = {
  id: string;
};

export class DeleteProduct implements IUseCase<Input, void> {
  constructor(private _productRepository: IProductRepository) {}

  async execute(input: Input) {
    const id = new Uuid(input.id);

    const foundProduct = await this._productRepository.findById(id);

    if (!foundProduct) {
      throw new ProductNotFoundError();
    }

    await this._productRepository.delete(id);
  }
}
