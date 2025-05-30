import { NextFunction, Request, Response } from "express";
import { IRepository } from "../../../shared/interfaces";
import { CreateUserDto, UpdateUserDto } from "../dtos";
import { User } from "../entities";

export interface IUsersModel {
  id: number;
  name: string;
  created_at: Date;
}

export interface IUsersRepository extends IRepository<User> {}

type UserJSON = ReturnType<User["toJSON"]>;

export interface IUsersService {
  findAll(): Promise<{ data: { users: UserJSON[] } }>;

  findById(userId: number): Promise<{ data: UserJSON }>;

  create(user: CreateUserDto): Promise<{ data: UserJSON }>;

  create(user: CreateUserDto): Promise<{ data: UserJSON }>;

  update(userId: number, dto: UpdateUserDto): Promise<{ data: UserJSON }>;

  delete(userId: number): Promise<void>;
}

export interface IUsersController {
  findAll(req: Request, res: Response, next: NextFunction): Promise<void>;
  findById(req: Request, res: Response, next: NextFunction): Promise<void>;
  create(req: Request, res: Response, next: NextFunction): Promise<void>;
  delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}
