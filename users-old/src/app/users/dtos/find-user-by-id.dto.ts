import { z } from "zod";

export const findUserByIdDtoSchema = z
  .object({
    userId: z.coerce.number().int().positive(),
  })
  .strip();

export type FindUserByIdDto = z.infer<typeof findUserByIdDtoSchema>;
