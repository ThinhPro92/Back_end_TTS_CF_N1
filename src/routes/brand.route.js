import express from "express";
import * as brandController from "../controllers/brandController.js";

const router = express.Router();

router.get("/", brandController.getAll);
router.post("/", brandController.create);

export default router;
