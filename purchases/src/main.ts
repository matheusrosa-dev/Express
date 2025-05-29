import express from "express";
import { purchasesRouter } from "./app/purchases/purchases.router";

const app = express();

app.use(express.json());

app.use("/", purchasesRouter);

app.listen(3333, () => {
  console.log(`Purchases service is running`);
});
