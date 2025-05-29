import { AppError } from "./app-error";

export class NotFoundError extends AppError {
  constructor(message: string) {
    super({ message, statusCode: 404 });
  }
}

export class BadRequestError extends AppError {
  constructor(message: string) {
    super({ message, statusCode: 400 });
  }
}
