import express from "express";
import { multerUpload, createItem, findItems } from "../controller/itemsController.js";

const router = express.Router();

// ✅ POST route with multer middleware and handler
router.post("/found", multerUpload, createItem);

// ✅ GET route to fetch all items
router.get("/", findItems);

export default router;
