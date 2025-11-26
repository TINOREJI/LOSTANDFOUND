// backend/src/routes/itemRoutes.js
import express from "express";
import { upload } from "../middleware/upload.js";
import {
  createFoundItem,
  getAllFoundItems,
  matchLostItem,
  getItemById,
} from "../controllers/itemController.js";

import Item from "../models/Item.js";
import { success, error } from "../utils/response.js";
import Category from "../models/Category.js";

const router = express.Router();

// Public routes
router.post("/found", upload.single("photo"), createFoundItem);
router.get("/", getAllFoundItems);                    // → /api/v1/item  (all found items)
router.post("/match/lost", matchLostItem);
router.get("/:id", getItemById);                      // → /api/v1/item/123abc

// Optional: Admin route — get ALL items (found + claimed)
router.get("/admin/all", async (req, res) => {
  try {
    const items = await Item.find()
      .populate("category", "name slug")
      .sort({ reportedAt: -1 })
      .lean();

    return success(res, { items });
  } catch (err) {
    console.error("Admin get all items error:", err);
    return error(res, "Failed to fetch all items", 500);
  }
});

router.get("/by-category/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Validate ObjectId
    if (!categoryId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: "Invalid category ID" });
    }

    const items = await Item.find({
      category: categoryId,
      status: "found"
    })
      .sort({ reportedAt: -1 })
      .lean();

    const category = await Category.findById(categoryId).select("name");

    const results = items.map(item => ({
      item: item._id,
      matchScore: 100,
      details: {
        description: item.description,
        location: item.location,
        photo: item.photo || null,
        reportedAt: item.reportedAt,
        finderAnswers: item.finderAnswers || {},
      },
    }));

    res.json({
      success: true,
      category: category?.name || "Unknown",
      totalMatches: results.length,
      details: results,
    });

  } catch (err) {
    console.error("by-category error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
export default router;