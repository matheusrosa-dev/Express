import { DomainError } from "../../../shared/domain/classes";

export class InvalidUser extends DomainError {
  constructor() {
    super({
      message: "Invalid user",
      statusCode: 400,
    });
  }
}
