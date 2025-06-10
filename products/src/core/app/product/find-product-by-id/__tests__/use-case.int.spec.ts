import { FindProductById } from "../use-case";
import { Uuid } from "../../../../shared/domain/value-objects";
import { TypeORM } from "../../../../shared/infra/db/typeorm/connection";
import { ProductTypeORMRepository } from "../../../../infra/product/db/typeorm/product.repository";
import { ProductModel } from "../../../../infra/product/db/typeorm/models";
import { ProductFactory } from "../../../../domain/product/product.factory";
import { ProductNotFoundError } from "../../common/errors";

describe("Find Product By Id Integration Tests", () => {
  let typeOrm: TypeORM;
  let repository: ProductTypeORMRepository;
  let useCase: FindProductById;

  beforeAll(async () => {
    typeOrm = new TypeORM({
      models: [ProductModel],
    });

    repository = new ProductTypeORMRepository(
      typeOrm.connection.getRepository(ProductModel)
    );

    useCase = new FindProductById(repository);

    await typeOrm.connection.initialize();
  });

  beforeEach(async () => {
    await typeOrm.connection.getRepository(ProductModel).clear();
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

  afterAll(async () => {
    await typeOrm.connection.destroy();
  });
});
