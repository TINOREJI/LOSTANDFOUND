// backend/src/routes/aiRoutes.js
import express from "express";
import { detectObject } from "../controllers/aiControllers.js";
import { upload } from "../middleware/upload.js";  // ← NAMED import

const router = express.Router();

router.post("/detect", upload.single("image"), detectObject);

export default router;