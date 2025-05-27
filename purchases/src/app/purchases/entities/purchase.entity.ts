import { Entity } from "../../../shared/classes";

type PurchaseProps = {
  id?: number;
  amount: number;
  productId: number;
  productName: string;
  userId: number;
  userName: string;
  createdAt?: Date;
};

export class Purchase extends Entity {
  private _amount: number;
  private _productId: number;
  private _productName: string;
  private _userId: number;
  private _userName: string;

  constructor(props: PurchaseProps) {
    super(props);
    this._amount = props.amount;
    this._productId = props.productId;
    this._productName = props.productName;
    this._userId = props.userId;
    this._userName = props.userName;
  }

  toJSON() {
    return {
      id: this._id,
      amount: this._amount,
      productId: this._productId,
      productName: this._productName,
      userId: this._userId,
      userName: this._userName,
      createdAt: this._createdAt,
    };
  }
}
