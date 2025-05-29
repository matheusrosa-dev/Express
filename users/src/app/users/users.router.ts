import { Router } from "express";
import { UsersRepository } from "./repositories";
import { UsersService } from "./users.service";
import { createUserDtoSchema } from "./dtos";
import { UsersController } from "./users.controller";
import { bodyValidationMiddleware } from "../../shared/middlewares";

const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);

const usersRouter = Router();

usersRouter.get("/", usersController.findAll.bind(usersController));

usersRouter.post(
  "/",
  bodyValidationMiddleware(createUserDtoSchema),
  usersController.create.bind(usersController)
);

usersRouter.put("/:userId", usersController.update.bind(usersController));

usersRouter.get("/:userId", usersController.findById.bind(usersController));

usersRouter.delete("/:userId", usersController.delete.bind(usersController));

export { usersRouter };
