import express from "express";
import { usersRouter } from "./app/users/users.router";
import { errorHandler } from "./middlewares";

const app = express();

app.use(express.json());
app.use("/", usersRouter);

app.use(errorHandler);

app.listen(3333, () => {
  console.log(`Users service is running`);
});
