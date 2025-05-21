import { api } from "../axios";
import { User } from "./types";

const findById = async (userId: number) => {
  const { data } = await api.get(`/users/${userId}`);

  return data?.data as User;
};

export const usersServices = {
  findById,
};
