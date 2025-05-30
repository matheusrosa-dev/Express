import { z } from "zod";

export const deleteProductDtoSchema = z
  .object({
    productId: z.coerce.number().int().positive(),
  })
  .strip();

export type DeleteProductDto = z.infer<typeof deleteProductDtoSchema>;
