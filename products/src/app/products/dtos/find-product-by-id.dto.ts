import { z } from "zod";

export const findProductByIdDtoSchema = z
  .object({
    productId: z.coerce.number().int().positive(),
  })
  .strip();

export type FindProductByIdDto = z.infer<typeof findProductByIdDtoSchema>;
