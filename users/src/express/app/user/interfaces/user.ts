import { NextFunction, Request, Response } from "express";
import { CreateUserDto, UpdateUserBodyDto } from "../dtos";
import { User } from "../types";

export interface IUserService {
  findAll(): Promise<{ data: { users: User[] } }>;

  findById(userId: string): Promise<{ data: User }>;

  create(user: CreateUserDto): Promise<{ data: User }>;

  update(userId: string, dto: UpdateUserBodyDto): Promise<{ data: User }>;

  delete(userId: string): Promise<void>;
}

export interface IUserController {
  findAll(req: Request, res: Response, next: NextFunction): Promise<void>;
  findById(req: Request, res: Response, next: NextFunction): Promise<void>;
  create(req: Request, res: Response, next: NextFunction): Promise<void>;
  delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}
