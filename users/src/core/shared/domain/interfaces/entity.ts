import { ValueObject } from "../value-objects";

export interface IEntity<Id extends ValueObject> {
  id: Id;
  toJSON(): object;
}
