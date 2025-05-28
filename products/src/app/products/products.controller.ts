import { Router } from "express";
import { ProductsRepository } from "./repositories";
import { ProductsModel } from "./models";
import { ProductsService } from "./products.service";
import { zodValidationMiddleware } from "../../middlewares";
import { createProductSchema, decrementStockSchema } from "./dtos";

const productsModel = new ProductsModel();
const productsRepository = new ProductsRepository(productsModel);
const productsService = new ProductsService(productsRepository);

const productsController = Router();

productsController.get("/", productsService.findAll.bind(productsService));

productsController.post(
  "/",
  zodValidationMiddleware(createProductSchema),
  productsService.create.bind(productsService)
);

productsController.put(
  "/decrement",
  zodValidationMiddleware(decrementStockSchema),
  productsService.decrementStock.bind(productsService)
);

productsController.get(
  "/:productId",
  productsService.findById.bind(productsService)
);

productsController.put(
  "/:productId",
  productsService.update.bind(productsService)
);

productsController.delete(
  "/:productId",
  productsService.delete.bind(productsService)
);

export { productsController };
