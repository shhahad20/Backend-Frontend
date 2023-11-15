import { Router } from "express";

import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../controllers/productController.js";
import { crateProducutValidator, producutIdValidator, updateProducutValidator } from "../vaildators/productValidator.js";
import { runValidation } from "../vaildators/vaildationRunner.js";

const router = Router();

// router.get("/", rootFeedback);
router.get("/", getAllProducts);
router.get("/:id", producutIdValidator,runValidation, getSingleProduct);

router.delete("/:id", producutIdValidator,runValidation, deleteProduct);

router.post("/", crateProducutValidator,runValidation, createProduct);

router.put("/:id",producutIdValidator,updateProducutValidator,runValidation, updateProduct);

export default router;
