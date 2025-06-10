import { DomainError } from "../../../core/shared/domain/classes";

export class BadRequestError extends DomainError {
  constructor(message: string) {
    super({ message, statusCode: 400 });
  }
}
