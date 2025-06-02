import { User } from "../../domain/user.entity";

export type UserOutput = {
  id: string;
  name: string;
  email: string;
  status: string;
  createdAt: Date;
};

export class UserOutputMapper {
  static toOutput(user: User): UserOutput {
    return user.toJSON();
  }
}
