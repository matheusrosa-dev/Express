export interface IMigration {
  migrationName: string;
  up(): Promise<void>;
  down(): Promise<void>;
}
