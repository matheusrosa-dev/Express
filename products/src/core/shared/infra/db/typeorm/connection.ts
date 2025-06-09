import "reflect-metadata";
import { DataSource } from "typeorm";

class Config {
  static db() {
    if (process.env.NODE_ENV === "test") {
      return {
        host: "db-products-test",
        port: 3306,
        username: "root",
        database: "db-products-test",
        password: "root",
      };
    }

    return {
      host: "db-products",
      port: 3306,
      username: "root",
      database: "db-products",
      password: "root",
      logging: true,
    };
  }
}

export class TypeORM {
  readonly connection: DataSource;

  constructor(props: { models: Function[] }) {
    this.connection = new DataSource({
      type: "mysql",
      synchronize: true,
      entities: props.models,

      ...Config.db(),
    });
  }
}
