import { ValueObject } from "../value-objects";

export abstract class Entity {
  abstract get id(): ValueObject;
  abstract toJSON(): object;
}
