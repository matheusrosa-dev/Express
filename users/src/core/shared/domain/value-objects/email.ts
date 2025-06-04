import { DomainError } from "../classes";
import { validateEmail } from "../utils";
import { ValueObject } from "./value-object";

export class InvalidEmailError extends DomainError {
  constructor() {
    super({
      message: "Invalid email",
      statusCode: 400,
    });
  }
}

export class Email extends ValueObject {
  readonly email: string;

  constructor(email: string) {
    super();
    this.email = email.trim().toLocaleLowerCase();
    this.validate();
  }

  validate() {
    const isValid = validateEmail(this.email);

    if (!isValid) {
      throw new InvalidEmailError();
    }
  }
}
