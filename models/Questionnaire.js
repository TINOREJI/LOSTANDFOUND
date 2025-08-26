import mongoose from "mongoose";

const questionnaireSchema = new mongoose.Schema({
    category: String,
    questions: [String],
    weights: [Number]
});

export default mongoose.model("Questionnaire", questionnaireSchema);
