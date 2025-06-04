import { DomainError } from "../../../../shared/domain/classes";

export class ConflictUser extends DomainError {
  constructor() {
    super({
      message: "User already exists",
      statusCode: 409,
    });
  }
}
