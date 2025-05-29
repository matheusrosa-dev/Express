import express from "express";
import { productsRouter } from "./app/products/products.router";

const app = express();

app.use(express.json());
app.use("/", productsRouter);

app.listen(3333, () => {
  console.log(`Products service is running`);
});
