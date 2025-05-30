import express from "express";
import { productsRouter } from "./app/products/products.router";
import { errorHandler } from "./shared/middlewares";

const app = express();

app.use(express.json());
app.use("/", productsRouter);

app.use(errorHandler);

app.listen(3333, () => {
  console.log(`Products service is running`);
});
