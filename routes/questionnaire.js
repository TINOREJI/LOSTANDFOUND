import express from "express";
import Questionnaire from "../models/Questionnaire.js";

const router = express.Router();

// 📌 GET questionnaire by category
router.get("/:category", async (req, res) => {
    const { category } = req.params;

    try {
        const questionnaire = await Questionnaire.findOne({ category });
        if (!questionnaire) {
            return res.status(404).json({ message: "Questionnaire not found" });
        }
        res.json(questionnaire);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
