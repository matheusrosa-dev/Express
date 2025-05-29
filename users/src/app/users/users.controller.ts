import { NextFunction, Request, Response } from "express";
import { IUsersController, IUsersService } from "./interfaces";
import { CreateUserDto } from "./dtos";
import { BadRequestError } from "../../shared/errors";

export class UsersController implements IUsersController {
  constructor(private _usersService: IUsersService) {}

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this._usersService.findAll();

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.userId);

      if (isNaN(userId)) {
        throw new BadRequestError("Invalid user id");
      }

      const response = await this._usersService.findById(userId);

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response) {
    const dto = req.body as CreateUserDto;

    const response = await this._usersService.create(dto);

    res.status(201).send(response);
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.userId);
      const dto = req.body as CreateUserDto;

      const response = await this._usersService.update(userId, dto);

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.userId);

      await this._usersService.delete(userId);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
