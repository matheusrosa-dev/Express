import { IRepository } from "../../../shared/domain/interfaces";
import { Email, Uuid } from "../../../shared/domain/value-objects";
import { User } from "../user.entity";

export interface IUserRepository extends IRepository<Uuid, User> {
  findByEmail(email: Email): Promise<User | null>;
}
