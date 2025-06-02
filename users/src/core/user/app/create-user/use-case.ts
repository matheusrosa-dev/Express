import { IUseCase } from "../../../shared/application/interfaces";
import { UserFactory } from "../../domain/user.factory";
import { IUserRepository } from "../../domain/user.repository";
import { UserOutput, UserOutputMapper } from "../common";
import { Input } from "./input";

export class CreateUser implements IUseCase<Input, UserOutput> {
  constructor(private _userRepository: IUserRepository) {}

  async execute(input: Input) {
    const entity = UserFactory.create(input);

    await this._userRepository.insert(entity);

    return UserOutputMapper.toOutput(entity);
  }
}
