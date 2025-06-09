import { IEntity } from "../../shared/domain/interfaces";
import { Uuid } from "../../shared/domain/value-objects";
import { InvalidProduct } from "./errors";
import { ProductConstructor } from "./types";
import { z } from "zod";

export class Product implements IEntity<Uuid> {
  id: Uuid;
  name: string;
  stock: number;
  price: number;
  description: string;
  createdAt: Date;

  constructor(props: ProductConstructor) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.stock = props.stock;
    this.price = props.price;
    this.createdAt = props.createdAt;
  }

  validate() {
    const schema = z.object({
      name: z.string().min(3),
      description: z.string().min(20),
      price: z.number().positive(),
      stock: z.number().positive(),
      createdAt: z.date(),
    });

    const { success: isValid } = schema.safeParse(this);

    if (!isValid) {
      throw new InvalidProduct();
    }
  }

  update(props: Partial<Omit<ProductConstructor, "id" | "createdAt">>) {
    Object.assign(this, props);

    this.validate();
  }

  toJSON() {
    return {
      id: this.id.id,
      name: this.name,
      description: this.description,
      stock: this.stock,
      price: this.price,
      createdAt: this.createdAt,
    };
  }
}
