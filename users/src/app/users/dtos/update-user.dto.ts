import { z } from "zod";

export const updateUserDtoSchema = z
  .object({
    name: z.string().min(3),
  })
  .strip();

export type UpdateUserDto = z.infer<typeof updateUserDtoSchema>;
