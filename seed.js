import mongoose from "mongoose";
import Questionnaire from "./models/Questionnaire.js";

const db = process.env.MONGO_URL

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
        await mongoose.connect(`${db}/lostandfound/seed`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        await Questionnaire.deleteMany(); // optional: clear old data
        await Questionnaire.insertMany(questionnaires);

        console.log("✅ Questionnaires seeded successfully!");
        mongoose.connection.close();
    } catch (error) {
        console.error("❌ Error seeding database:", error);
        mongoose.connection.close();
    }
};

seedDatabase();
