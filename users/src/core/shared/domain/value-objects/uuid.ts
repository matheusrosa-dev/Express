import * as uuid from "uuid";
import { ValueObject } from "./value-object";

export class InvalidUuidError extends Error {
  constructor() {
    super("Uuid is not valid");
  }
}

export class Uuid extends ValueObject {
  readonly id: string;

  constructor(id?: string) {
    super();
    this.id = id || uuid.v4();
    this.validate();
  }

  validate() {
    const isValid = uuid.validate(this.id);

    if (!isValid) {
      throw new InvalidUuidError();
    }
  }
}
