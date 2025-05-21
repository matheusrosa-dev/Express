import { Model } from "../../../shared/classes";

interface IPurchasesModelProps {
  id: number;
  amount: number;
  product_id: number;
  product_name: string;
  user_id: number;
  user_name: string;
  created_at: Date;
}

export class PurchasesModel extends Model<IPurchasesModelProps> {
  constructor() {
    super("purchases");
  }
}
