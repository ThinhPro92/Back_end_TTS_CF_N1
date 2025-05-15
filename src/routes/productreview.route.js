import express from "express";
import * as productreviewController from "../controllers/productreviewController.js";

const router = express.Router();

router.get("/", productreviewController.getAll);
router.post("/", productreviewController.create);

export default router;
