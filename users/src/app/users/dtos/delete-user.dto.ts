import { z } from "zod";

export const deleteUserDtoSchema = z
  .object({
    userId: z.coerce.number().int().positive(),
  })
  .strip();

export type DeleteUserDto = z.infer<typeof deleteUserDtoSchema>;
