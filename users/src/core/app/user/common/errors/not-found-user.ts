import { DomainError } from "../../../../shared/domain/classes";

export class NotFoundUser extends DomainError {
  constructor() {
    super({
      message: "User not found",
      statusCode: 404,
    });
  }
}
