import { z } from "zod";

export const decrementStockSchema = z
  .object({
    amount: z.number().positive(),
  })
  .strip();

export type DecrementStockDto = z.infer<typeof decrementStockSchema>;
