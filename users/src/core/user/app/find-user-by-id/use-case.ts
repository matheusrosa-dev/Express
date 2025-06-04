import { IUseCase } from "../../../shared/application/interfaces";
import { Uuid } from "../../../shared/domain/value-objects";
import { IUserRepository } from "../../domain/user.repository";
import { UserOutput, UserOutputMapper } from "../common";
import { NotFoundUser } from "../common/errors";
import { Input } from "./types";

export class FindUserById implements IUseCase<Input, UserOutput> {
  constructor(private _userRepository: IUserRepository) {}

  async execute(input: Input) {
    const id = new Uuid(input.id);
    const user = await this._userRepository.findById(id);

    if (!user) {
      throw new NotFoundUser();
    }

    return UserOutputMapper.toOutput(user);
  }
}
