import { Model } from "../../../shared/classes";

interface IProductModelProps {
  id: number;
  name: string;
  description?: string;
  price: number;
  amount: number;
  created_at: Date;
}

export class ProductsModel extends Model<IProductModelProps> {
  constructor() {
    super("products");
  }
}
