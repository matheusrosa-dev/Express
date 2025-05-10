import express from "express";
import dotenv from "dotenv";
import { usersController } from "./app/users/users.controller";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/", usersController);

app.listen(PORT, () => {
  console.log(`Users service is running on port ${PORT}`);
});
