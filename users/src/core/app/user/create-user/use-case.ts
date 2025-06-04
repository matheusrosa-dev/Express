import { UserFactory } from "../../../domain/user/user.factory";
import { IUserRepository } from "../../../domain/user/user.repository";
import { IUseCase } from "../../../shared/app/interfaces";
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
