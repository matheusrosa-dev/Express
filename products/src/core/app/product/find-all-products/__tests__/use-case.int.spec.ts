import { FindAllProducts } from "../use-case";
import { TypeORM } from "../../../../shared/infra/db/typeorm/connection";
import { ProductTypeORMRepository } from "../../../../infra/product/db/typeorm/product.repository";
import { ProductModel } from "../../../../infra/product/db/typeorm/models";
import { ProductFactory } from "../../../../domain/product/product.factory";

describe("Find All Products Integration Tests", () => {
  let typeOrm: TypeORM;
  let repository: ProductTypeORMRepository;
  let useCase: FindAllProducts;

  beforeAll(async () => {
    typeOrm = new TypeORM({
      models: [ProductModel],
    });

    repository = new ProductTypeORMRepository(
      typeOrm.connection.getRepository(ProductModel)
    );

    useCase = new FindAllProducts(repository);

    await typeOrm.connection.initialize();
  });

  beforeEach(async () => {
    await typeOrm.connection.getRepository(ProductModel).clear();
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

  afterAll(async () => {
    await typeOrm.connection.destroy();
  });
});
