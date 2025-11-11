// src/controllers/itemController.js
import Item from "../models/Item.js";
import Category from "../models/Category.js";
import Questionnaire from "../models/Questionnaire.js";
import { success, error } from "../utils/response.js";

// Levenshtein Distance
function levenshteinDistance(a, b) {
  const matrix = Array(b.length + 1)
    .fill()
    .map(() => Array(a.length + 1).fill(0));

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

// 1. CREATE FOUND ITEM
export const createFoundItem = async (req, res) => {
  try {
    const { category: categoryId, description, location, finderAnswers: raw } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : null;

    if (!categoryId || !description || !location) {
      return error(res, "category, description, location required", 400);
    }

    const category = await Category.findById(categoryId);
    if (!category || !category.isActive) {
      return error(res, "Invalid or inactive category", 400);
    }

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
        return error(res, `Missing required answers: ${missing.join(", ")}`, 400);
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

    return success(res, { item }, "Item reported successfully", 201);
  } catch (err) {
    console.error("createFoundItem Error:", err);
    return error(res, err.message || "Failed to report item", 500);
  }
};

// 2. GET ALL FOUND ITEMS
export const getAllFoundItems = async (req, res) => {
  try {
    const items = await Item.find({ status: "found" })
      .populate("category", "name")
      .sort({ reportedAt: -1 })
      .lean();

    return success(res, { items });
  } catch (err) {
    console.error("getAllFoundItems Error:", err);
    return error(res, err.message || "Failed to fetch items", 500);
  }
};

// 3. MATCH LOST ITEM
export const matchLostItem = async (req, res) => {
  try {
    const { categoryId, claimantAnswers } = req.body;

    if (!categoryId || !claimantAnswers) {
      return error(res, "categoryId and claimantAnswers are required", 400);
    }

    const category = await Category.findById(categoryId).select("name isActive");
    if (!category) return error(res, "Category not found", 404);
    if (!category.isActive) return error(res, "Category is not active", 400);

    const questionnaire = await Questionnaire.findOne({ category: categoryId });
    if (!questionnaire) return error(res, "No questions configured", 404);

    const weightMap = {};
    questionnaire.questions.forEach(q => {
      weightMap[q.id] = q.weight || 1;
    });

    const candidates = await Item.find({
      category: categoryId,
      status: "found",
    }).lean();

    if (candidates.length === 0) {
      return success(res, {
        category: category.name,
        totalMatches: 0,
        matches: [],
        details: [],
      });
    }

    const matches = candidates.map(item => {
      let totalWeight = 0;
      let matchedWeight = 0;

      Object.entries(claimantAnswers).forEach(([key, claimValue]) => {
        const foundValue = item.finderAnswers?.[key];
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
          const maxLen = Math.max(claim.length, found.length);
          if (maxLen > 0) {
            const similarity = 1 - distance / maxLen;
            if (similarity > 0.6) matchedWeight += weight * similarity;
          }
        }
      });

      const score = totalWeight > 0 ? Math.round((matchedWeight / totalWeight) * 100) : 0;

      return {
        item: item._id,
        matchScore: score,
        matchedFields: Object.keys(claimantAnswers).filter(k => item.finderAnswers?.[k]),
        details: {
          description: item.description,
          location: item.location,
          photo: item.photo || null,
          reportedAt: item.reportedAt,
          finderAnswers: item.finderAnswers,
        },
      };
    })
    .filter(m => m.matchScore >= 30)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 10);

    return success(res, {
      category: category.name,
      totalMatches: matches.length,
      matches: matches.map(m => m.item),
      details: matches,
    });

  } catch (err) {
    console.error("matchLostItem Error:", err);
    return error(res, "Internal server error", 500);
  }
};