import { Email, Uuid } from "../../../../shared/domain/value-objects";
import { Status } from "../../../domain/enums";
import { User } from "../../../domain/user.entity";

export type Model = {
  id: string;
  name: string;
  email: string;
  status: Status;
  createdAt: Date;
};

export class ModelMapper {
  static toModel(user: User): Model {
    return user.toJSON();
  }

  static toEntity(model: Model): User {
    const user = new User({
      id: new Uuid(model.id),
      name: model.name,
      email: new Email(model.email),
      status: model.status,
      createdAt: model.createdAt,
    });

    user.validate();

    return user;
  }
}
