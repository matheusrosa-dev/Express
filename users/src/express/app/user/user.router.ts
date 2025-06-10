import { Router } from "express";
import {
  createUserDtoSchema,
  deleteUserDtoSchema,
  findUserByIdDtoSchema,
  updateUserBodyDtoSchema,
  updateUserParamsDtoSchema,
} from "./dtos";
import { UserController } from "./user.controller";
import {
  bodyValidationMiddleware,
  paramsValidationMiddleware,
} from "../../shared/middlewares";
import { UserService } from "./user.service";
import { UserMySQLRepository } from "../../../core/infra/user/db/my-sql/user.repository";
import { mySqlConnection } from "../../db/connection";

const userRouter = Router();

const repository = new UserMySQLRepository(mySqlConnection);
const service = new UserService(repository);
const controller = new UserController(service);

userRouter.get("/", controller.findAll.bind(controller));

userRouter.post(
  "/",
  bodyValidationMiddleware(createUserDtoSchema),
  controller.create.bind(controller)
);

userRouter.put(
  "/:userId",
  paramsValidationMiddleware(updateUserParamsDtoSchema),
  bodyValidationMiddleware(updateUserBodyDtoSchema),
  controller.update.bind(controller)
);

userRouter.get(
  "/:userId",
  paramsValidationMiddleware(findUserByIdDtoSchema),
  controller.findById.bind(controller)
);

userRouter.delete(
  "/:userId",
  paramsValidationMiddleware(deleteUserDtoSchema),
  controller.delete.bind(controller)
);

export { userRouter };
