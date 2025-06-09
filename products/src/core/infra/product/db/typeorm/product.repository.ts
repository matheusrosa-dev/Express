import { ModelMapper } from "./product-model.mapper";
import { Uuid } from "../../../../shared/domain/value-objects";
import { IProductRepository } from "../../../../domain/product/interfaces";
import { Product } from "../../../../domain/product/product.entity";
import { Repository } from "typeorm";
import { ProductModel } from "./models";

export class ProductTypeORMRepository implements IProductRepository {
  constructor(private readonly connection: Repository<ProductModel>) {}

  async insert(entity: Product) {
    const model = ModelMapper.toModel(entity);

    const product = await this.connection.save(model);

    return ModelMapper.toEntity(product);
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
    const model = ModelMapper.toModel(entity);

    // @ts-expect-error - ID must not be updated
    delete model.id;

    await this.connection.update({ id: entity.id.id }, model);

    const updatedProduct = await this.findById(entity.id);

    return updatedProduct!;
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
