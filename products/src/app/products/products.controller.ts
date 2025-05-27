import { Router } from "express";
import { ProductsRepository } from "./repositories";
import { ProductsModel } from "./models";
import { ProductsService } from "./products.service";

const productsModel = new ProductsModel();
const productsRepository = new ProductsRepository(productsModel);
const productsService = new ProductsService(productsRepository);

const productsController = Router();

productsController.get("/", productsService.findAll.bind(productsService));

productsController.post("/", productsService.create.bind(productsService));

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

productsController.put(
  "/:productId/decrement",
  productsService.decrementStock.bind(productsService)
);

export { productsController };
