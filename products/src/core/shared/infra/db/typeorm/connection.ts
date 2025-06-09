import "reflect-metadata";
import { DataSource } from "typeorm";
import { ProductModel } from "./models";

class Config {
  static db() {
    if (process.env.NODE_ENV === "test") {
      return {
        // host: "db-products-test",
        host: "localhost",
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
  static connection = new DataSource({
    type: "mysql",
    synchronize: true,
    entities: [ProductModel],

    ...Config.db(),
  });
}
