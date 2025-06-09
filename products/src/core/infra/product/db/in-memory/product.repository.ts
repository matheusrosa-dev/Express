import { IProductRepository } from "../../../../domain/product/interfaces";
import { Product } from "../../../../domain/product/product.entity";
import { Uuid } from "../../../../shared/domain/value-objects";
import { InMemoryRepository } from "../../../../shared/infra/db/in-memory/repository";

export class ProductInMemoryRepository
  extends InMemoryRepository<Uuid, Product>
  implements IProductRepository {}
