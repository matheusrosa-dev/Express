import { z } from "zod";

export const createProductDtoSchema = z
  .object({
    name: z.string().min(3),
    description: z.string().optional(),
    price: z.number().positive(),
    stock: z.number().positive(),
  })
  .strip();

export type CreateProductDto = z.infer<typeof createProductDtoSchema>;
