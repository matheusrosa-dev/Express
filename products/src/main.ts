import express from "express";
import { productsController } from "./app/products/products.controller";

const app = express();

app.use(express.json());
app.use("/", productsController);

app.listen(3333, () => {
  console.log(`Products service is running`);
});
