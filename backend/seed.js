// seed.js (ROOT - J:\LostandFound\backend\seed.js)
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import Category from "./src/models/Category.js";
import Questionnaire from "./src/models/Questionnaire.js";

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from root
dotenv.config({ path: path.join(__dirname, ".env") });

// Validate MONGO_URI
if (!process.env.MONGO_URL) {
  console.error("ERROR: MONGO_URL is missing in .env");
  process.exit(1);
}

// Connect to MongoDB
try {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("MongoDB Connected for seeding");
} catch (err) {
  console.error("DB Connection Error:", err.message);
  process.exit(1);
}

// Seed data
(async () => {
  try {
    // 1. Create Phone Category
    const phoneCat = await Category.findOneAndUpdate(
      { name: "Phone" },
      { name: "Phone", slug: "phone", icon: "FiSmartphone", isActive: true },
      { upsert: true, new: true }
    );

    console.log("Category 'Phone' ready:", phoneCat._id);

    // 2. Create Questionnaire
    await Questionnaire.findOneAndUpdate(
      { category: phoneCat._id },
      {
        category: phoneCat._id,
        questions: [
          { id: "color", label: "Color", placeholder: "e.g. Black" },
          { id: "brand", label: "Brand", placeholder: "e.g. Apple" },
          { id: "has_case", label: "Has Case?", type: "select", options: ["Yes", "No"] },
          {
            id: "case_color",
            label: "Case Color",
            placeholder: "e.g. Red",
            dependsOn: { id: "has_case", value: "Yes" }
          },
        ],
      },
      { upsert: true }
    );

    console.log("Questionnaire for Phone created");

    // 3. Optional: Add a sample found item
    // (Skip for now — test with curl later)

    console.log("Seeding completed!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }
})();