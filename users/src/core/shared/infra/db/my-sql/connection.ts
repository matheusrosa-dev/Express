import mysql from "mysql2/promise";

class Config {
  static db() {
    const NODE_ENV = process.env.NODE_ENV;

    if (NODE_ENV === "test") {
      return {
        host: "db-users-test",
        port: 3306,
        user: "root",
        database: "db-users",
        password: "root",
      };
    }

    return {
      host: "db-users",
      port: 3306,
      user: "root",
      database: "db-users",
      password: "root",
    };
  }
}

export class MySQL {
  static connect() {
    const dbConfig = Config.db();

    const pool = mysql.createPool(dbConfig);

    return pool;
  }
}
