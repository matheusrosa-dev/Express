import { ProductFactory } from "../../../../domain/product/product.factory";
import { ProductInMemoryRepository } from "../../../../infra/product/db/in-memory/product.repository";
import { FindAllProducts } from "../use-case";

describe("Find All Products Integration Tests", () => {
  let useCase: FindAllProducts;
  let repository: ProductInMemoryRepository;

  beforeEach(() => {
    repository = new ProductInMemoryRepository();
    useCase = new FindAllProducts(repository);
  });

  it("Should find all products", async () => {
    const spyInsert = jest.spyOn(repository, "findAll");

    const products = ProductFactory.fake().many(5).build();

    await Promise.all(products.map((product) => repository.insert(product)));

    const output = await useCase.execute();

    expect(output).toHaveLength(5);
    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toEqual(
      expect.arrayContaining(
        products.map((product) => ({
          id: product.id.id,
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          createdAt: product.createdAt,
        }))
      )
    );
  });
});
