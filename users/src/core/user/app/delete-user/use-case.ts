import { IUseCase } from "../../../shared/application/interfaces";
import { Uuid } from "../../../shared/domain/value-objects";
import { IUserRepository } from "../../domain/user.repository";
import { NotFoundUser } from "../errors";
import { Input } from "./types";

export class DeleteUser implements IUseCase<Input, void> {
  constructor(private _userRepository: IUserRepository) {}

  async execute(input: Input) {
    const id = new Uuid(input.id);

    const foundUser = await this._userRepository.findById(id);

    if (!foundUser) {
      throw new NotFoundUser();
    }

    await this._userRepository.delete(id);
  }
}
