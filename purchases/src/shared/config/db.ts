import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "db-purchases",
  port: 3306,
  user: "root",
  database: "db-purchases",
  password: "root",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
