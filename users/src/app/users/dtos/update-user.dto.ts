import { z } from "zod";

export const updateUserBodyDtoSchema = z
  .object({
    name: z.string().min(3),
  })
  .strip();

export const updateUserParamsDtoSchema = z
  .object({
    userId: z.coerce.number().int().positive(),
  })
  .strip();

export type UpdateUserBodyDto = z.infer<typeof updateUserBodyDtoSchema>;
export type UpdateUserParamsDto = z.infer<typeof updateUserParamsDtoSchema>;
