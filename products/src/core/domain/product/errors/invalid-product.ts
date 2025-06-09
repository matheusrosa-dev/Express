import { DomainError } from "../../../shared/domain/classes";

export class InvalidProduct extends DomainError {
  constructor() {
    super({
      message: "Invalid product",
      statusCode: 400,
    });
  }
}
