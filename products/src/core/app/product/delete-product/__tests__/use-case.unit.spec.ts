import { DeleteProduct } from "../use-case";
import { Uuid } from "../../../../shared/domain/value-objects";
import { ProductNotFoundError } from "../../common/errors";
import { ProductInMemoryRepository } from "../../../../infra/product/db/in-memory/product.repository";
import { ProductFactory } from "../../../../domain/product/product.factory";

describe("Delete Product Integration Tests", () => {
  let useCase: DeleteProduct;
  let repository: ProductInMemoryRepository;

  beforeEach(() => {
    repository = new ProductInMemoryRepository();
    useCase = new DeleteProduct(repository);
  });

  it("Should delete a product", async () => {
    const spyInsert = jest.spyOn(repository, "delete");

    const product = ProductFactory.fake().one().build();

    await repository.insert(product);

    await useCase.execute({
      id: product.id.id,
    });

    const foundProduct = await repository.findById(product.id);

    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(foundProduct).toBeNull();
  });

  it("Should throw error when product is not found", async () => {
    await expect(() => useCase.execute({ id: new Uuid().id })).rejects.toThrow(
      new ProductNotFoundError()
    );
  });
});
