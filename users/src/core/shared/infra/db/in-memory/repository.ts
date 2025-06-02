import { IEntity, IRepository } from "../../../domain/interfaces";
import { ValueObject } from "../../../domain/value-objects";

export abstract class InMemoryRepository<
  Id extends ValueObject,
  Entity extends IEntity<Id>
> implements IRepository<Id, Entity>
{
  private _entities: Entity[] = [];

  async insert(entity: Entity) {
    this._entities.push(entity);

    return entity;
  }

  async update(entity: Entity) {
    const foundIndex = this._entities.findIndex((entityItem) =>
      entityItem.id.equals(entity.id)
    );

    this._entities[foundIndex] = entity;

    return this._entities[foundIndex];
  }

  async delete(entityId: Id) {
    const foundIndex = this._entities.findIndex((entity) =>
      entity.id.equals(entityId)
    );

    if (foundIndex === -1) return;

    this._entities.splice(foundIndex, 1);
  }

  async findById(entityId: Id) {
    const entity = this._entities.find((entity) => entity.id.equals(entityId));

    if (!entity) return null;

    return entity;
  }

  async findAll() {
    return this._entities;
  }
}
