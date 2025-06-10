import { Request, Response, NextFunction } from "express";
import { DomainError } from "../../../core/shared/domain/classes";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof DomainError) {
    const response = {
      message: err.message,
      data: null,
    };

    res.status(err.statusCode).send(response);
    return;
  }

  console.error(err);

  res.status(500).send({
    message: "Internal server error",
    data: null,
  });
};
