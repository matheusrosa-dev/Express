import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

export const zodValidationMiddleware =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send({
          message: "Body validation error",
          data: error.errors.map((e) => ({
            path: e.path.join("."),
            message: e.message,
          })),
        });

        return;
      }
      // Tratar outros erros inesperados
      res.status(500).send({ message: "Internal server error", data: null });
    }
  };
