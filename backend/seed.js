// seed.js (ROOT - J:\LostandFound\backend\seed.js)
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import Category from "./src/models/Category.js"; // Assuming this is your Category model
import Questionnaire from "./src/models/Questionnaire.js"; // Assuming this is your Questionnaire model

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

// --- Full Seed Data ---
// This is the 10-category JSON data, now as a JS constant.
const seedData = [
  {
    category: {
      name: "Phone",
      slug: "phone",
      icon: "FiSmartphone",
      isActive: true,
    },
    questions: [
      {
        id: "brand",
        label: "Brand",
        type: "text",
        placeholder: "e.g. Apple, Samsung, Google",
        weight: 10,
      },
      {
        id: "model",
        label: "Model",
        type: "text",
        placeholder: "e.g. iPhone 15 Pro, Galaxy S24 Ultra",
        weight: 9,
      },
      {
        id: "color",
        label: "Color",
        type: "text",
        placeholder: "e.g. Space Gray, Sierra Blue",
        weight: 8,
      },
      {
        id: "serial_number",
        label: "Serial Number (Optional)",
        type: "text",
        placeholder: "Found on box or in settings (if known)",
        weight: 10,
      },
      {
        id: "lock_screen",
        label: "Lock Screen Wallpaper",
        type: "text",
        placeholder: "Describe the image (e.g., 'dog', 'beach sunset')",
        weight: 6,
      },
      {
        id: "has_case",
        label: "Does it have a case?",
        type: "select",
        options: ["Yes", "No"],
        weight: 3,
      },
      {
        id: "case_details",
        label: "Case Details",
        type: "text",
        placeholder: "e.g. Clear, black leather, red with stickers",
        dependsOn: {
          id: "has_case",
          value: "Yes",
        },
        weight: 5,
      },
    ],
  },
  {
    category: {
      name: "Wallet",
      slug: "wallet",
      icon: "FiCreditCard",
      isActive: true,
    },
    questions: [
      {
        id: "type",
        label: "Wallet Type",
        type: "select",
        options: [
          "Bifold",
          "Trifold",
          "Cardholder",
          "Zipper",
          "Money Clip",
          "Other",
        ],
        weight: 8,
      },
      {
        id: "brand",
        label: "Brand",
        type: "text",
        placeholder: "e.g. Gucci, Herschel, Fossil, or 'No brand'",
        weight: 9,
      },
      {
        id: "material",
        label: "Material",
        type: "text",
        placeholder: "e.g. Leather, Canvas, Nylon, Metal",
        weight: 7,
      },
      {
        id: "color",
        label: "Color",
        type: "text",
        placeholder: "e.g. Black, Dark Brown, Tan",
        weight: 8,
      },
      {
        id: "distinguishing_marks",
        label: "Distinguishing Marks",
        type: "text",
        placeholder: "e.g. Monogram, scratches, specific tear",
        weight: 6,
      },
      {
        id: "visible_contents",
        label: "Any Specific Visible Contents?",
        type: "text",
        placeholder: "e.g. Photo, specific ID, library card",
        weight: 5,
      },
    ],
  },
  {
    category: {
      name: "Keys",
      slug: "keys",
      icon: "FiKey",
      isActive: true,
    },
    questions: [
      {
        id: "key_count",
        label: "How many keys are on the ring?",
        type: "select",
        options: ["1", "2-3", "4-6", "7+"],
        weight: 7,
      },
      {
        id: "has_fob",
        label: "Is there a car key fob or electronic pass?",
        type: "select",
        options: ["Yes", "No"],
        weight: 9,
      },
      {
        id: "fob_brand",
        label: "Fob Brand",
        type: "text",
        placeholder: "e.g. Toyota, Honda, Ford, HID, Fobio",
        dependsOn: {
          id: "has_fob",
          value: "Yes",
        },
        weight: 10,
      },
      {
        id: "keyring_description",
        label: "Describe the keyring",
        type: "text",
        placeholder: "e.g. Plain metal ring, red lanyard, Disney character",
        weight: 8,
      },
      {
        id: "key_colors",
        label: "Any specific keys?",
        type: "text",
        placeholder: "e.g. One blue house key, a small silver lock key",
        weight: 6,
      },
      {
        id: "store_tags",
        label: "Any store membership tags?",
        type: "text",
        placeholder: "e.g. Gym tag, grocery store card",
        weight: 4,
      },
    ],
  },
  {
    category: {
      name: "Laptop",
      slug: "laptop",
      icon: "FiMonitor",
      isActive: true,
    },
    questions: [
      {
        id: "brand",
        label: "Brand",
        type: "text",
        placeholder: "e.g. Apple, Dell, HP, Lenovo",
        weight: 10,
      },
      {
        id: "model",
        label: "Model",
        type: "text",
        placeholder: "e.g. MacBook Pro 14\", XPS 15, ThinkPad X1",
        weight: 9,
      },
      {
        id: "color",
        label: "Color",
        type: "text",
        placeholder: "e.g. Silver, Space Gray, Black, Rose Gold",
        weight: 8,
      },
      {
        id: "serial_number",
        label: "Serial Number (Optional)",
        type: "text",
        placeholder: "Usually found on the bottom of the laptop",
        weight: 10,
      },
      {
        id: "stickers",
        label: "Any stickers on it?",
        type: "text",
        placeholder: "Describe any stickers on the lid or near keyboard",
        weight: 6,
      },
      {
        id: "damage",
        label: "Any notable damage?",
        type: "text",
        placeholder: "e.g. Dented corner, cracked screen, missing key",
        weight: 5,
      },
      {
        id: "in_case",
        label: "Is it in a bag or sleeve?",
        type: "select",
        options: ["Yes", "No"],
        weight: 3,
      },
    ],
  },
  {
    category: {
      name: "Bag",
      slug: "bag",
      icon: "FiShoppingBag",
      isActive: true,
    },
    questions: [
      {
        id: "type",
        label: "Bag Type",
        type: "select",
        options: [
          "Backpack",
          "Handbag",
          "Duffel Bag",
          "Tote Bag",
          "Messenger Bag",
          "Laptop Bag",
          "Other",
        ],
        weight: 8,
      },
      {
        id: "brand",
        label: "Brand",
        type: "text",
        placeholder: "e.g. JanSport, The North Face, Herschel, Coach",
        weight: 9,
      },
      {
        id: "material",
        label: "Material",
        type: "text",
        placeholder: "e.g. Canvas, Leather, Nylon, Polyester",
        weight: 6,
      },
      {
        id: "color_pattern",
        label: "Color or Pattern",
        type: "text",
        placeholder: "e.g. Solid black, Blue with white stripes, Floral",
        weight: 7,
      },
      {
        id: "distinguishing_features",
        label: "Distinguishing Features",
        type: "text",
        placeholder: "e.g. Patches, keychains, unique zipper, tear",
        weight: 5,
      },
      {
        id: "main_contents",
        label: "Main Contents (if known)",
        type: "text",
        placeholder: "e.g. Laptop, textbooks, gym clothes",
        weight: 4,
      },
    ],
  },
  {
    category: {
      name: "Headphones / Earbuds",
      slug: "headphones",
      icon: "FiHeadphones",
      isActive: true,
    },
    questions: [
      {
        id: "type",
        label: "Type",
        type: "select",
        options: [
          "Over-Ear Headphones",
          "On-Ear Headphones",
          "Wireless Earbuds (e.g. AirPods)",
          "Wired Earbuds",
          "Other",
        ],
        weight: 9,
      },
      {
        id: "brand",
        label: "Brand",
        type: "text",
        placeholder: "e.g. Apple, Sony, Bose, Beats",
        weight: 10,
      },
      {
        id: "model",
        label: "Model",
        type: "text",
        placeholder: "e.g. AirPods Pro, WH-1000XM5, QuietComfort 45",
        weight: 9,
      },
      {
        id: "color",
        label: "Color",
        type: "text",
        placeholder: "e.g. White, Black, Silver",
        weight: 8,
      },
      {
        id: "in_case",
        label: "Are they in their case?",
        type: "select",
        options: ["Yes (Charging/Carrying Case)", "No"],
        weight: 6,
      },
      {
        id: "case_details",
        label: "Case Details",
        type: "text",
        placeholder: "e.g. White case, Black fabric case, case has stickers",
        dependsOn: {
          id: "in_case",
          value: "Yes (Charging/Carrying Case)",
        },
        weight: 7,
      },
    ],
  },
  {
    category: {
      name: "Jacket / Coat",
      slug: "jacket",
      icon: "FiLayers",
      isActive: true,
    },
    questions: [
      {
        id: "type",
        label: "Item Type",
        type: "select",
        options: [
          "Rain Jacket",
          "Puffer Jacket",
          "Denim Jacket",
          "Blazer / Suit Jacket",
          "Hoodie / Sweatshirt",
          "Winter Coat",
          "Other",
        ],
        weight: 8,
      },
      {
        id: "brand",
        label: "Brand",
        type: "text",
        placeholder: "e.g. Patagonia, The North Face, Levi's, Nike",
        weight: 9,
      },
      {
        id: "color",
        label: "Color",
        type: "text",
        placeholder: "e.g. Black, Navy Blue, Grey",
        weight: 7,
      },
      {
        id: "size",
        label: "Size (if known)",
        type: "text",
        placeholder: "e.g. Medium, Large, 42R",
        weight: 5,
      },
      {
        id: "pocket_contents",
        label: "Anything in the pockets?",
        type: "text",
        placeholder: "e.g. Keys, receipt, headphones",
        weight: 6,
      },
      {
        id: "distinguishing_marks",
        label: "Any stains, rips, or patches?",
        type: "text",
        placeholder: "e.g. Small coffee stain on cuff, rip in elbow",
        weight: 4,
      },
    ],
  },
  {
    category: {
      name: "Glasses / Sunglasses",
      slug: "glasses",
      icon: "FiEye",
      isActive: true,
    },
    questions: [
      {
        id: "type",
        label: "Type",
        type: "select",
        options: ["Eyeglasses (Prescription)", "Sunglasses", "Reading Glasses"],
        weight: 8,
      },
      {
        id: "brand",
        label: "Brand",
        type: "text",
        placeholder: "e.g. Ray-Ban, Oakley, Warby Parker, Tom Ford",
        weight: 9,
      },
      {
        id: "frame_color",
        label: "Frame Color",
        type: "text",
        placeholder: "e.g. Black, Tortoiseshell, Gold, Clear",
        weight: 10,
      },
      {
        id: "frame_material",
        label: "Frame Material",
        type: "select",
        options: ["Plastic / Acetate", "Metal", "Other"],
        weight: 7,
      },
      {
        id: "lens_color",
        label: "Lens Color (if sunglasses)",
        type: "text",
        placeholder: "e.g. Black, Brown, Blue Mirror",
        dependsOn: {
          id: "type",
          value: "Sunglasses",
        },
        weight: 6,
      },
      {
        id: "in_case",
        label: "Are they in a case?",
        type: "select",
        options: ["Yes", "No"],
        weight: 5,
      },
      {
        id: "case_description",
        label: "Case Description",
        type: "text",
        placeholder: "e.g. Black hardshell case, soft cloth bag",
        dependsOn: {
          id: "in_case",
          value: "Yes",
        },
        weight: 6,
      },
    ],
  },
  {
    category: {
      name: "Water Bottle",
      slug: "water-bottle",
      icon: "FiDroplet",
      isActive: true,
    },
    questions: [
      {
        id: "brand",
        label: "Brand",
        type: "text",
        placeholder: "e.g. Hydro Flask, Yeti, Nalgene, S'well",
        weight: 9,
      },
      {
        id: "material",
        label: "Material",
        type: "select",
        options: ["Metal (Stainless Steel)", "Plastic", "Glass", "Other"],
        weight: 7,
      },
      {
        id: "color",
        label: "Color",
        type: "text",
        placeholder: "e.g. Olive Green, Matte Black, Silver",
        weight: 8,
      },
      {
        id: "lid_type",
        label: "Lid Type",
        type: "select",
        options: ["Straw Lid", "Screw Cap", "Flip Top", "Other"],
        weight: 6,
      },
      {
        id: "capacity",
        label: "Size / Capacity (Approximate)",
        type: "text",
        placeholder: "e.g. 32 oz, 1 Liter, 'Tall', 'Short'",
        weight: 4,
      },
      {
        id: "stickers_dents",
        label: "Any stickers or major dents?",
        type: "text",
        placeholder: "Describe any stickers or notable damage",
        weight: 7,
      },
    ],
  },
  {
    category: {
      name: "Book / Notebook",
      slug: "book-notebook",
      icon: "FiBookOpen",
      isActive: true,
    },
    questions: [
      {
        id: "type",
        label: "Type",
        type: "select",
        options: [
          "Hardcover Book",
          "Paperback Book",
          "Spiral Notebook",
          "Composition Book",
          "Leather Journal / Diary",
          "Other",
        ],
        weight: 8,
      },
      {
        id: "title",
        label: "Title (if book)",
        type: "text",
        placeholder: "Enter the title of the book",
        weight: 10,
      },
      {
        id: "cover_description",
        label: "Cover Description",
        type: "text",
        placeholder: "e.g. Red cover, 'Chemistry 101', blue Moleskine",
        weight: 9,
      },
      {
        id: "markings",
        label: "Any writing, highlighting, or notes?",
        type: "text",
        placeholder: "e.g. Name inside cover, heavy highlighting",
        weight: 6,
      },
      {
        id: "bookmark",
        label: "Is there a bookmark?",
        type: "text",
        placeholder: "e.g. Red ribbon, plane ticket, folded page",
        weight: 4,
      },
    ],
  },
];

// --- Main Seeding Function ---
(async () => {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected for seeding");

    console.log("Starting seed process...");

    // 2. Loop through all data and seed it
    for (const item of seedData) {
      const { category, questions } = item;

      // 2a. Create or Update the Category
      // We use 'slug' as the unique identifier to find and update.
      const categoryDoc = await Category.findOneAndUpdate(
        { slug: category.slug }, // Find by slug
        category, // Data to insert/update
        { upsert: true, new: true, runValidators: true } // Options
      );

      console.log(`Category '${categoryDoc.name}' processed: ${categoryDoc._id}`);

      // 2b. Create or Update the Questionnaire linked to the Category
      await Questionnaire.findOneAndUpdate(
        { category: categoryDoc._id }, // Find by category ID
        {
          category: categoryDoc._id, // Link to the category
          questions: questions, // The full questions array
        },
        { upsert: true, runValidators: true } // Options
      );

      console.log(`Questionnaire for '${categoryDoc.name}' processed.`);
    }

    console.log("\nSeeding completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("\nSeeding failed:", err.message);
    process.exit(1);
  }
})();