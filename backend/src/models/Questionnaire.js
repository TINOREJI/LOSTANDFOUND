// src/models/Questionnaire.js
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  label: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ["text", "select", "multiselect", "number", "date"],
    default: "text",
  },
  placeholder: String,
  options: [String], 
  required: {
    type: Boolean,
    default: false, 
  },
  weight: {
    type: Number,
    default: 1,
    min: 1,
    max: 10,
  },
  dependsOn: {
    id: { type: String },
    value: { type: String },
  },
  hint: String,
}, { timestamps: true });

const questionnaireSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
    unique: true,
  },
  title: {
    type: String,
    default: "Item Details",
  },
  description: String,
  questions: [questionSchema],
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

questionnaireSchema.index({ category: 1 });

export default mongoose.model("Questionnaire", questionnaireSchema);