import { IUserRepository } from "../../../domain/user/interfaces";
import { UserFactory } from "../../../domain/user/user.factory";
import { IUseCase } from "../../../shared/app/interfaces";
import { UserOutput, UserOutputMapper } from "../common";
import { UserConflictError } from "../common/errors";

type Input = {
  name: string;
  email: string;
};

export class CreateUser implements IUseCase<Input, UserOutput> {
  constructor(private _userRepository: IUserRepository) {}

  async execute(input: Input) {
    const user = UserFactory.create(input);

    const foundUser = await this._userRepository.findByEmail(user.email);

    if (foundUser) {
      throw new UserConflictError();
    }

    await this._userRepository.insert(user);

    return UserOutputMapper.toOutput(user);
  }
}
