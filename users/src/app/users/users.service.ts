import { Request, Response } from "express";
import { UsersRepository } from "./repositories";
import { User } from "./entities";

export class UsersService {
  private _usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this._usersRepository = usersRepository;
  }

  async findAll(_req: Request, res: Response) {
    const users = await this._usersRepository.findAll();

    res.send({
      data: { users: users.map((user) => user.toJSON()) },
    });
  }

  async findById(req: Request, res: Response) {
    const userId = Number(req.params.userId);

    const foundUser = await this._usersRepository.findById(userId);

    if (!foundUser) {
      res.status(404).send({ message: "User not found", data: null });
      return;
    }

    res.send({
      data: foundUser.toJSON(),
    });
  }

  async create(req: Request, res: Response) {
    const user = new User(req.body);

    const newUser = await this._usersRepository.create(user);

    res.send({
      data: newUser.toJSON(),
    });
  }

  async delete(req: Request, res: Response) {
    const userId = Number(req.params.userId);

    const foundUser = await this._usersRepository.findById(userId);

    if (!foundUser) {
      res.status(404).send({ message: "User not found", data: null });
      return;
    }

    await this._usersRepository.delete(userId);

    res.status(204).send();
  }
}
