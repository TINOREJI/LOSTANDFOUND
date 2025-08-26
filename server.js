import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import itemRoutes from "./routes/items.js";
import matchRoutes from "./routes/match.js";
import questionnaireRoutes from "./routes/questionnaire.js";

dotenv.config();
const app = express();
const port = 8000
const db = process.env.MONGO_URL

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// app.use("/api/items", itemRoutes);
// app.use("/api/match", matchRoutes);
// app.use("/api/questionnaire", questionnaireRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

mongoose.connect(db)
  .then(() => app.listen(port, () => 
    console.log(`Server running on http://localhost:5000`)))
  .catch((err) => console.log(err));
// console.log(db)


app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});