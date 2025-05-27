import { Model } from "../../shared/classes";

interface IMigrationProps {
  id: number;
  name: string;
  created_at: Date;
}

export class MigrationModel extends Model<IMigrationProps> {
  constructor() {
    super("migrations");
  }
}
