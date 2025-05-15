import express from "express";
import * as couponController from "../controllers/couponController.js";

const router = express.Router();

router.get("/", couponController.getAll);
router.post("/", couponController.create);

export default router;
