import { z } from "zod";

export const updateProductBodyDtoSchema = z
  .object({
    name: z.string().min(3),
    description: z.string().optional(),
    price: z.number().positive(),
    stock: z.number().positive(),
  })
  .strip();

export const updateProductParamsDtoSchema = z
  .object({
    productId: z.coerce.number().int().positive(),
  })
  .strip();

export type UpdateProductBodyDto = z.infer<typeof updateProductBodyDtoSchema>;
export type UpdateProductParamsDto = z.infer<
  typeof updateProductParamsDtoSchema
>;
