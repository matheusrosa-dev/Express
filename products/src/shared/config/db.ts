import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "db-products",
  port: 3306,
  user: "root",
  database: "db-products",
  password: "root",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
