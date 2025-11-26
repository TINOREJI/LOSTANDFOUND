// seed.js — FINAL UNIVERSITY CAMPUS EDITION
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import Category from "./src/models/Category.js";
import Questionnaire from "./src/models/Questionnaire.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

if (!process.env.MONGO_URL) {
  console.error("ERROR: MONGO_URL missing in .env");
  process.exit(1);
}

const seedData = [
  // 1. STUDENT ID CARD ⭐ MOST COMMON
  {
    category: { name: "Student ID Card", slug: "student-id", icon: "CreditCard", isActive: true },
    questions: [
      { id: "university", label: "University/College", type: "text", placeholder: "e.g. Stanford University", required: true, weight: 10 },
      { id: "name", label: "Name on Card", type: "text", placeholder: "e.g. Sarah Johnson", required: true, weight: 10 },
      { id: "id_number", label: "Student ID Number", type: "text", placeholder: "e.g. 12345678", required: false, weight: 10 },
      { id: "photo", label: "Has photo?", type: "select", options: ["Yes", "No"], required: true, weight: 8 },
      { id: "color", label: "Card Color", type: "select", options: ["White", "Blue", "Red", "Green", "Yellow", "Black"], required: true,  weight: 7 }
    ]
  },

  // 2. PHONE
  {
    category: { name: "Phone", slug: "phone", icon: "Smartphone", isActive: true },
    questions: [
      { id: "brand", label: "Brand", type: "select", options: ["Apple", "Samsung", "Google", "OnePlus", "Xiaomi", "Other"], required: true, weight: 10 },
      { id: "model", label: "Model", type: "text", placeholder: "e.g. iPhone 15", required: true, weight: 10 },
      { id: "color", label: "Color", type: "select", options: ["Black", "White", "Blue", "Green", "Red", "Gold"], required: true, weight: 9 },
      { id: "has_case", label: "Has case?", type: "select", options: ["Yes", "No"], required: true, weight: 7 },
      { id: "case_color", label: "Case Color", type: "select", options: ["Black", "Clear", "Red", "Blue", "Pink"], required: false, weight: 6, dependsOn: { id: "has_case", value: "Yes" } }
    ]
  },

  // 3. WALLET
  {
    category: { name: "Wallet", slug: "wallet", icon: "Wallet", isActive: true },
    questions: [
      { id: "color", label: "Color", type: "select", options: ["Black", "Brown", "Gray", "Blue", "Red"], required: true, weight: 10 },
      { id: "material", label: "Material", type: "select", options: ["Leather", "Fabric", "Nylon"], required: true, weight: 9 },
      { id: "has_id", label: "Contains Student ID?", type: "select", options: ["Yes", "No"], required: true, weight: 10 },
      { id: "name_on_id", label: "Name on ID", type: "text", placeholder: "e.g. Alex Chen", required: false, weight: 10, dependsOn: { id: "has_id", value: "Yes" } },
      { id: "cards", label: "Other cards visible?", type: "text", placeholder: "e.g. Credit card, gym pass", required: false, weight: 6 }
    ]
  },

  // 4. LAPTOP
  {
    category: { name: "Laptop", slug: "laptop", icon: "Laptop", isActive: true },
    questions: [
      { id: "brand", label: "Brand", type: "select", options: ["Apple", "Dell", "HP", "Lenovo", "Asus"], required: true, weight: 10 },
      { id: "model", label: "Model", type: "text", placeholder: "e.g. MacBook Air M2", required: true, weight: 10 },
      { id: "color", label: "Color", type: "select", options: ["Silver", "Space Gray", "Black", "Gold"], required: true, weight: 8 },
      { id: "stickers", label: "Has stickers?", type: "select", options: ["Yes", "No"], required: false, weight: 7 },
      { id: "sticker_desc", label: "Sticker description", type: "text", placeholder: "e.g. College logo", required: false, weight: 6, dependsOn: { id: "stickers", value: "Yes" } }
    ]
  },

  // 5. KEYS
  {
    category: { name: "Keys", slug: "keys", icon: "Key", isActive: true },
    questions: [
      { id: "key_count", label: "How many keys?", type: "select", options: ["1", "2-3", "4-6", "7+"], required: true, weight: 10 },
      { id: "keychain", label: "Has keychain?", type: "select", options: ["Yes", "No"], required: true, weight: 9 },
      { id: "keychain_desc", label: "Keychain", type: "text", placeholder: "e.g. Lanyard, car logo", required: false, weight: 10, dependsOn: { id: "keychain", value: "Yes" } },
      { id: "dorm_key", label: "Includes dorm/room key?", type: "select", options: ["Yes", "No"], required: true, weight: 8 },
      { id: "room_number", label: "Room number (if known)", type: "text", required: false, weight: 9, dependsOn: { id: "dorm_key", value: "Yes" } }
    ]
  },

  // 6. WATCH
  {
    category: { name: "Watch", slug: "watch", icon: "Watch", isActive: true },
    questions: [
      { id: "type", label: "Type", type: "select", options: ["Smartwatch", "Analog", "Digital"], required: true, weight: 10 },
      { id: "brand", label: "Brand", type: "text", placeholder: "e.g. Apple, Casio, Garmin", required: true, weight: 10 },
      { id: "band_color", label: "Band Color", type: "select", options: ["Black", "Silver", "Gold", "Blue", "White"], required: true, weight: 9 },
      { id: "face_color", label: "Face Color", type: "select", options: ["Black", "White", "Blue", "Silver"], required: false, weight: 7 },
      { id: "engraving", label: "Engraved?", type: "select", options: ["Yes", "No"], required: false, weight: 8 }
    ]
  },

  // 7. CHARGER / POWER BANK
  {
    category: { name: "Charger / Power Bank", slug: "charger", icon: "Package", isActive: true },
    questions: [
      { id: "type", label: "Type", type: "select", options: ["Phone Charger", "Laptop Charger", "Power Bank", "Cable Only"], required: true, weight: 10 },
      { id: "brand", label: "Brand", type: "text", placeholder: "e.g. Anker, Apple, Samsung", required: false, weight: 9 },
      { id: "color", label: "Color", type: "select", options: ["White", "Black", "Gray", "Blue"], required: true, weight: 8 },
      { id: "length", label: "Cable Length", type: "select", options: ["Short", "1m", "2m", "Long"], required: false, weight: 6 },
      { id: "damaged", label: "Damaged?", type: "select", options: ["Yes", "No"], required: false, weight: 5 }
    ]
  },

  // 8. BAG / BACKPACK
  {
    category: { name: "Bag", slug: "bag", icon: "Package", isActive: true },
    questions: [
      { id: "type", label: "Type", type: "select", options: ["Backpack", "Tote", "Laptop Bag", "Gym Bag"], required: true, weight: 10 },
      { id: "color", label: "Color", type: "select", options: ["Black", "Gray", "Blue", "Red", "Green"], required: true, weight: 9 },
      { id: "brand", label: "Brand", type: "text", placeholder: "e.g. Jansport, North Face", required: false, weight: 8 },
      { id: "logo", label: "Logo?", type: "select", options: ["Yes", "No"], required: false, weight: 7 },
      { id: "contents", label: "Items inside", type: "text", placeholder: "e.g. Laptop, notebook", required: false, weight: 6 }
    ]
  },

  // 9. WATER BOTTLE
  {
    category: { name: "Water Bottle", slug: "water-bottle", icon: "Bottle", isActive: true },
    questions: [
      { id: "brand", label: "Brand", type: "select", options: ["Hydro Flask", "Yeti", "Stanley", "Nalgene", "Generic"], required: true, weight: 10 },
      { id: "color", label: "Color", type: "select", options: ["Black", "Blue", "Green", "Pink", "Silver"], required: true, weight: 9 },
      { id: "size", label: "Size", type: "select", options: ["20oz", "32oz", "40oz"], required: true, weight: 8 },
      { id: "sticker", label: "Has stickers?", type: "select", options: ["Yes", "No"], required: false, weight: 7 },
      { id: "lid", label: "Lid Type", type: "select", options: ["Straw", "Screw", "Flip"], required: false, weight: 6 }
    ]
  },

  // 10. EARPHONES
  {
    category: { name: "Earphones", slug: "earphones", icon: "Headphones", isActive: true },
    questions: [
      { id: "brand", label: "Brand", type: "select", options: ["Apple AirPods", "Samsung", "Sony", "Beats", "Other"], required: true, weight: 10 },
      { id: "model", label: "Model", type: "text", placeholder: "e.g. AirPods Pro", required: true, weight: 10 },
      { id: "color", label: "Color", type: "select", options: ["White", "Black", "Silver"], required: true, weight: 8 },
      { id: "case", label: "With case?", type: "select", options: ["Yes", "No"], required: true, weight: 9 },
      { id: "engraving", label: "Engraved?", type: "text", placeholder: "e.g. Initials", required: false, weight: 10 }
    ]
  },

  // 11. UMBRELLA
  {
    category: { name: "Umbrella", slug: "umbrella", icon: "Umbrella", isActive: true },
    questions: [
      { id: "color", label: "Color", type: "select", options: ["Black", "Blue", "Red", "Clear", "Patterned"], required: true, weight: 10 },
      { id: "size", label: "Size", type: "select", options: ["Compact", "Full Size"], required: true, weight: 9 },
      { id: "handle", label: "Handle", type: "select", options: ["Curved", "Straight", "Wooden"], required: false, weight: 7 },
      { id: "pattern", label: "Pattern", type: "select", options: ["Solid", "Striped", "Logo"], required: false, weight: 6 },
      { id: "broken", label: "Broken?", type: "select", options: ["Yes", "No"], required: false, weight: 5 }
    ]
  },

  // 12. BOOK / NOTEBOOK
  {
    category: { name: "Book", slug: "book", icon: "Book", isActive: true },
    questions: [
      { id: "title", label: "Title", type: "text", placeholder: "e.g. Calculus Textbook", required: true, weight: 10 },
      { id: "cover_color", label: "Cover Color", type: "select", options: ["Blue", "Black", "Red", "Green"], required: true, weight: 9 },
      { id: "subject", label: "Subject", type: "text", placeholder: "e.g. Chemistry, CS101", required: false, weight: 8 },
      { id: "notes", label: "Has notes/highlights?", type: "select", options: ["Yes", "No"], required: false, weight: 7 },
      { id: "name_inside", label: "Name written inside?", type: "text", required: false, weight: 10 }
    ]
  },

  // 13. GLASSES
  {
    category: { name: "Glasses", slug: "glasses", icon: "Glasses", isActive: true },
    questions: [
      { id: "type", label: "Type", type: "select", options: ["Prescription", "Sunglasses", "Reading"], required: true, weight: 10 },
      { id: "frame_color", label: "Frame Color", type: "select", options: ["Black", "Tortoiseshell", "Silver", "Clear"], required: true, weight: 10 },
      { id: "brand", label: "Brand", type: "text", placeholder: "e.g. Ray-Ban", required: false, weight: 9 },
      { id: "in_case", label: "In case?", type: "select", options: ["Yes", "No"], required: true, weight: 7 },
      { id: "case_color", label: "Case Color", type: "select", options: ["Black", "Brown", "Hard Case"], required: false, weight: 6, dependsOn: { id: "in_case", value: "Yes" } }
    ]
  },

  // 14. JACKET
  {
    category: { name: "Jacket", slug: "jacket", icon: "Shirt", isActive: true },
    questions: [
      { id: "type", label: "Type", type: "select", options: ["Hoodie", "Puffer", "Denim", "Rain", "Varsity"], required: true, weight: 10 },
      { id: "color", label: "Color", type: "select", options: ["Black", "Gray", "Blue", "Red", "Green"], required: true, weight: 9 },
      { id: "brand", label: "Brand", type: "text", placeholder: "e.g. Champion, Nike", required: false, weight: 8 },
      { id: "logo", label: "Logo/Patches?", type: "select", options: ["Yes", "No"], required: false, weight: 7 },
      { id: "name_inside", label: "Name inside?", type: "text", required: false, weight: 10 }
    ]
  }
];

// RUN SEEDER
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    for (const item of seedData) {
      const cat = await Category.findOneAndUpdate(
        { slug: item.category.slug },
        item.category,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      await Questionnaire.findOneAndUpdate(
        { category: cat._id },
        { category: cat._id, questions: item.questions },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      console.log(`Seeded: ${cat.name}`);
    }

    console.log("\nUNIVERSITY CAMPUS LOST & FOUND SEEDING COMPLETE! (14 categories)");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }
})();