import express from "express";
import { userRouter } from "./app/user/user.router";
import { errorHandler } from "./shared/middlewares";

const app = express();

app.use(express.json());
app.use("/", userRouter);

app.use(errorHandler);

app.listen(3333, () => {
  console.log(`User service is running`);
});
