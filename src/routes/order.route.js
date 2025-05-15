import express from "express";
import * as orderController from "../controllers/orderController.js";

const router = express.Router();

router.get("/", orderController.getAll);
router.post("/", orderController.create);

export default router;
