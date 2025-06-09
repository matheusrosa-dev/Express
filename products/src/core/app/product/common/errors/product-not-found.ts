import { DomainError } from "../../../../shared/domain/classes";

export class ProductNotFoundError extends DomainError {
  constructor() {
    super({
      message: "Product not found",
      statusCode: 404,
    });
  }
}
