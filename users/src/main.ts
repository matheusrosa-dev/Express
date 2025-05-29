import express from "express";
import { usersRouter } from "./app/users/users.router";

const app = express();

app.use(express.json());
app.use("/", usersRouter);

app.listen(3333, () => {
  console.log(`Users service is running`);
});
