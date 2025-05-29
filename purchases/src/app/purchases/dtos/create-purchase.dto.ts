import { z } from "zod";

export const createPurchaseDtoSchema = z
  .object({
    userId: z.number().positive(),
    items: z
      .array(
        z.object({
          productId: z.number().positive(),
          amount: z.number().positive(),
        })
      )
      .min(1),
  })
  .strip();

export type CreatePurchaseDto = z.infer<typeof createPurchaseDtoSchema>;
