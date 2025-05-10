import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "db-users",
  port: 3306,
  user: "root",
  database: "users",
  password: "root",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
