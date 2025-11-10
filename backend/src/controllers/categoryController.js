// src/controllers/categoryController.js
import Category from "../models/Category.js";
import { success, error } from "../utils/response.js";

export const getActiveCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .select("name slug icon")
      .sort("name");
    success(res, { categories });
  } catch (err) {
    error(res, err.message);
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, icon } = req.body;
    if (!name) return error(res, "Name required", 400);

    const slug = name.toLowerCase().replace(/\s+/g, "-");
    const exists = await Category.findOne({ $or: [{ name }, { slug }] });
    if (exists) return error(res, "Category exists", 400);

    const category = new Category({ name, slug, icon });
    await category.save();
    success(res, { category }, "Created", 201);
  } catch (err) {
    error(res, err.message);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (updates.name) updates.slug = updates.name.toLowerCase().replace(/\s+/g, "-");

    const category = await Category.findByIdAndUpdate(id, updates, { new: true });
    if (!category) return error(res, "Not found", 404);
    success(res, { category }, "Updated");
  } catch (err) {
    error(res, err.message);
  }
};

export const deactivateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    if (!category) return error(res, "Not found", 404);
    success(res, {}, "Deactivated");
  } catch (err) {
    error(res, err.message);
  }
};