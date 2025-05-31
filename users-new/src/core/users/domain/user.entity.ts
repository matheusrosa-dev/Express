import { Entity } from "../../shared/domain/entities/entity";
import { Email, Uuid } from "../../shared/domain/value-objects";
import { Status } from "./enums";
import { InvalidUserError } from "./errors";
import { UserConstructor } from "./types";
import { z } from "zod";

export class User extends Entity {
  id: Uuid;
  name: string;
  email: Email;
  status: Status;
  createdAt: Date;

  constructor(props: UserConstructor) {
    super();
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.status = props.status;
    this.createdAt = props.createdAt;
  }

  validate() {
    const schema = z.object({
      name: z.string().min(3),
      status: z.nativeEnum(Status),
      createdAt: z.date(),
    });

    const { success: isValid } = schema.safeParse(this);

    if (!isValid) {
      throw new InvalidUserError();
    }
  }

  toJSON() {
    return {
      id: this.id.id,
      name: this.name,
      email: this.email.email,
      status: this.status,
      createdAt: this.createdAt,
    };
  }
}
