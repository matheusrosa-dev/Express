import { Chance } from "chance";
import { CreateProduct } from "../use-case";
import { ProductInMemoryRepository } from "../../../../infra/product/db/in-memory/product.repository";

const chance = Chance();

describe("Create Product Unit Tests", () => {
  let useCase: CreateProduct;
  let repository: ProductInMemoryRepository;

  beforeEach(() => {
    repository = new ProductInMemoryRepository();
    useCase = new CreateProduct(repository);
  });

  it("Should create a product", async () => {
    const spyInsert = jest.spyOn(repository, "insert");

    const output = await useCase.execute({
      name: chance.name(),
      description: chance.sentence(),
      price: chance.integer({ min: 1, max: 1000 }),
      stock: chance.integer({ min: 1, max: 1000 }),
    });

    expect(spyInsert).toHaveBeenCalledTimes(1);

    const product = repository["_entities"][0];

    expect(output).toStrictEqual({
      id: product.id.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      createdAt: product.createdAt,
    });
  });
});
