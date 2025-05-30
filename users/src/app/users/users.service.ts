import { User } from "./entities";
import { IUsersRepository, IUsersService } from "./interfaces";
import { CreateUserDto } from "./dtos";
import { NotFoundError } from "../../shared/errors";

export class UsersService implements IUsersService {
  constructor(private _usersRepository: IUsersRepository) {}

  async findAll() {
    const users = await this._usersRepository.findAll();

    return {
      data: { users: users.map((user) => user.toJSON()) },
    };
  }

  async findById(userId: number) {
    const foundUser = await this._usersRepository.findById(userId);

    if (!foundUser) {
      throw new NotFoundError("User not found");
    }

    return {
      data: foundUser.toJSON(),
    };
  }

  async create(dto: CreateUserDto) {
    const user = new User(dto);

    const newUser = await this._usersRepository.create(user);

    return {
      data: newUser.toJSON(),
    };
  }

  async update(userId: number, dto: CreateUserDto) {
    const foundUser = await this._usersRepository.findById(userId);

    if (!foundUser) {
      throw new NotFoundError("User not found");
    }

    foundUser.update(dto);

    const updatedUser = await this._usersRepository.update(foundUser);

    return {
      data: updatedUser.toJSON(),
    };
  }

  async delete(userId: number) {
    const foundUser = await this._usersRepository.findById(userId);

    if (!foundUser) {
      throw new NotFoundError("User not found");
    }

    await this._usersRepository.delete(userId);
  }
}
