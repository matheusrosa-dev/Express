import { ProductTypeORMRepository } from "../product.repository";
import { TypeORM } from "../../../../../shared/infra/db/typeorm/connection";
import { ProductFactory } from "../../../../../domain/product/product.factory";
import { ProductModel } from "../models";
import { Chance } from "chance";

const chance = Chance();
describe("ProductTypeORMRepository Unit Tests", () => {
  let typeOrm: TypeORM;
  let repository: ProductTypeORMRepository;

  beforeAll(async () => {
    typeOrm = new TypeORM({
      models: [ProductModel],
    });

    await typeOrm.connection.initialize();

    repository = new ProductTypeORMRepository(
      typeOrm.connection.getRepository(ProductModel)
    );
  });

  beforeEach(async () => {
    await typeOrm.connection.getRepository(ProductModel).clear();
  });

  it("Should insert a new product", async () => {
    const product = ProductFactory.fake().one().build();

    const createdProduct = await repository.insert(product);

    expect(createdProduct).toStrictEqual(product);
  });

  it("Should delete a product", async () => {
    const product = ProductFactory.fake().one().build();

    const createdProduct = await repository.insert(product);

    await repository.delete(createdProduct.id);

    const foundProduct = await repository.findById(createdProduct.id);

    expect(foundProduct).toBeNull();
  });

  it("Should update a product", async () => {
    const product = ProductFactory.fake().one().build();

    await repository.insert(product);

    product.update({
      name: chance.name(),
      description: chance.sentence(),
      price: chance.integer({ min: 1, max: 1000 }),
      stock: chance.integer({ min: 1, max: 1000 }),
    });

    const updatedProduct = await repository.update(product);

    expect(updatedProduct).toStrictEqual(product);
  });

  it("Should find a product by id", async () => {
    const product = ProductFactory.fake().one().build();

    await repository.insert(product);

    const foundProduct = await repository.findById(product.id);

    expect(foundProduct).toStrictEqual(product);
  });

  it("Should find all products", async () => {
    const products = ProductFactory.fake().many(5).build();

    await Promise.all(products.map((product) => repository.insert(product)));

    const foundProducts = await repository.findAll();

    expect(foundProducts).toHaveLength(5);
    expect(foundProducts).toEqual(expect.arrayContaining(products));
  });

  afterAll(async () => {
    await typeOrm.connection.destroy();
  });
});
