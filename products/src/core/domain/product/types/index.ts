import { Uuid } from "../../../shared/domain/value-objects";

export type ProductConstructor = {
  id: Uuid;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: Date;
};

export type CreateProductProps = {
  name: string;
  description: string;
  price: number;
  stock: number;
};
