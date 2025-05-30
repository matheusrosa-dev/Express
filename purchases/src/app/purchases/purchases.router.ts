import { Router } from "express";
import { PurchaseItemsRepository, PurchasesRepository } from "./repositories";
import { PurchasesService } from "./purchases.service";
import { PurchasesController } from "./purchases.controller";
import {
  bodyValidationMiddleware,
  paramsValidationMiddleware,
} from "../../shared/middlewares";
import {
  createPurchaseDtoSchema,
  deletePurchaseDtoSchema,
  findPurchasesByUserIdDtoSchema,
} from "./dtos";

const purchaseItemsRepository = new PurchaseItemsRepository();
const purchasesRepository = new PurchasesRepository(purchaseItemsRepository);
const purchasesService = new PurchasesService(purchasesRepository);
const purchasesController = new PurchasesController(purchasesService);

const purchasesRouter = Router();

purchasesRouter.get(
  "/user/:userId",
  paramsValidationMiddleware(findPurchasesByUserIdDtoSchema),
  purchasesController.findByUserId.bind(purchasesController)
);

purchasesRouter.post(
  "/",
  bodyValidationMiddleware(createPurchaseDtoSchema),
  purchasesController.create.bind(purchasesController)
);

purchasesRouter.get(
  "/:purchaseId",
  paramsValidationMiddleware(deletePurchaseDtoSchema),
  purchasesController.findById.bind(purchasesController)
);

purchasesRouter.delete(
  "/:purchaseId",
  paramsValidationMiddleware(deletePurchaseDtoSchema),
  purchasesController.delete.bind(purchasesController)
);

export { purchasesRouter };
