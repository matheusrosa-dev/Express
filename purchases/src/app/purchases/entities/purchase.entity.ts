import { Entity } from "../../../shared/classes";
import { PurchaseItem } from "./purchase-item.entity";

type PurchaseProps = {
  id?: number;
  userId: number;
  userName: string;
  items: PurchaseItem[];
  createdAt?: Date;
};

export class Purchase extends Entity {
  private _userId: number;
  private _userName: string;
  private _items: PurchaseItem[];

  constructor(props: PurchaseProps) {
    super(props);
    this._userId = props.userId;
    this._userName = props.userName;
    this._items = props.items;
  }

  toJSON() {
    return {
      id: this._id,
      userId: this._userId,
      userName: this._userName,
      items: this._items.map((item) => item.toJSON()),
      createdAt: this._createdAt,
    };
  }
}
