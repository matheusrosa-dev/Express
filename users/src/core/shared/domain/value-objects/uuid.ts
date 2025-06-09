import * as uuid from "uuid";
import { ValueObject } from "./value-object";
import { DomainError } from "../classes";

export class UuidInvalidError extends DomainError {
  constructor() {
    super({
      message: "Uuid is invalid",
      statusCode: 400,
    });
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
      throw new UuidInvalidError();
    }
  }
}
