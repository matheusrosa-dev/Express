import { Entity } from "../../../shared/classes";

type UserProps = {
  id?: number;
  name: string;
  createdAt?: Date;
};

type UpdateProps = Omit<UserProps, "id" | "createdAt">;

export class User extends Entity {
  private _name: string;

  constructor(props: UserProps) {
    super(props);
    this._name = props.name;
  }

  update(props: UpdateProps) {
    this._name = props.name;
  }

  toJSON() {
    return {
      id: this._id,
      name: this._name,
      createdAt: this._createdAt,
    };
  }
}
