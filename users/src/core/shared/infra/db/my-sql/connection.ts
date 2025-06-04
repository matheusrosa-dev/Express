import mysql from "mysql2/promise";

class Config {
  static db() {
    if (process.env.NODE_ENV === "test") {
      return {
        host: "db-users-test",
        port: 3306,
        user: "root",
        database: "db-users-test",
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
  static createPool() {
    return mysql.createPool(Config.db());
  }
}

export const mysqlPool = MySQL.createPool();
