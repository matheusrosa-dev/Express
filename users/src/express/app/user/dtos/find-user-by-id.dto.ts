import { z } from "zod";

export const findUserByIdDtoSchema = z
  .object({
    userId: z.coerce.string().uuid(),
  })
  .strip();

export type FindUserByIdDto = z.infer<typeof findUserByIdDtoSchema>;
