import { CategoryController } from "../controllers/category.controller";
import { OfferController } from "../controllers/offer.controller";
import { Router } from "express";
const router = Router();

router.get("/", CategoryController.getAll);
 router.get("/:id", CategoryController.getById);
router.post("/", CategoryController.create);
router.put("/:id", CategoryController.update);
router.delete("/:id", CategoryController.delete); 

export default router;