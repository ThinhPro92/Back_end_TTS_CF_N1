import express from "express";
import * as categoryController from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", categoryController.getAll);
router.post("/", categoryController.create);

export default router;
