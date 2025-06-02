import { Email, Uuid } from "../../../shared/domain/value-objects";
import { Status } from "../enums";

export type UserConstructor = {
  id: Uuid;
  name: string;
  email: Email;
  status: Status;
  createdAt: Date;
};

export type CreateUserProps = {
  name: string;
  email: Email;
};
