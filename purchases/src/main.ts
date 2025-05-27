import express from "express";
import { purchasesController } from "./app/purchases/purchases.controller";

const app = express();

app.use(express.json());

app.use("/", purchasesController);

app.listen(3333, () => {
  console.log(`Purchases service is running`);
});
