// src/routes/itemRoutes.js
import express from "express";
import { upload } from "../middleware/upload.js";
import {
  createFoundItem,
  getAllFoundItems,
  matchLostItem,
  getItemById,        // ← ADD THIS
} from "../controllers/itemController.js";

const router = express.Router();

router.post("/found", upload.single("photo"), createFoundItem);
router.get("/", getAllFoundItems);
router.post("/match/lost", matchLostItem);

// ADD THESE TWO LINES
router.get("/:id", getItemById);                    // ← GET single item
export default router;

// GET ALL items (found + claimed) — for admin
router.get("/item", async (req, res) => {
  try {
    const items = await Item.find()
      .populate("category", "name slug")
      .sort({ reportedAt: -1 })
      .lean();
    success(res, { items });
  } catch (err) {
    error(res, err.message);
  }
});