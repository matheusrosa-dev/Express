import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

const API_PORT = 3333;

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

app.use(
  "/purchases",
  createProxyMiddleware({
    target: "http://api-purchases:3333",
    changeOrigin: true,
  })
);

app.listen(API_PORT, () =>
  console.log(`Proxy gateway is running on port ${API_PORT}`)
);
