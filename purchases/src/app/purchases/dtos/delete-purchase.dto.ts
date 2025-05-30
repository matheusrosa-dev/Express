import { z } from "zod";

export const deletePurchaseDtoSchema = z
  .object({
    purchaseId: z.coerce.number().int().positive(),
  })
  .strip();

export type DeletePurchaseDto = z.infer<typeof deletePurchaseDtoSchema>;
