import { z } from "zod";

export const validateEmail = (email: string) => {
  const { success: isValid } = z.string().email().safeParse(email);
  return isValid;
};
