import { Uuid } from "../../../../shared/domain/value-objects";
import { InMemoryRepository } from "../../../../shared/infra/db/in-memory/repository";
import { User } from "../../../domain/user.entity";

export class UserInMemoryRepository extends InMemoryRepository<Uuid, User> {}
