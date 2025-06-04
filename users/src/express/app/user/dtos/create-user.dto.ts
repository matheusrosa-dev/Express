import { z } from "zod";

export const createUserDtoSchema = z
  .object({
    name: z.string().min(3),
    email: z.string().email(),
  })
  .strip();

export type CreateUserDto = z.infer<typeof createUserDtoSchema>;
