import { Chance } from "chance";
import { CreateProductProps } from "./types";
import { Uuid } from "../../shared/domain/value-objects";
import { Product } from "./product.entity";

export class ProductFactory {
  static create(props: CreateProductProps) {
    const product = new Product({
      id: new Uuid(),
      name: props.name,
      description: props.description,
      price: props.price,
      stock: props.stock,
      createdAt: new Date(),
    });

    product.validate();

    return product;
  }

  static fake() {
    return ProductFakeBuilder;
  }
}

class ProductFakeBuilder<Build extends Product | Product[]> {
  private _chance: Chance.Chance;
  private _amount: number;
  private _id?: Uuid;
  private _name?: string;
  private _description?: string;
  private _price?: number;
  private _stock?: number;
  private _createdAt?: Date;

  static one() {
    return new ProductFakeBuilder<Product>();
  }

  static many(amount: number) {
    return new ProductFakeBuilder<Product[]>(amount);
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

  withDescription(description: string) {
    this._description = description;
    return this;
  }

  withPrice(price: number) {
    this._price = price;
    return this;
  }

  withStock(stock: number) {
    this._stock = stock;
    return this;
  }

  withCreatedAt(createdAt: Date) {
    this._createdAt = createdAt;
    return this;
  }

  build(): Build {
    const products = new Array(this._amount).fill(undefined).map(() => {
      const product = new Product({
        id: this._id ? this._id : new Uuid(),
        name: this._name ? this._name : this._chance.name(),
        description: this._description
          ? this._description
          : this._chance.sentence(),
        price: this._price
          ? this._price
          : this._chance.integer({ min: 1, max: 1000 }),
        stock: this._stock
          ? this._stock
          : this._chance.integer({ min: 1, max: 1000 }),
        createdAt: this._createdAt ? this._createdAt : new Date(),
      });

      product.validate();
      return product;
    });

    if (this._amount === 1) {
      return products[0] as Build;
    }

    return products as Build;
  }
}
