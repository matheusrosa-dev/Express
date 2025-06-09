import { DomainError } from "../../../shared/domain/classes";

export class UserInvalidError extends DomainError {
  constructor() {
    super({
      message: "User is invalid",
      statusCode: 400,
    });
  }
}
