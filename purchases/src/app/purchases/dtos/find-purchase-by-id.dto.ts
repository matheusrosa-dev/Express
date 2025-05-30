import { z } from "zod";

export const findPurchaseByIdDtoSchema = z
  .object({
    purchaseId: z.coerce.number().int().positive(),
  })
  .strip();

export type FindPurchaseByIdDto = z.infer<typeof findPurchaseByIdDtoSchema>;
