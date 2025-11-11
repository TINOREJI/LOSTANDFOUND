// seed-items.js (ROOT - J:\LostandFound\backend\seed-items.js)
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import Category from "./src/models/Category.js";
import Questionnaire from "./src/models/Questionnaire.js";
import Item from "./src/models/Item.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

if (!process.env.MONGO_URL) {
  console.error("MONGO_URI missing in .env");
  process.exit(1);
}

try {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected to MongoDB");
} catch (err) {
  console.error("DB Connection Error:", err.message);
  process.exit(1);
}

const placeholderPhoto = "https://via.placeholder.com/400x300/1a1a1a/orange?text=Found+Item";
const locations = [
  "Library 2F",
  "Cafeteria",
  "Main Gate",
  "Lecture Hall A1",
  "Gym Locker",
  "Parking Lot",
];

// Sample realistic answers per category
const sampleAnswers = {
  Phone: [
    {
      brand: "Apple",
      model: "iPhone 15 Pro",
      color: "Black Titanium",
      has_case: "Yes",
      case_color: "Red",
      screen_condition: "Minor scratch",
    },
    {
      brand: "Samsung",
      model: "Galaxy S24",
      color: "Phantom Black",
      has_case: "No",
      screen_condition: "Cracked",
    },
    {
      brand: "Google",
      model: "Pixel 8",
      color: "Obsidian",
      has_case: "Yes",
      case_color: "Blue",
      screen_condition: "Perfect",
    },
  ],
  Wallet: [
    {
      brand: "Leather",
      color: "Brown",
      has_cards: "Yes",
      card_type: "Credit Card",
      has_cash: "Yes",
      cash_amount: "500 INR",
    },
    {
      brand: "Synthetic",
      color: "Black",
      has_cards: "No",
      has_cash: "Yes",
      cash_amount: "200 INR",
    },
    {
      brand: "Canvas",
      color: "Green",
      has_cards: "Yes",
      card_type: "Student ID",
      has_cash: "No",
    },
  ],
  Keys: [
    {
      key_type: "House Keys",
      count: "3",
      has_keychain: "Yes",
      keychain_desc: "Red car keychain",
    },
    {
      key_type: "Car Keys",
      count: "1",
      has_keychain: "Yes",
      keychain_desc: "BMW logo",
    },
    {
      key_type: "Office Keys",
      count: "2",
      has_keychain: "No",
    },
  ],
  Laptop: [
    {
      brand: "Dell",
      model: "XPS 13",
      color: "Silver",
      has_stickers: "Yes",
      sticker_desc: "NASA, Ubuntu",
    },
    {
      brand: "MacBook",
      model: "Air M2",
      color: "Space Gray",
      has_stickers: "No",
    },
  ],
  Bag: [
    {
      type: "Backpack",
      brand: "Nike",
      color: "Black",
      has_logo: "Yes",
      contents: "Laptop, Charger, Water bottle",
    },
    {
      type: "Handbag",
      brand: "Generic",
      color: "Red",
      has_logo: "No",
      contents: "Wallet, Keys, Makeup",
    },
  ],
};

// Seed 3 items per category
async function seedFoundItems() {
  const categories = await Category.find({ isActive: true }).lean();
  if (categories.length === 0) {
    console.log("No active categories found. Seed categories first.");
    process.exit(0);
  }

  let totalSeeded = 0;

  for (const cat of categories) {
    const questionnaire = await Questionnaire.findOne({ category: cat._id });
    if (!questionnaire) {
      console.log(`Skipping ${cat.name}: No questionnaire`);
      continue;
    }

    const answersPool = sampleAnswers[cat.name] || [];
    if (answersPool.length === 0) {
      console.log(`Skipping ${cat.name}: No sample answers`);
      continue;
    }

    let seeded = 0;
    for (let i = 0; i < 3 && i < answersPool.length; i++) {
      const answers = answersPool[i];
      const location = locations[Math.floor(Math.random() * locations.length)];

      const item = new Item({
        category: cat._id,
        description: `${answers.brand || answers.type || cat.name} found at ${location}`,
        location,
        finderAnswers: answers,
        photo: placeholderPhoto,
        status: "found",
        reportedAt: new Date(Date.now() - i * 3600000), // 1 hour apart
      });

      await item.save();
      seeded++;
      totalSeeded++;
    }

    console.log(`Seeded ${seeded} items for ${cat.name}`);
  }

  console.log(`\nSeeding complete! Total items added: ${totalSeeded}`);
  process.exit(0);
}

seedFoundItems().catch(err => {
  console.error("Seeding failed:", err);
  process.exit(1);
});