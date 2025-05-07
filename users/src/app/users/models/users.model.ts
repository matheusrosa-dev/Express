import { Model } from "../../../shared/classes";

interface IUserModelProps {
  id: number;
  name: string;
  created_at: Date;
}

export class UsersModel extends Model<IUserModelProps> {
  constructor() {
    super("users");
  }
}
