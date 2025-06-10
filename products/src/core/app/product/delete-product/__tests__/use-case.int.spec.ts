import { DeleteProduct } from "../use-case";
import { Uuid } from "../../../../shared/domain/value-objects";
import { ProductNotFoundError } from "../../common/errors";
import { TypeORM } from "../../../../shared/infra/db/typeorm/connection";
import { ProductTypeORMRepository } from "../../../../infra/product/db/typeorm/product.repository";
import { ProductModel } from "../../../../infra/product/db/typeorm/models";
import { ProductFactory } from "../../../../domain/product/product.factory";

describe("Delete Product Integration Tests", () => {
  let typeOrm: TypeORM;
  let repository: ProductTypeORMRepository;
  let useCase: DeleteProduct;

  beforeAll(async () => {
    typeOrm = new TypeORM({
      models: [ProductModel],
    });

    repository = new ProductTypeORMRepository(
      typeOrm.connection.getRepository(ProductModel)
    );

    useCase = new DeleteProduct(repository);

    await typeOrm.connection.initialize();
  });

  beforeEach(async () => {
    await typeOrm.connection.getRepository(ProductModel).clear();
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

  afterAll(async () => {
    await typeOrm.connection.destroy();
  });
});
