import { Product } from "../../../domain/product/product.entity";

export type ProductOutput = {
  id: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  createdAt: Date;
};

export class ProductOutputMapper {
  static toOutput(product: Product): ProductOutput {
    return product.toJSON();
  }
}
