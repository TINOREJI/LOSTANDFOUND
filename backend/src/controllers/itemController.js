// src/controllers/itemController.js
import Item from "../models/Item.js";
import Category from "../models/Category.js";
import Questionnaire from "../models/Questionnaire.js";
import { success, error } from "../utils/response.js";

function levenshteinDistance(a, b) {
  const matrix = Array(b.length + 1).fill().map(() => Array(a.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j;
  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + indicator
      );
    }
  }
  return matrix[b.length][a.length];
}

export const createFoundItem = async (req, res) => {
  try {
    const { category: categoryId, description, location, finderAnswers: raw } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : null;

    if (!categoryId || !description || !location) {
      return error(res, "category, description, location required", 400);
    }

    const category = await Category.findById(categoryId);
    if (!category || !category.isActive) return error(res, "Invalid category", 400);

    let finderAnswers = {};
    if (raw) {
      finderAnswers = typeof raw === "string" ? JSON.parse(raw) : raw;
    }

    const questionnaire = await Questionnaire.findOne({ category: categoryId });
    if (questionnaire) {
      const missing = questionnaire.questions
        .filter(q => !q.dependsOn)
        .map(q => q.id)
        .filter(id => !finderAnswers[id]);
      if (missing.length > 0) {
        return error(res, `Missing: ${missing.join(", ")}`, 400);
      }
    }

    const item = new Item({
      category: categoryId,
      description,
      location,
      finderAnswers,
      photo,
    });
    await item.save();

    success(res, { item }, "Reported", 201);
  } catch (err) {
    error(res, err.message);
  }
};

export const getAllFoundItems = async (req, res) => {
  try {
    const items = await Item.find({ status: "found" })
      .populate("category", "name")
      .sort({ reportedAt: -1 });
    success(res, { items });
  } catch (err) {
    error(res, err.message);
  }
};

// src/controllers/itemController.js
export const matchLostItem = async (req, res) => {
  try {
    const { categoryId, claimantAnswers } = req.body;
    // ... validation ...

    const questionnaire = await Questionnaire.findOne({ category: categoryId });
    if (!questionnaire) return error(res, "No questions", 400);

    // Build weight map
    const weightMap = {};
    questionnaire.questions.forEach(q => {
      weightMap[q.id] = q.weight || 1;
    });

    const candidates = await Item.find({ category: categoryId, status: "found" });

    const matches = candidates.map(item => {
      let totalWeight = 0;
      let matchedWeight = 0;

      Object.entries(claimantAnswers).forEach(([key, claimValue]) => {
        const foundValue = item.finderAnswers[key];
        if (!foundValue) return;

        const weight = weightMap[key] || 1;
        totalWeight += weight;

        const claim = String(claimValue).toLowerCase().trim();
        const found = String(foundValue).toLowerCase().trim();

        if (found === claim) {
          matchedWeight += weight;
        } else if (found.includes(claim) || claim.includes(found)) {
          matchedWeight += weight * 0.7;
        } else {
          const distance = levenshteinDistance(claim, found);
          const similarity = 1 - distance / Math.max(claim.length, found.length);
          if (similarity > 0.6) matchedWeight += weight * similarity;
        }
      });

      const score = totalWeight > 0 ? Math.round((matchedWeight / totalWeight) * 100) : 0;

      return {
        item: item._id,
        matchScore: score,
        matchedFields: Object.keys(claimantAnswers).filter(k => item.finderAnswers[k]),
        details: {
          description: item.description,
          location: item.location,
          photo: item.photo,
          reportedAt: item.reportedAt,
          finderAnswers: item.finderAnswers,
        },
      };
    })
    .filter(m => m.matchScore >= 30)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 10);

    success(res, {
      category: category.name,
      totalMatches: matches.length,
      matches: matches.map(m => m.item),
      details: matches,
    });
  } catch (err) {
    error(res, err.message);
  }
};