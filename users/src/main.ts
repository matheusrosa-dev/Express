import express from "express";
import { usersController } from "./app/users/users.controller";

const app = express();

app.use(express.json());
app.use("/", usersController);

app.listen(3333, () => {
  console.log(`Users service is running`);
});
