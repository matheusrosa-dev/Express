import { Status } from "../../../../domain/user/enums";
import { User } from "../../../../domain/user/user.entity";
import { Email, Uuid } from "../../../../shared/domain/value-objects";

export type Model = {
  id: string;
  name: string;
  email: string;
  status: Status;
  created_at: Date;
};

export class ModelMapper {
  static toModel(user: User): Model {
    const userJson = user.toJSON();

    return {
      id: userJson.id,
      name: userJson.name,
      email: userJson.email,
      status: userJson.status,
      created_at: user.createdAt,
    };
  }

  static toEntity(model: Model): User {
    const user = new User({
      id: new Uuid(model.id),
      name: model.name,
      email: new Email(model.email),
      status: model.status,
      createdAt: model.created_at,
    });

    user.validate();

    return user;
  }
}
