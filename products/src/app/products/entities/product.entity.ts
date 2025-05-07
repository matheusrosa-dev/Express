import { Entity } from "../../../shared/classes";

type ProductProps = {
  id?: number;
  name: string;
  description?: string;
  price: number | string;
  amount: number;
  createdAt?: Date;
};

export class Product extends Entity {
  private _name: string;
  private _description?: string;
  private _price: number;
  private _amount: number;

  constructor(props: ProductProps) {
    super(props);

    this._name = props.name;
    this._description = props?.description;
    this._amount = props?.amount;

    if (typeof props.price === "string") {
      if (Number.isNaN(Number(props.price))) {
        throw new Error("Price must be a number");
      }

      this._price = Number(props.price);
      return;
    }

    this._price = props.price;
  }

  toJSON() {
    return {
      id: this._id,
      name: this._name,
      description: this._description,
      price: this._price,
      amount: this._amount,
      createdAt: this._createdAt,
    };
  }
}
