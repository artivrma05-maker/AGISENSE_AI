const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
const upload = multer({
  storage: multer.memoryStorage(),
});

app.get("/", (req, res) => {
  res.json({
    message: "AGISENSE AI Backend is running!",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Disease Detection API is ready",
  });
});
app.post("/api/detect-disease", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No image uploaded",
    });
  }

  const result = {
    success: true,
    disease: "Late Blight",
    confidence: 92,
    crop: "Tomato",
    severity: "Moderate",

    symptoms: [
      "Dark brown or black spots on leaves",
      "Yellowing around infected areas",
      "Rapid spread during humid weather",
    ],

    remedy:
      "Remove infected leaves and maintain proper spacing for air circulation. Follow recommended agricultural guidance before applying any treatment.",

    prevention:
      "Use resistant varieties, avoid overhead irrigation, and regularly monitor the crop during humid weather.",
  };

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`AGISENSE backend running on http://localhost:${PORT}`);
});