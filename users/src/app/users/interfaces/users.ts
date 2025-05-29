import { IRepository } from "../../../shared/interfaces";
import { User } from "../entities";

export interface IUsersModel {
  id: number;
  name: string;
  created_at: Date;
}

export interface IUsersRepository extends IRepository<User> {}
