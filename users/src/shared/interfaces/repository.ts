export interface IRepository<Entity> {
  create(entity: Entity): Promise<Entity>;
  update(entity: Entity): Promise<Entity>;
  findAll(): Promise<Entity[]>;
  findById(id: number): Promise<Entity | null>;
  delete(id: number): Promise<void>;
}
