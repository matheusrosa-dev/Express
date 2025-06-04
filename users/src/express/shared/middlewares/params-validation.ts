import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

export const paramsValidationMiddleware =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.params = schema.parse(req.params);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send({
          message: "Params validation error",
          data: error.errors.map((e) => ({
            path: e.path.join("."),
            message: e.message,
          })),
        });

        return;
      }
      res.status(500).send({ message: "Internal server error", data: null });
    }
  };
