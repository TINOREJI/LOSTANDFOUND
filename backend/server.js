// server.js (ROOT)
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./src/config/db.js";

dotenv.config();
const PORT = process.env.PORT || 8800;

// Connect DB
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  });