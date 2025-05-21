import { Router } from "express";
import { UsersRepository } from "./repositories";
import { UsersModel } from "./models";
import { UsersService } from "./users.service";

const usersModel = new UsersModel();
const usersRepository = new UsersRepository(usersModel);
const usersService = new UsersService(usersRepository);

const usersController = Router();

usersController.get("/", usersService.findAll.bind(usersService));

usersController.post("/", usersService.create.bind(usersService));

usersController.get("/:userId", usersService.findById.bind(usersService));

usersController.delete("/:userId", usersService.delete.bind(usersService));

export { usersController };
