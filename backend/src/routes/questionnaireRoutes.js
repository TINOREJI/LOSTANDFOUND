// src/routes/questionnaireRoutes.js
import express from "express";
import { getQuestionsByCategory, upsertQuestionnaire } from "../controllers/questionnaireController.js";

const router = express.Router();

router.get("/:categoryId", getQuestionsByCategory); // CORRECT
router.post("/", upsertQuestionnaire);

export default router;