import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(
  "/products",
  createProxyMiddleware({
    target: "http://api-products:3333",
    changeOrigin: true,
  })
);

app.use(
  "/users",
  createProxyMiddleware({
    target: "http://api-users:3333",
    changeOrigin: true,
  })
);

app.listen(PORT, () => console.log(`Proxy gateway is running on port ${PORT}`));
