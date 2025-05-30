import { z } from "zod";

export const findPurchasesByUserIdDtoSchema = z
  .object({
    userId: z.coerce.number().int().positive(),
  })
  .strip();

export type FindPurchasesByUserIdDto = z.infer<
  typeof findPurchasesByUserIdDtoSchema
>;
