import { Entity } from "../entities/entity";
import { ValueObject } from "../value-objects";

export interface IRepository<E extends Entity, Id extends ValueObject> {
  create(entity: E): Promise<void>;
  update(entity: E): Promise<void>;
  delete(entityId: Id): Promise<void>;
  findById(entityId: Id): Promise<E>;
  findAll(): Promise<E[]>;
}
