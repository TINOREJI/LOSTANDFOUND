// src/controllers/questionnaireController.js
import Questionnaire from "../models/Questionnaire.js";
import Category from "../models/Category.js";
import { success, error } from "../utils/response.js";

export const getQuestionsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const doc = await Questionnaire.findOne({ category: categoryId })
      .populate("category", "name");

    if (!doc) return error(res, "No questions found", 404);
    success(res, { questions: doc.questions, category: doc.category.name });
  } catch (err) {
    error(res, err.message);
  }
};

export const upsertQuestionnaire = async (req, res) => {
  try {
    const { categoryId, questions } = req.body;
    if (!categoryId || !Array.isArray(questions)) {
      return error(res, "categoryId and questions[] required", 400);
    }

    const category = await Category.findById(categoryId);
    if (!category || !category.isActive) return error(res, "Invalid category", 400);

    const result = await Questionnaire.findOneAndUpdate(
      { category: categoryId },
      { category: categoryId, questions },
      { upsert: true, new: true }
    );

    success(res, { questions: result.questions }, "Saved", 201);
  } catch (err) {
    error(res, err.message);
  }
};