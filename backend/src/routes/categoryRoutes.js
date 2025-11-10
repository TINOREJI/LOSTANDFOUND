// src/routes/categoryRoutes.js
import express from "express";
import {
  getActiveCategories,
  createCategory,
  updateCategory,
  deactivateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getActiveCategories);
router.post("/", createCategory);
router.put("/:id", updateCategory);      // CORRECT
router.delete("/:id", deactivateCategory); // CORRECT

export default router;