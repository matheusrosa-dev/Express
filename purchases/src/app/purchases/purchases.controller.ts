import { Router } from "express";
import { PurchaseItemsRepository, PurchasesRepository } from "./repositories";
import { PurchaseItemsModel, PurchasesModel } from "./models";
import { PurchasesService } from "./purchases.service";
import { zodValidationMiddleware } from "../../middlewares";
import { createPurchaseSchema } from "./dtos/create-purchase.dto";

const purchasesModel = new PurchasesModel();
const purchaseItemsModel = new PurchaseItemsModel();
const purchaseItemsRepository = new PurchaseItemsRepository(purchaseItemsModel);
const purchasesRepository = new PurchasesRepository(
  purchasesModel,
  purchaseItemsRepository
);
const purchasesService = new PurchasesService(purchasesRepository);
const purchasesController = Router();

purchasesController.get(
  "/user/:userId",
  purchasesService.findByUserId.bind(purchasesService)
);

purchasesController.post(
  "/",
  zodValidationMiddleware(createPurchaseSchema),
  purchasesService.create.bind(purchasesService)
);

purchasesController.get(
  "/:purchaseId",
  purchasesService.findById.bind(purchasesService)
);

purchasesController.delete(
  "/:purchaseId",
  purchasesService.delete.bind(purchasesService)
);

export { purchasesController };
