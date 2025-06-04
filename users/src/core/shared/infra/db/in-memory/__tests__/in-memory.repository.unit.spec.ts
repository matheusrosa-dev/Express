import { Chance } from "chance";
import { IEntity } from "../../../../domain/interfaces";
import { Uuid } from "../../../../domain/value-objects";
import { InMemoryRepository } from "../repository";

const chance = Chance();

class Stub implements IEntity<Uuid> {
  id: Uuid;
  private _name: string;

  get name() {
    return this._name;
  }

  constructor(props: { id: Uuid; name: string }) {
    this.id = props.id;
    this._name = props.name;
  }

  toJSON() {
    return {
      id: this.id.id,
    };
  }
}

class StubsInMemoryRepository extends InMemoryRepository<Uuid, Stub> {}

describe("In Memory Repository Unit Tests", () => {
  let repository: StubsInMemoryRepository;

  beforeEach(() => {
    repository = new StubsInMemoryRepository();
  });

  it("Should insert a new entity", async () => {
    const entity = new Stub({ id: new Uuid(), name: chance.name() });

    await repository.insert(entity);

    const foundEntity = await repository.findById(entity.id);

    expect(foundEntity).toStrictEqual(entity);
  });

  it("Should delete an entity", async () => {
    const entity = new Stub({ id: new Uuid(), name: chance.name() });

    await repository.insert(entity);

    await repository.delete(entity.id);

    const foundEntity = await repository.findById(entity.id);

    expect(foundEntity).toBeNull();
  });

  it("Should update an entity", async () => {
    const entity = new Stub({ id: new Uuid(), name: chance.name() });

    await repository.insert(entity);

    const updatedEntity = new Stub({ id: entity.id, name: chance.name() });

    await repository.update(updatedEntity);

    const foundEntity = await repository.findById(entity.id);

    expect(foundEntity).toStrictEqual(updatedEntity);
  });

  it("Should find all entities", async () => {
    const entities = [
      new Stub({ id: new Uuid(), name: chance.name() }),
      new Stub({ id: new Uuid(), name: chance.name() }),
    ];

    await Promise.all(entities.map((entity) => repository.insert(entity)));

    const foundEntities = await repository.findAll();

    expect(foundEntities).toStrictEqual(entities);
  });

  it("Should return null when try to find a non-existing entity", async () => {
    const id = new Uuid();

    const foundEntity = await repository.findById(id);

    expect(foundEntity).toBeNull();
  });
});
