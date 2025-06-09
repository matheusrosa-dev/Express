import { IUserRepository } from "../../../domain/user/interfaces";
import { IUseCase } from "../../../shared/app/interfaces";
import { Uuid } from "../../../shared/domain/value-objects";
import { UserOutput, UserOutputMapper } from "../common";
import { UserNotFoundError } from "../common/errors";

type Input = {
  id: string;
};

export class FindUserById implements IUseCase<Input, UserOutput> {
  constructor(private _userRepository: IUserRepository) {}

  async execute(input: Input) {
    const id = new Uuid(input.id);
    const user = await this._userRepository.findById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    return UserOutputMapper.toOutput(user);
  }
}
