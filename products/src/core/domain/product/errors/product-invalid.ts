import { DomainError } from "../../../shared/domain/classes";

export class ProductInvalid extends DomainError {
  constructor() {
    super({
      message: "Product is invalid",
      statusCode: 400,
    });
  }
}
