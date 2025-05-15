import express from "express";
import * as productvariationController from "../controllers/productvariationController.js";

const router = express.Router();

router.get("/", productvariationController.getAll);
router.post("/", productvariationController.create);

export default router;
