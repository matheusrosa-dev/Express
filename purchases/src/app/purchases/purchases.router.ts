import { Router } from "express";
import { PurchaseItemsRepository, PurchasesRepository } from "./repositories";
import { PurchasesService } from "./purchases.service";
import { zodValidationMiddleware } from "../../middlewares";
import { createPurchaseDtoSchema } from "./dtos/create-purchase.dto";
import { PurchasesController } from "./purchases.controller";

const purchaseItemsRepository = new PurchaseItemsRepository();
const purchasesRepository = new PurchasesRepository(purchaseItemsRepository);
const purchasesService = new PurchasesService(purchasesRepository);
const purchasesController = new PurchasesController(purchasesService);

const purchasesRouter = Router();

purchasesRouter.get(
  "/user/:userId",
  purchasesController.findByUserId.bind(purchasesController)
);

purchasesRouter.post(
  "/",
  zodValidationMiddleware(createPurchaseDtoSchema),
  purchasesController.create.bind(purchasesController)
);

purchasesRouter.get(
  "/:purchaseId",
  purchasesController.findById.bind(purchasesController)
);

purchasesRouter.delete(
  "/:purchaseId",
  purchasesController.delete.bind(purchasesController)
);

export { purchasesRouter };
