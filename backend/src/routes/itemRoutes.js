// src/routes/itemRoutes.js
import express from "express";
import { upload } from "../middleware/upload.js";
import {
  createFoundItem,
  getAllFoundItems,
  matchLostItem,
} from "../controllers/itemController.js";

const router = express.Router();

// CORRECT — no trailing slash
router.post("/found", upload.single("photo"), createFoundItem);
router.get("/", getAllFoundItems);
router.post("/match/lost", matchLostItem);

export default router;