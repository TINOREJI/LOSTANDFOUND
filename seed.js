import mongoose from "mongoose";
import Questionnaire from "./models/Questionnaire.js";
import dotenv from "dotenv";

dotenv.config();
const db = process.env.MONGO_URL;

const questionnaires = [
  {
    category: "electronics",
    questions: [
      "Brand / Model",
      "Color",
      "Unique marks (scratches/stickers)",
      "Location lost/found",
      "Serial/IMEI if available"
    ],
    weights: [40, 20, 20, 10, 10]
  },
  {
    category: "books",
    questions: [
      "Title / Subject",
      "Cover color",
      "Owner’s name inside",
      "Condition (new/old)",
      "Location lost/found"
    ],
    weights: [40, 20, 20, 10, 10]
  },
  {
    category: "wallet",
    questions: [
      "Color",
      "Brand/Type",
      "Items inside (ID card, bus pass, cash)",
      "Size",
      "Location lost/found"
    ],
    weights: [30, 20, 30, 10, 10]
  },
  {
    category: "idcard",
    questions: [
      "Name on card",
      "ID number",
      "Color/design of card",
      "Lanyard/holder description",
      "Location lost/found"
    ],
    weights: [50, 30, 10, 5, 5]
  }
];

const seedDatabase = async () => {
  try {
<<<<<<< HEAD
    // console.log("🔍 Connecting to:", db);
=======
    console.log("🔍 Connecting to Database");
>>>>>>> db28076 (update code)
    await mongoose.connect(db);  // ✅ Clean connection

    // Optional: Clear old data
    await Questionnaire.deleteMany();
    await Questionnaire.insertMany(questionnaires);

    console.log("✅ Questionnaires seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    // Always close connection after operations
    await mongoose.connection.close();
    console.log("🔌 Database connection closed.");
  }
};

seedDatabase();
