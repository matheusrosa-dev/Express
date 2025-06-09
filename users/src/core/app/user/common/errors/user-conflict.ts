import { DomainError } from "../../../../shared/domain/classes";

export class UserConflictError extends DomainError {
  constructor() {
    super({
      message: "User already exists",
      statusCode: 409,
    });
  }
}
