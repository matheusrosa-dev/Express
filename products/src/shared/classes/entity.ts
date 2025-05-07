interface IEntityProps {
  id?: number;
  createdAt?: Date;
}

export abstract class Entity {
  protected _id?: number;
  protected _createdAt?: Date;

  constructor(props: IEntityProps) {
    this._id = props?.id;
    this._createdAt = props?.createdAt;
  }

  abstract toJSON(): object;
}
