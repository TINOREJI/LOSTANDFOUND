import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    category: String,
    description: String,
    photo: String,
    location: String,
    status: { type: String, default: "found" },
    finderAnswers: Object,
    claimantAnswers: Object
});

export default mongoose.model("Item", itemSchema);
