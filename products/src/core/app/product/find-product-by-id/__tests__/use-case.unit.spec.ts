import { FindProductById } from "../use-case";
import { Uuid } from "../../../../shared/domain/value-objects";
import { ProductNotFoundError } from "../../common/errors";
import { ProductInMemoryRepository } from "../../../../infra/product/db/in-memory/product.repository";
import { ProductFactory } from "../../../../domain/product/product.factory";

describe("Find Product By Id Unit Tests", () => {
  let useCase: FindProductById;
  let repository: ProductInMemoryRepository;

  beforeEach(() => {
    repository = new ProductInMemoryRepository();
    useCase = new FindProductById(repository);
  });

  it("Should find a product by id", async () => {
    const spyInsert = jest.spyOn(repository, "findById");

    const product = ProductFactory.fake().one().build();

    await repository.insert(product);

    const output = await useCase.execute({
      id: product.id.id,
    });

    expect(spyInsert).toHaveBeenCalledTimes(1);

    expect(output).toStrictEqual({
      id: product.id.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      createdAt: product.createdAt,
    });
  });

  it("Should throw error when product is not found", async () => {
    await expect(() => useCase.execute({ id: new Uuid().id })).rejects.toThrow(
      new ProductNotFoundError()
    );
  });
});
