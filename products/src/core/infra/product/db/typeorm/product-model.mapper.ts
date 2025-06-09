import { Product } from "../../../../domain/product/product.entity";
import { Uuid } from "../../../../shared/domain/value-objects";
import { ProductModel } from "../../../../shared/infra/db/typeorm/models";

export class ModelMapper {
  static toModel(product: Product): ProductModel {
    const productJson = product.toJSON();

    return {
      id: productJson.id,
      name: productJson.name,
      description: productJson.description,
      stock: productJson.stock,
      price: productJson.price,
      created_at: productJson.createdAt,
    };
  }

  static toEntity(model: ProductModel): Product {
    const product = new Product({
      id: new Uuid(model.id),
      name: model.name,
      description: model.description,
      stock: model.stock,
      price: model.price,
      createdAt: model.created_at,
    });

    product.validate();

    return product;
  }
}
