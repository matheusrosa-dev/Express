export interface IMigration {
  migrationName: string;
  up(): Promise<void>;
  down(): Promise<void>;
}

export interface IMigrationsModel {
  id: number;
  name: string;
  created_at: Date;
}
