import { IRepository } from "../../../shared/domain/interfaces";
import { Uuid } from "../../../shared/domain/value-objects";
import { Product } from "../product.entity";

export interface IProductRepository extends IRepository<Uuid, Product> {}
