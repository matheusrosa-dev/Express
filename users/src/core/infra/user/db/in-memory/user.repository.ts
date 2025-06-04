import { IUserRepository } from "../../../../domain/user/interfaces";
import { User } from "../../../../domain/user/user.entity";
import { Email, Uuid } from "../../../../shared/domain/value-objects";
import { InMemoryRepository } from "../../../../shared/infra/db/in-memory/repository";

export class UserInMemoryRepository
  extends InMemoryRepository<Uuid, User>
  implements IUserRepository
{
  async findByEmail(email: Email) {
    const entity = this._entities.find((entity) => entity.email.equals(email));

    if (!entity) return null;

    return entity;
  }
}
