import express from "express";
import { errorHandler } from "./shared/middlewares";

const app = express();

app.use(express.json());

app.use(errorHandler);

app.listen(3333, () => {
  console.log(`Product service is running`);
});
