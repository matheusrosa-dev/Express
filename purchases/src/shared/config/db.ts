import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "localhost",
  port: 3307,
  user: "root",
  database: "purchases",
  password: "root",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
