import { z } from "zod";

export const deleteUserDtoSchema = z
  .object({
    userId: z.coerce.string().uuid(),
  })
  .strip();

export type DeleteUserDto = z.infer<typeof deleteUserDtoSchema>;
