import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "express",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
