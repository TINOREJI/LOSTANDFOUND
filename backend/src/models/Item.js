// src/models/Item.js
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  description: { type: String, required: true },
  location: { type: String, required: true },
  finderAnswers: { type: Object, default: {} },
  photo: String,
  status: { type: String, enum: ["found", "claimed"], default: "found" },
  reportedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Item", itemSchema);