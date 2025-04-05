import express from "express";
import "./migrations/synchronize";

const app = express();
const PORT = 3333;

// app.get("/", (req, res) => {
//   res.send("Hello, Express com TypeScript");
// });

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
