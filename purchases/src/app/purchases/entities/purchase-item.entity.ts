import { Entity } from "../../../shared/classes";

type PurchaseItemProps = {
  id?: number;
  purchaseId?: number;
  amount: number;
  productId: number;
  productName: string;
  createdAt?: Date;
};

export class PurchaseItem extends Entity {
  private _purchaseId?: number;
  private _amount: number;
  private _productId: number;
  private _productName: string;

  constructor(props: PurchaseItemProps) {
    super(props);
    this._purchaseId = props?.purchaseId;
    this._amount = props.amount;
    this._productId = props.productId;
    this._productName = props.productName;
  }

  set purchaseId(purchaseId: number) {
    this._purchaseId = purchaseId;
  }

  toJSON() {
    return {
      id: this._id,
      purchaseId: this._purchaseId,
      amount: this._amount,
      productId: this._productId,
      productName: this._productName,
      createdAt: this._createdAt,
    };
  }
}
