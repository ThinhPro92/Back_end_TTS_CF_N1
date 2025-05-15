import express from "express";
import * as wishlistController from "../controllers/wishlistController.js";

const router = express.Router();

router.get("/", wishlistController.getAll);
router.post("/", wishlistController.create);

export default router;
