import express from "express";
import * as roleController from "../controllers/roleController.js";

const router = express.Router();

router.get("/", roleController.getAll);
router.post("/", roleController.create);

export default router;
