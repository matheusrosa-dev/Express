import { User } from "../../../../domain/user/user.entity";
import { Uuid } from "../../../../shared/domain/value-objects";
import { InMemoryRepository } from "../../../../shared/infra/db/in-memory/repository";

export class UserInMemoryRepository extends InMemoryRepository<Uuid, User> {}
