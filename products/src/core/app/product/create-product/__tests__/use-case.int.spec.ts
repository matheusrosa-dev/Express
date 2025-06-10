import { Chance } from "chance";
import { CreateProduct } from "../use-case";
import { Uuid } from "../../../../shared/domain/value-objects";
import { TypeORM } from "../../../../shared/infra/db/typeorm/connection";
import { ProductModel } from "../../../../infra/product/db/typeorm/models";
import { ProductTypeORMRepository } from "../../../../infra/product/db/typeorm/product.repository";

const chance = Chance();

describe("Create Product Integration Tests", () => {
  let typeOrm: TypeORM;
  let repository: ProductTypeORMRepository;
  let useCase: CreateProduct;

  beforeAll(async () => {
    typeOrm = new TypeORM({
      models: [ProductModel],
    });

    repository = new ProductTypeORMRepository(
      typeOrm.connection.getRepository(ProductModel)
    );

    useCase = new CreateProduct(repository);

    await typeOrm.connection.initialize();
  });

  beforeEach(async () => {
    await typeOrm.connection.getRepository(ProductModel).clear();
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

    const foundProduct = (await repository.findById(new Uuid(output.id)))!;

    expect(output).toStrictEqual({
      id: foundProduct.id.id,
      name: foundProduct.name,
      description: foundProduct.description,
      price: foundProduct.price,
      stock: foundProduct.stock,
      createdAt: foundProduct.createdAt,
    });
  });

  afterAll(async () => {
    await typeOrm.connection.destroy();
  });
});
