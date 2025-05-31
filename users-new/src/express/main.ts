import express from "express";

const app = express();

app.use(express.json());

app.get("/", () => {});

app.listen(3333, () => {
  console.log(`Users service is running`);
});
