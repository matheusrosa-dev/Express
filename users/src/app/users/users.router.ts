import { Router } from "express";
import { UsersRepository } from "./repositories";
import { UsersService } from "./users.service";

const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository);

const usersRouter = Router();

usersRouter.get("/", usersService.findAll.bind(usersService));

usersRouter.post("/", usersService.create.bind(usersService));

usersRouter.get("/:userId", usersService.findById.bind(usersService));

usersRouter.delete("/:userId", usersService.delete.bind(usersService));

export { usersRouter };
