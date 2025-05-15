import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.get("/", userController.getAll);
router.post("/", userController.create);

export default router;
