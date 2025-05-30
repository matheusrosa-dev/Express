import { Router } from "express";
import { PurchaseItemsRepository, PurchasesRepository } from "./repositories";
import { PurchasesService } from "./purchases.service";
import { createPurchaseDtoSchema } from "./dtos/create-purchase.dto";
import { PurchasesController } from "./purchases.controller";
import { bodyValidationMiddleware } from "../../shared/middlewares";

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
  bodyValidationMiddleware(createPurchaseDtoSchema),
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
