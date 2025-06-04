import { NextFunction, Request, Response } from "express";
import { IUserController, IUserService } from "./interfaces";
import {
  CreateUserDto,
  DeleteUserDto,
  FindUserByIdDto,
  UpdateUserBodyDto,
  UpdateUserParamsDto,
} from "./dtos";

export class UserController implements IUserController {
  constructor(private _userService: IUserService) {}

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this._userService.findAll();

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params as unknown as FindUserByIdDto;

      const response = await this._userService.findById(userId);

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as CreateUserDto;

      const response = await this._userService.create(dto);

      res.status(201).send(response);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params as unknown as UpdateUserParamsDto;
      const dto = req.body as UpdateUserBodyDto;

      const response = await this._userService.update(userId, dto);

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params as unknown as DeleteUserDto;

      await this._userService.delete(userId);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
