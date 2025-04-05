import express from "express";
import dotenv from "dotenv";
import { runSynchonizeMigrations } from "./migrations/synchronize";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

if (process.env.SYNCHRONIZE === "TRUE") runSynchonizeMigrations();

// app.get("/", (req, res) => {
//   res.send("Hello, Express com TypeScript");
// });

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
