import { User } from "../entities";
import { UsersModel } from "../models";

export class UsersRepository {
  private _usersModel: UsersModel;

  constructor(usersModel: UsersModel) {
    this._usersModel = usersModel;
  }

  async findAll() {
    const users = await this._usersModel.findAll();

    const entities = users.map(
      (user) => new User({ ...user, createdAt: user.created_at })
    );

    return entities;
  }

  async findById(id: number) {
    const foundUser = await this._usersModel.findById(id);

    if (!foundUser) return null;

    return {
      ...foundUser,
      createdAt: foundUser.created_at,
    };
  }

  async create(user: User) {
    const data = user.toJSON();

    const model = await this._usersModel.insert({
      name: data.name,
    });

    return new User({ ...model, createdAt: model.created_at });
  }

  async delete(userId: number) {
    await this._usersModel.delete(userId);
  }
}
