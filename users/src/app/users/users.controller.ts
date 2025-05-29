import { Request, Response } from "express";
import { IUsersController, IUsersService } from "./interfaces";
import { CreateUserDto } from "./dtos";

export class UsersController implements IUsersController {
  constructor(private _usersService: IUsersService) {}

  async findAll(req: Request, res: Response) {
    const response = await this._usersService.findAll();

    res.status(200).send(response);
  }

  async findById(req: Request, res: Response) {
    const userId = Number(req.params.userId);

    const response = await this._usersService.findById(userId);

    if (response?.message === "User not found") {
      res.status(404).send(response);
      return;
    }

    res.status(200).send(response);
  }

  async create(req: Request, res: Response) {
    const dto = req.body as CreateUserDto;

    const response = await this._usersService.create(dto);

    res.status(201).send(response);
  }

  async update(req: Request, res: Response) {
    const userId = Number(req.params.userId);
    const dto = req.body as CreateUserDto;

    const response = await this._usersService.update(userId, dto);

    if (response?.message === "User not found") {
      res.status(404).send(response);
      return;
    }

    res.status(200).send(response);
  }

  async delete(req: Request, res: Response) {
    const userId = Number(req.params.userId);

    const response = await this._usersService.delete(userId);

    if (response?.message === "User not found") {
      res.status(404).send(response);
      return;
    }

    res.status(204).send();
  }
}
