import { Chance } from "chance";
import { CreateUserProps } from "./types";
import { Email, Uuid } from "../../shared/domain/value-objects";
import { User } from "./user.entity";
import { Status } from "./enums";

export class UserFactory {
  static create(props: CreateUserProps) {
    const user = new User({
      id: new Uuid(),
      name: props.name,
      email: props.email,
      status: Status.ACTIVE,
      createdAt: new Date(),
    });

    user.validate();

    return user;
  }

  static fake() {
    return UserFakeBuilder;
  }
}

class UserFakeBuilder<Build extends User | User[]> {
  private _chance: Chance.Chance;
  private _amount: number;
  private _id?: Uuid;
  private _name?: string;
  private _email?: Email;
  private _status?: Status;
  private _createdAt?: Date;

  static one() {
    return new UserFakeBuilder<User>();
  }

  static many(amount: number) {
    return new UserFakeBuilder<User[]>(amount);
  }

  private constructor(amount = 1) {
    this._chance = Chance();
    this._amount = amount;
  }

  withId(id: Uuid) {
    this._id = id;
    return this;
  }

  withName(name: string) {
    this._name = name;
    return this;
  }

  withEmail(email: Email) {
    this._email = email;
    return this;
  }

  withStatus(status: Status) {
    this._status = status;
    return this;
  }

  withCreatedAt(createdAt: Date) {
    this._createdAt = createdAt;
    return this;
  }

  build(): Build {
    const users = new Array(this._amount).fill(undefined).map(() => {
      const user = new User({
        id: this._id ? this._id : new Uuid(),
        name: this._name ? this._name : this._chance.name(),
        email: this._email ? this._email : new Email(this._chance.email()),
        status: this._status ? this._status : Status.ACTIVE,
        createdAt: this._createdAt ? this._createdAt : new Date(),
      });

      user.validate();
      return user;
    });

    if (this._amount === 1) {
      return users[0] as Build;
    }

    return users as Build;
  }
}
