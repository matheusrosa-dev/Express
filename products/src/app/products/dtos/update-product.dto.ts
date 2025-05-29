import { z } from "zod";

export const updateProductDtoSchema = z
  .object({
    name: z.string().min(3),
    description: z.string().optional(),
    price: z.number().positive(),
    stock: z.number().positive(),
  })
  .strip();

export type UpdateProductDto = z.infer<typeof updateProductDtoSchema>;
