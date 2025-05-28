import { api } from "../axios";
import { Product } from "./types";

const findById = async (productId: number) => {
  const { data } = await api.get(`/products/${productId}`);

  return data?.data as Product;
};

const decrementStock = async (body: {
  items: { productId: number; amount: number }[];
}) => {
  const { data } = await api.put(`/products/decrement`, body);

  return data?.data as Product;
};

export const productsServices = {
  findById,
  decrementStock,
};
