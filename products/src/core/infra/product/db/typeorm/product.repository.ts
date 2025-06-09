import { ModelMapper } from "./product-model.mapper";
import { Uuid } from "../../../../shared/domain/value-objects";
import { TypeORM } from "../../../../shared/infra/db/typeorm/connection";
import { IProductRepository } from "../../../../domain/product/interfaces";
import { ProductModel } from "../../../../shared/infra/db/typeorm/models";
import { Product } from "../../../../domain/product/product.entity";

export class ProductTypeORMRepository implements IProductRepository {
  private connection = TypeORM.connection.getRepository(ProductModel);

  async insert(entity: Product) {
    const model = ModelMapper.toModel(entity);

    const a = await this.connection.save(model);
    console.log(a);

    const product = await this.findById(entity.id);

    return product!;
  }

  async findById(id: Uuid) {
    const model = await this.connection.findOne({
      where: {
        id: id.id,
      },
    });

    if (!model) return null;

    const product = ModelMapper.toEntity(model);

    return product;
  }

  async update(entity: Product): Promise<Product> {
    throw new Error("Method not implemented.");
  }

  async findAll() {
    const models = await this.connection.find();

    const entities = models.map((model) => ModelMapper.toEntity(model));

    return entities;
  }

  async delete(id: Uuid) {
    await this.connection.delete({ id: id.id });
  }
}
