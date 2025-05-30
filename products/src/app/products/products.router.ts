import { Router } from "express";
import { ProductsRepository } from "./repositories";
import { ProductsService } from "./products.service";
import {
  createProductDtoSchema,
  decrementStockDtoSchema,
  deleteProductDtoSchema,
  findProductByIdDtoSchema,
  updateProductBodyDtoSchema,
  updateProductParamsDtoSchema,
} from "./dtos";
import { ProductsController } from "./products.controller";
import {
  bodyValidationMiddleware,
  paramsValidationMiddleware,
} from "../../shared/middlewares";

const productsRepository = new ProductsRepository();
const productsService = new ProductsService(productsRepository);
const productsController = new ProductsController(productsService);

const productsRouter = Router();

productsRouter.get("/", productsController.findAll.bind(productsController));

productsRouter.post(
  "/",
  bodyValidationMiddleware(createProductDtoSchema),
  productsController.create.bind(productsController)
);

productsRouter.put(
  "/decrement",
  bodyValidationMiddleware(decrementStockDtoSchema),
  productsController.decrementStock.bind(productsController)
);

productsRouter.get(
  "/:productId",
  paramsValidationMiddleware(findProductByIdDtoSchema),
  productsController.findById.bind(productsController)
);

productsRouter.put(
  "/:productId",
  paramsValidationMiddleware(updateProductParamsDtoSchema),
  bodyValidationMiddleware(updateProductBodyDtoSchema),
  productsController.update.bind(productsController)
);

productsRouter.delete(
  "/:productId",
  paramsValidationMiddleware(deleteProductDtoSchema),
  productsController.delete.bind(productsController)
);

export { productsRouter };
