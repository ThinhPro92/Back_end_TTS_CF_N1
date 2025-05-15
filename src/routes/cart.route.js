import express from "express";
import * as cartController from "../controllers/cartController.js";

const router = express.Router();

router.get("/", cartController.getAll);
router.post("/", cartController.create);

export default router;
