import multer from "multer";
import Item from "../models/Item.js";

const upload = multer({ dest: "uploads/" });

export const multerUpload = upload.single("photo");

export const createItem = async (req, res) => {
  try {
    const { category, description, location, finderAnswers } = req.body;
    const photo = req.file ? req.file.path : null;

    console.log("📥 finderAnswers received:", finderAnswers);

    // ✅ Handle finderAnswers safely
    let answers;
    if (!finderAnswers) {
      answers = {};
    } else if (typeof finderAnswers === "string") {
      try {
        answers = JSON.parse(finderAnswers);
      } catch (e) {
        console.error("⚠️ Invalid JSON for finderAnswers");
        return res.status(400).json({ message: "finderAnswers must be valid JSON" });
      }
    } else {
      answers = finderAnswers;
    }

    const newItem = new Item({
      category,
      description,
      location,
      finderAnswers: answers,
      photo,
      status: "found",
    });

    await newItem.save();
    return res.status(201).json(newItem);
  } catch (error) {
    console.error("❌ Error creating item:", error);
    return res.status(500).json({ message: "Failed to create item" });
  }
};


export const findItems = async (_, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    console.error("❌ Error fetching items:", error);
    res.status(500).json({ message: "Failed to fetch items" });
  }
};
