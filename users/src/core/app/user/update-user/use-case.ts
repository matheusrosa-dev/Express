import { IUserRepository } from "../../../domain/user/interfaces";
import { IUseCase } from "../../../shared/app/interfaces";
import { Email, Uuid } from "../../../shared/domain/value-objects";
import { UserOutput, UserOutputMapper } from "../common";
import { NotFoundUser } from "../common/errors";

type Input = {
  id: string;
  name?: string;
  email?: string;
};

export class UpdateUser implements IUseCase<Input, UserOutput> {
  constructor(private _userRepository: IUserRepository) {}

  async execute(input: Input) {
    const user = await this._userRepository.findById(new Uuid(input.id));

    if (!user) {
      throw new NotFoundUser();
    }

    user.update({
      ...(input.name && { name: input.name }),
      ...(input.email && { email: new Email(input.email) }),
    });

    await this._userRepository.update(user);

    return UserOutputMapper.toOutput(user);
  }
}
