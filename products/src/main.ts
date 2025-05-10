import express from "express";
import dotenv from "dotenv";
import { productsController } from "./app/products/products.controller";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/", productsController);

app.listen(PORT, () => {
  console.log(`Products service is running on port ${PORT}`);
});
