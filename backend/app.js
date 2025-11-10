// app.js  (ROOT - MUST BE IN J:\LostandFound\backend\app.js)
import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import routes
import categoryRoutes from "./src/routes/categoryRoutes.js";
import questionnaireRoutes from "./src/routes/questionnaireRoutes.js";
import itemRoutes from "./src/routes/itemRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// === ROUTES (SAFE PATHS ONLY) ===
console.log("Registering routes...");

app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/questionnaire", questionnaireRoutes);
app.use("/api/v1/item", itemRoutes);

console.log("All routes registered.");

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

export default app;