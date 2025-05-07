import { Entity } from "../../shared/classes";

interface IMigrationProps {
  id?: number;
  name: string;
  createdAt?: Date;
}

export class Migration extends Entity {
  private _name: string;

  constructor(props: IMigrationProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
    });
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
