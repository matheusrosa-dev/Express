import axios from "axios";

export const api = axios.create({
  baseURL: "http://proxy-gateway:3333",
});
