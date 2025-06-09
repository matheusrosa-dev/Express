import { IUserRepository } from "../../../domain/user/interfaces";
import { IUseCase } from "../../../shared/app/interfaces";
import { Uuid } from "../../../shared/domain/value-objects";
import { UserNotFoundError } from "../common/errors";

type Input = {
  id: string;
};

export class DeleteUser implements IUseCase<Input, void> {
  constructor(private _userRepository: IUserRepository) {}

  async execute(input: Input) {
    const id = new Uuid(input.id);

    const foundUser = await this._userRepository.findById(id);

    if (!foundUser) {
      throw new UserNotFoundError();
    }

    await this._userRepository.delete(id);
  }
}
