import express from "express";
import Item from "../models/Item.js";
import Questionnaire from "../models/Questionnaire.js";
import { calculateSimilarity } from "../utils/similarity.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { category, claimantAnswers } = req.body;
    const items = await Item.find({ category, status: "found" });
    const questionnaire = await Questionnaire.findOne({ category });

    const results = items.map(item => {
        const similarity = calculateSimilarity(item.finderAnswers, claimantAnswers, questionnaire.weights);
        return { ...item._doc, similarity };
    }).sort((a, b) => b.similarity - a.similarity);

    res.json(results);
});

export default router;
