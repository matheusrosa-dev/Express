import { ValueObject } from "../value-objects";
import { IEntity } from "./entity";

export interface IRepository<
  Id extends ValueObject,
  Entity extends IEntity<Id>
> {
  insert(entity: Entity): Promise<Entity>;
  update(entity: Entity): Promise<Entity>;
  delete(entityId: Id): Promise<void>;
  findById(entityId: Id): Promise<Entity | null>;
  findAll(): Promise<Entity[]>;
}
