// src/models/Questionnaire.js
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  label: { type: String, required: true },
  type: { type: String, default: "text" },
  placeholder: String,
  options: [String],
  dependsOn: {
    id: String,
    value: String,
  },
  weight: { type: Number, default: 1, min: 1, max: 10 } // ← NEW
});

const questionnaireSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  questions: [questionSchema],
});

export default mongoose.model("Questionnaire", questionnaireSchema);