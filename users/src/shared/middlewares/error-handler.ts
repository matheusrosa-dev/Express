import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof AppError) {
    const response = {
      message: err.message,
      data: null,
    };

    res.status(err.statusCode).send(response);
    return;
  }

  res.status(500).send({
    message: "Internal server error",
    data: null,
  });
};
