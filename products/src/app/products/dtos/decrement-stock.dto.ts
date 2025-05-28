import { z } from "zod";

export const decrementStockSchema = z
  .object({
    items: z
      .array(
        z.object({
          productId: z.number(),
          amount: z.number().positive(),
        })
      )
      .min(1),
  })
  .strip();

export type DecrementStockDto = z.infer<typeof decrementStockSchema>;
