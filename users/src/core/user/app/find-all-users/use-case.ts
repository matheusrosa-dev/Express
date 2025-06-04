import { IUseCase } from "../../../shared/application/interfaces";
import { IUserRepository } from "../../domain/user.repository";
import { UserOutput, UserOutputMapper } from "../common";

export class FindAllUsers implements IUseCase<void, UserOutput[]> {
  constructor(private _userRepository: IUserRepository) {}

  async execute() {
    const users = await this._userRepository.findAll();

    return users.map((user) => UserOutputMapper.toOutput(user));
  }
}
