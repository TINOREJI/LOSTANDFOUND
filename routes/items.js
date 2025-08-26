import express from "express";
import multer from "multer";
import Item from "../models/Item.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/found", upload.single("photo"), async (req, res) => {
    const { category, description, location, finderAnswers } = req.body;
    const photo = req.file ? req.file.path : null;

    const newItem = new Item({
        category,
        description,
        location,
        finderAnswers: JSON.parse(finderAnswers),
        photo,
        status: "found"
    });

    await newItem.save();
    res.json(newItem);
});

router.get("/", async (_, res) => {
    const items = await Item.find();
    res.json(items);
});

export default router;
