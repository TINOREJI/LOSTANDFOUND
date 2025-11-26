// backend/src/controllers/aiController.js
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Correct paths from src/controllers → src/ai
const pythonScript = path.join(__dirname, "../ai/ai.py");
const pythonExecutable = process.platform === "win32"
  ? path.join(process.cwd(), "venv", "Scripts", "python.exe")
  : path.join(process.cwd(), "venv", "bin", "python");

export const detectObject = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    const imagePath = req.file.path;

    const pythonProcess = spawn(pythonExecutable, [pythonScript, imagePath]);

    let output = "";
    let errorOutput = "";

    pythonProcess.stdout.on("data", (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      // YOLO prints logs to stderr — THIS IS NORMAL! Don't treat as error
      const line = data.toString();
      if (!line.includes("WARNING") && !line.includes("image")) {
        errorOutput += line;
      }
    });

    pythonProcess.on("close", (code) => {
      // Even if YOLO prints to stderr, code is 0 → success
      if (code !== 0) {
        console.error("Python process failed:", errorOutput);
        return res.status(500).json({ success: false, message: "AI process crashed" });
      }

      try {
        // Clean output — sometimes has extra newlines
        const cleanOutput = output.trim();
        if (!cleanOutput || cleanOutput === "[]") {
          return res.json({ success: true, detected: null, confidence: 0 });
        }

        const detections = JSON.parse(cleanOutput);
        const top = detections[0];

        if (!top) {
          return res.json({ success: true, detected: null, confidence: 0 });
        }

        res.json({
          success: true,
          detected: top.name.replace(/-/g, " "),
          confidence: top.confidence,
          all: detections,
        });
      } catch (parseError) {
        console.error("JSON Parse failed. Raw output:", output);
        res.status(500).json({ success: false, message: "AI response invalid" });
      }
    });
  } catch (err) {
    console.error("AI Controller Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};