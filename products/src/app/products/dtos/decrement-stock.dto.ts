import { z } from "zod";

export const decrementStockDtoSchema = z
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

export type DecrementStockDto = z.infer<typeof decrementStockDtoSchema>;
