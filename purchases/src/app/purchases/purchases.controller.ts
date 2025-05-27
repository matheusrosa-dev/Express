import { Router } from "express";
import { PurchasesRepository } from "./repositories";
import { PurchasesModel } from "./models";
import { PurchasesService } from "./purchases.service";

const purchasesModel = new PurchasesModel();
const purchasesRepository = new PurchasesRepository(purchasesModel);
const purchasesService = new PurchasesService(purchasesRepository);

const purchasesController = Router();

purchasesController.get("/", purchasesService.findAll.bind(purchasesService));

purchasesController.post("/", purchasesService.create.bind(purchasesService));

purchasesController.get(
  "/:purchaseId",
  purchasesService.findById.bind(purchasesService)
);

purchasesController.delete(
  "/:purchaseId",
  purchasesService.delete.bind(purchasesService)
);

export { purchasesController };
