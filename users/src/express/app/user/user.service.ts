import { IUserService } from "./interfaces";
import { CreateUserDto, UpdateUserBodyDto } from "./dtos";
import { FindAllUsers } from "../../../core/app/user/find-all-users/use-case";
import { UserMySQLRepository } from "../../../core/infra/user/db/my-sql/user.repository";
import { CreateUser } from "../../../core/app/user/create-user/use-case";
import { FindUserById } from "../../../core/app/user/find-user-by-id/use-case";
import { DeleteUser } from "../../../core/app/user/delete-user/use-case";
import { User } from "./types";
import { UpdateUser } from "../../../core/app/user/update-user/use-case";

export class UserService implements IUserService {
  private _findAllUsersUseCase: FindAllUsers;
  private _createUserUseCase: CreateUser;
  private _findUserByIdUseCase: FindUserById;
  private _deleteUserUseCase: DeleteUser;
  private _updateUserUseCase: UpdateUser;

  constructor() {
    const repository = new UserMySQLRepository();
    this._findAllUsersUseCase = new FindAllUsers(repository);
    this._createUserUseCase = new CreateUser(repository);
    this._findUserByIdUseCase = new FindUserById(repository);
    this._deleteUserUseCase = new DeleteUser(repository);
    this._updateUserUseCase = new UpdateUser(repository);
  }

  async findAll() {
    const output = await this._findAllUsersUseCase.execute();

    return {
      data: { users: output },
    };
  }

  async findById(userId: string) {
    const output = await this._findUserByIdUseCase.execute({ id: userId });

    return {
      data: output,
    };
  }

  async create(dto: CreateUserDto) {
    const output = await this._createUserUseCase.execute(dto);

    return {
      data: output,
    };
  }

  async update(userId: string, dto: UpdateUserBodyDto) {
    const output = await this._updateUserUseCase.execute({
      id: userId,
      ...dto,
    });

    return {
      data: output,
    };
  }

  async delete(userId: string) {
    await this._deleteUserUseCase.execute({ id: userId });
  }
}
