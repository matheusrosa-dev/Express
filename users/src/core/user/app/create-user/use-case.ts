import { IUseCase } from "../../../shared/application/interfaces";
import { UserFactory } from "../../domain/user.factory";
import { IUserRepository } from "../../domain/user.repository";
import { UserOutput, UserOutputMapper } from "../common";

type Input = {
  name: string;
  email: string;
};

export class CreateUser implements IUseCase<Input, UserOutput> {
  constructor(private _userRepository: IUserRepository) {}

  async execute(input: Input) {
    const user = UserFactory.create(input);

    await this._userRepository.insert(user);

    return UserOutputMapper.toOutput(user);
  }
}
