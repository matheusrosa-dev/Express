import express from "express";
import { purchasesRouter } from "./app/purchases/purchases.router";
import { errorHandler } from "./shared/middlewares";

const app = express();
app.use(express.json());

app.use("/", purchasesRouter);

app.use(errorHandler);

app.listen(3333, () => {
  console.log(`Purchases service is running`);
});
